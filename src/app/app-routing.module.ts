import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {
  redirectUnauthorizedTo,
  redirectLoggedInTo,
  canActivate,
} from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['']);
const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/auth/login/login.module').then(
        (m) => m.LoginPageModule
      ),
    //...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'login/admin',
    loadChildren: () =>
      import('./modules/auth/login/login.module').then(
        (m) => m.LoginPageModule
      ),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/menu-component-list/home.module').then((m) => m.HomePageModule),
    //...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'business-data',
    loadChildren: () =>
      import('./modules/home/data-business/data-business.module').then((m) => m.DataBusinessPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'business-data1',
    loadChildren: () =>
      import('./modules/home/data-business/data-business.module').then((m) => m.DataBusinessPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'formula',
    loadChildren: () =>
      import('./modules/home/formula-business/formula-business.module').then((m) => m.FormulaBusinessPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./modules/auth/registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'registration/admin',
    loadChildren: () =>
      import('./modules/auth/registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
    ...canActivate(redirectLoggedInToHome),
  },
  {
    path: 'bussines-select',
    loadChildren: () =>
      import('./modules/auth/business-select/business-select.module').then(
        (m) => m.BusinessSelectPageModule
      ),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: 'email-verification',
    loadChildren: () => import('./modules/auth/email-verification/email-verification.module').then(m => m.EmailVerificationPageModule),
    ...canActivate(redirectUnauthorizedToLogin),
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'principal',
    loadChildren: () => import('./modules/home/principal/principal.module').then( m => m.PrincipalPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, /*{ preloadingStrategy: PreloadAllModules }*/),
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
