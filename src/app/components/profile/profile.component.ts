import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertService } from '../../alert.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {
  profileForm: FormGroup;

  constructor(private fb: FormBuilder, private alertService: AlertService) {
    this.profileForm = this.fb.group({
      displayName: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      aboutYourself: ['', [Validators.required, Validators.maxLength(100)]],
      areaOfInterest: [[], Validators.required],
      status: ['student', Validators.required],
      professionalDetails: this.fb.group({
        experience: ['', Validators.required],
        expertise: ['', Validators.required],
        role: ['', [Validators.required, Validators.maxLength(200)]]
      })
    });
  }

  saveProfile() {
    if (this.profileForm.invalid) {
      alert('Validation failed. Please check your inputs.');
    }
    else {
      this.alertService.showSuccess('Form added succesfully!');
      this.profileForm.reset();
    }
  }
}
