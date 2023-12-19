import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sp-update-availability',
  templateUrl: './sp-update-availability.component.html',
  styleUrls: ['./sp-update-availability.component.css']
})
export class SpUpdateAvailabilityComponent {

  updateForm = new FormGroup({
    location: new FormControl('', Validators.required),
    availability: new FormControl(null, Validators.required),
  });

  updateSubmitForm() {
    const location = this.updateForm.value.location ?? '';
    const availability = this.updateForm.value.availability ?? null;

    // Your API service call or other logic here
  }

}
