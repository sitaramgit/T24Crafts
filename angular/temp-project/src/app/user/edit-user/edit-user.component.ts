import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrl: './edit-user.component.css'
})
export class EditUserComponent {
  userId: string | any = null;
  editUserForm!: FormGroup;
  userDetails: any;
  errorMessage: string | null = null;

  constructor(private route: ActivatedRoute, private router: Router, private userSer: UserService, private fb: FormBuilder) {}

  ngOnInit(){
    this.userId = this.route.snapshot.paramMap.get('id');
    this.initializeTheFrom();
    this.getUserDetails();
  }
  getUserDetails() {
    this.userSer.getUserDetails(parseInt(this.userId)).subscribe((details)=>{
      console.log(details);
      this.userDetails = details;
      this.patchValuesToForm();
    })
  }
  initializeTheFrom() {
     // Initialize the form with validations
     this.editUserForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9\\-\\s]+$')]],
      website: ['', [Validators.required, Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?')]],
      address: this.fb.group({
        street: ['', Validators.required],
        suite: ['', Validators.required],
        city: ['', Validators.required],
        zipcode: ['', [Validators.required, Validators.pattern('^[0-9-]+$')]],
      }),
      company: this.fb.group({
        name: ['', Validators.required],
        catchPhrase: ['', Validators.required],
        bs: ['', Validators.required],
      }),
    });
  }
  patchValuesToForm(){
    this.editUserForm.patchValue(this.userDetails);
  }
  onSubmit(): void {
    if (this.editUserForm.valid) {
      console.log('Form Submitted', this.editUserForm.value);
      this.userSer.updateUserDetails(this.userId, this.editUserForm.value).pipe(
        catchError((error) => {
          console.error('Error updating user:', error);
          this.errorMessage = 'An error occurred while updating user details. Please try again later.';
          return of(null); // Return a null observable to continue gracefully
        })
      ).subscribe((data)=>{
        console.log(data)
        this.router.navigate(['users']);
      })
    } else {
      console.log('Form Invalid');
    }
  }
}
