import { Component, ViewChild, ElementRef, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  // @ViewChild('carousel') carousel: ElementRef;
  isForm1Visible: boolean = true;
  isForm2Visible: boolean = false;

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
