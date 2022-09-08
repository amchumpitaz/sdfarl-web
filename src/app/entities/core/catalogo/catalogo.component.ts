import {Component, OnInit, OnDestroy } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catalogo',
  templateUrl: './catalogo.component.html',
  styleUrls: ['./catalogo.component.scss']
})

export class CatalogoComponent implements OnInit, OnDestroy {

  myControl = new FormControl();

  cat: any;
  data: any;
  condicion: any;

  carouselOptions = {
    margin: 25,
    nav: true,
    navText: ['<div id="nav-btn-owl" class="nav-btn prev-slide"></div>', '<div id="nav-btn-owl" class="nav-btn next-slide"></div>'],
    responsiveClass: true,
    loop: true,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 1
      },
      1000: {
        items: 2
      },
      1500: {
        items: 2
      }
    }
  };

  images = [
    {
      text: 'Everfresh Flowers',
      precio: 's/ 200',
      image: 'https://freakyjolly.com/demo/jquery/PreloadJS/images/1.jpg'
    },
    {
      text: 'Festive Deer',
      precio: 's/ 100',
      image: 'https://freakyjolly.com/demo/jquery/PreloadJS/images/2.jpg'
    },
    {
      text: 'Morning Greens',
      precio: 's/ 300',
      image: 'https://freakyjolly.com/demo/jquery/PreloadJS/images/3.jpg'
    },
    {
      text: 'Bunch of Love',
      precio: 's/ 200',
      image: 'https://freakyjolly.com/demo/jquery/PreloadJS/images/4.jpg'
    },
    {
      text: 'Blue Clear',
      precio: 's/ 100',
      image: 'https://freakyjolly.com/demo/jquery/PreloadJS/images/5.jpg'
    },
    {
      text: 'Evening Clouds',
      precio: 's/ 180',
      image: 'https://freakyjolly.com/demo/jquery/PreloadJS/images/7.jpg'
    },
    {
      text: 'Fontains in Shadows',
      precio: 's/ 240',
      image: 'https://freakyjolly.com/demo/jquery/PreloadJS/images/8.jpg'
    },
    {
      text: 'Kites in the Sky',
      precio: 's/ 299',
      image: 'https://freakyjolly.com/demo/jquery/PreloadJS/images/9.jpg'
    },
    {
      text: 'Sun Streak',
      precio: 's/ 410',
      image: 'https://freakyjolly.com/demo/jquery/PreloadJS/images/10.jpg'
    }
  ];

  imageObject: Array<object> = [{
    image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg',
    thumbImage: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg',
    alt: 'alt of image',
    title: 'title of image 1'
    }, {
    image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg',
    thumbImage: 'https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg',
    alt: 'alt of image',
    title: 'title of image 2'
    }, {
    image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg',
    thumbImage: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg',
    alt: 'alt of image',
    title: 'title of image 3'
    }, {
    image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg',
    thumbImage: 'https://mdbootstrap.com/img/Photos/Slides/img%20(129).jpg',
    alt: 'alt of image',
    title: 'title of image 4'
    }, {
    image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg',
    thumbImage: 'https://mdbootstrap.com/img/Photos/Slides/img%20(70).jpg',
    alt: 'alt of image',
    title: 'title of image 5'
    }, {
    image: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg',
    thumbImage: 'https://mdbootstrap.com/img/Photos/Slides/img%20(130).jpg',
    alt: 'alt of image',
    title: 'title of image 6'
    }
  ];

  constructor(private translate: TranslateService,
    private route: Router) {
  }

  ngOnInit() {
    // this.route.navigate(['/catalogo/register']);
    this.route.navigate(['/login']);
    this.data =  [{
      id: 1,
      categoria: this.translate.instant('Todos')
      },
      {
      id: 2,
      categoria: this.translate.instant('Nombre de la categoria 1')
     },
     {
      id: 3,
      categoria: this.translate.instant('categoria 2')
     },
     {
      id: 4,
      categoria: this.translate.instant('categoria 3')
      }];

    this.condicion =  [{
      id: 1,
      categoria: this.translate.instant('Nuevo')
      },
      {
      id: 2,
      categoria: this.translate.instant('Usado')
      },
      {
      id: 3,
      categoria: this.translate.instant('Reparado')
      }];

    this.cat = 1;

  }

  ngOnDestroy() {}

  onLoggedout() {
    localStorage.removeItem('isLoggedin');
  }
}
