import { Component, effect, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatRadioModule } from '@angular/material/radio';
import { MatButtonModule } from '@angular/material/button';
import { Activity } from '../activity-interface';

@Component({
  selector: 'app-activity-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatButtonModule,
  ],
  styles: `
    .activity-form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 2rem;
    }
    .mat-mdc-radio-button ~ .mat-mdc-radio-button {
      margin-left: 16px;
    }
    .mat-mdc-form-field {
      width: 100%;
    }
  `,
  template: `
    <form
      class="activity-form"
      autocomplete="off"
      [formGroup]="activityForm"
      (submit)="submitForm()"
    >
      <mat-form-field appearance="fill">
        <mat-label>Activity Name</mat-label>
        <input matInput placeholder="Enter Activity Name" formControlName="activityName" required />
        @if (activityName.invalid) {
        <mat-error>Name must be at least 3 characters long.</mat-error>
        }
      </mat-form-field>

      <div formGroupName="location">
        <mat-form-field appearance="fill">
          <mat-label>Latitude</mat-label>
          <input matInput placeholder="Enter latitude" formControlName="lat" required>
          @if (latitude.invalid) {
          <mat-error>Latitude is required.</mat-error>
          }
        </mat-form-field>
        
        <mat-form-field appearance="fill">
          <mat-label>Longitude</mat-label>
          <input matInput placeholder="Enter longitude" formControlName="lng" required>
          @if (longitude.invalid) {
          <mat-error>Longitude is required.</mat-error>
          }
        </mat-form-field>
      </div>

      <mat-radio-group formControlName="difficultyLevel" aria-label="Select an option">
        <mat-radio-button name="difficultyLevel" value="Beginner" required 
          >Beginner</mat-radio-button
        >
        <mat-radio-button name="difficultyLevel" value="Intermediate"
          >Intermediate</mat-radio-button
        >
        <mat-radio-button name="difficultyLevel" value="Advanced"
          >Advanced</mat-radio-button
        >
      </mat-radio-group>
      <br />
      <button
        mat-raised-button
        color="primary"
        type="submit"
        [disabled]="activityForm.invalid"
      >
        Add
      </button>
    </form>
  `,
})

export class ActivityFormComponent implements OnInit {
  @Input() initialState: Activity | null = null;
  @Output() formSubmitted = new EventEmitter<Activity>();

  activityForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.activityForm = this.formBuilder.group({
      activityName: ['', [Validators.required, Validators.minLength(3)]],
      location: this.formBuilder.group({
        lat: ['', [Validators.required, Validators.pattern(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
        lng: ['', [Validators.required, Validators.pattern(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
      }),
      difficultyLevel: ['Beginner', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (this.initialState) {
      this.activityForm.patchValue(this.initialState);
    }
  }

  get activityName() {
    return this.activityForm.get('activityName');
  }

  get location() {
    return this.activityForm.get('location');
  }

  get latitude() {
    return this.activityForm.get('location.lat');
  }

  get longitude() {
    return this.activityForm.get('location.lng');
  }

  get difficultyLevel() {
    return this.activityForm.get('difficultyLevel');
  }

  submitForm(): void {
    if (this.activityForm.valid) {
      this.formSubmitted.emit(this.activityForm.value);
    } else {
      // Consider logging the error state if the form is not valid
      console.error('Form is invalid', this.activityForm.errors);
    }
  }
}




// export class ActivityFormComponent {
//   initialState = input<Activity>();

//   activityForm: any;

//   @Output()
//   formValuesChanged = new EventEmitter<Activity>();

//   @Output()
//   formSubmitted = new EventEmitter<Activity>();
  
//   constructor(private formBuilder: FormBuilder) {
//     this.activityForm = this.formBuilder.group({
//       activityName: ['', [Validators.required, Validators.minLength(3)]],
//       location: this.formBuilder.group({
//         lat: ['', [Validators.required, Validators.pattern(/^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
//         lng: ['', [Validators.required, Validators.pattern(/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/)]],
//       }),
//       difficultyLevel: ['Beginner', [Validators.required]],
//     });

//     effect(() => {
//       this.activityForm.setValue({
//         activityName: this.initialState()?.activityName || '',
//         location: this.initialState()?.location || { lat: '', lng: '' },
//         difficultyLevel: this.initialState()?.difficultyLevel || 'Beginner',
//       });
//     });
//   }

//   get activityName() {
//     return this.activityForm.get('activityName')!;
//   }

//   get location() {
//     return this.activityForm.get('location')!;
//   }

//   get latitude() {
//     return this.activityForm.get('location.lat');
//   }

//   get longitude() {
//     return this.activityForm.get('location.lng');
//   }

//   get difficultyLevel() {
//     return this.activityForm.get('difficultyLevel')!;
//   }

//   submitForm() {
//     if (this.activityForm.valid) {
//       this.formSubmitted.emit(this.activityForm.value as Activity);
//     }
//   }
// }