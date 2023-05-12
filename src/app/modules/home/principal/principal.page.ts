import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  slide: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/img/mesa de trabajo1.png',
      titulo: 'Comparte Fotos',
      desc: 'Mira y comparte increíbles fotos de todo el mundo'
    },
    {
      img: '/assets/img/mesa de trabajo2.png',
      titulo: 'Escucha Música',
      desc: 'Toda tu música favorita está aquí'
    },
    {
      img: '/assets/img/mesa de trabajo3.png',
      titulo: 'Nunca olvides nada',
      desc: 'El mejor calendario del mundo a tu disposición'
    },

  ];
    
  slideOpts = {
    initialSlide: 0,
    speed: 400,
    autoplay: {
      delay: 3000
    }
  };

  constructor(private router: Router) { }

  ngOnInit() {
  }
  login() {
    console.log('hola');
     this.router.navigateByUrl('/login', { replaceUrl: true});

  }
}
