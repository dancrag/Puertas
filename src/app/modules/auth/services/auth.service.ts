import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData, doc, 
    query, where, DocumentData, collectionGroup, getDocs, CollectionReference } from '@angular/fire/firestore';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendEmailVerification,
    UserCredential,
} from '@angular/fire/auth';
import { Observable } from 'rxjs';

interface ILoginCredentials {
    email: string;
    password: string;
};

interface IUserProfile {
    registrationId: string;
    name: string;
    first_family_name: string;
    dob: string;
    email: string;
    agreement: boolean;
    agreement_date: Date;
    isAdmin: boolean;
}

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    userCredential!: UserCredential;
    userProfile!: IUserProfile;

    constructor(
        private auth: Auth,
        private firestore: Firestore,
    ) { }



    async register(registration: any, isAdmin: boolean) {
        const db = this.firestore;

        this.userProfile = {
            'registrationId': '',
            'name': registration.name,
            'first_family_name': registration.first_family_name,
            'dob': registration.dob,
            'email': registration.email,
            'agreement': registration.agreement,
            'agreement_date': new Date(),
            'isAdmin': registration.isAdmin
        };
        

        try {
            this.userCredential = await createUserWithEmailAndPassword(this.auth, registration.email, registration.password);
            this.userProfile.registrationId = this.userCredential.user.uid;
            await sendEmailVerification(this.userCredential.user);
            const reference = await addDoc(collection(db, isAdmin ? 'adminProfile' : 'businessProfile'), this.userProfile);

            return this.userCredential;
        } catch (e) {
            return null;
        }
    }

    async resendEmailVerification() {
        try {
            await sendEmailVerification(this.userCredential.user);
        } catch (e) {
            return false
        }
        return true
    }

    async login(credentials: ILoginCredentials) {
        try {
            this.userCredential = await signInWithEmailAndPassword(this.auth, credentials.email, credentials.password);

            return this.userCredential;
        } catch (e) {
            return null;
        }
    }

    logout() {
        return signOut(this.auth);
    }


    //busca si el usuario que intenta logearse existe en el perfil
    findUserProfile(ownerId: string, isAdmin: boolean): Promise<any> {
        const promise = new Promise<boolean>((resolve, reject) => {
         
            let profile = '';
            if (isAdmin) {
                
                profile = 'adminProfile'
                console.log(profile);
            } else {
                profile = 'businessProfile'
                console.log(profile);
            }
    
            const profiles = query(collectionGroup(this.firestore, profile), 
                where('registrationId', '==', ownerId));
        
            collectionData(profiles, {idField: 'registrationId'}).subscribe( (data: any) => {
                console.log(data)
                resolve (data); 
            });
        })

       return promise;

    }

}
