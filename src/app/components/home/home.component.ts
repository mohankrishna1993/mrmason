import { Component, ViewChild, ElementRef, AfterViewInit, Renderer2, OnInit  } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
// import { Autocomplete } from 'googlemaps';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    trigger('startTypewriter', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ width: 0, opacity: 0 }),
        animate('2s ease-in')
      ])
    ])
  ]
})
export class HomeComponent implements AfterViewInit {
  options: any = {
    componentRestrictions: { country: 'IN' }
  }


  isForm1Visible: boolean = true;
  isForm2Visible: boolean = false;
  text = "sample";

  slides = [
    {
      image: 'path-to-image-1.jpg',
      title: 'Slide 1 Title',
      description: 'Slide 1 Description',
    },
    {
      image: 'path-to-image-2.jpg',
      title: 'Slide 2 Title',
      description: 'Slide 2 Description',
    },
    // Add more slides as needed
  ];

  public handleAddressChange(place: google.maps.places.PlaceResult) {
    // Do some stuff
  }

  ngAfterViewInit() {
    // Start the carousel automatically
    // const carouselInstance = new bootstrap.Carousel(this.carousel.nativeElement, {
    //   interval: 3000, // Adjust the interval time in milliseconds
    // });
  }



  toggleForm(formName: string) {
    if (formName === 'form1') {
      this.isForm1Visible = true;
      this.isForm2Visible = false;
    } else if (formName === 'form2') {
      this.isForm1Visible = false;
      this.isForm2Visible = true;
      console.log('*******')
    }

  }

}
