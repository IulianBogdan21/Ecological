import { Component, OnInit } from '@angular/core';
import { AbstractControl, NonNullableFormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { addDoc, Firestore, collection, getDocs } from '@angular/fire/firestore';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        passwordsDontMatch: true
      };
    } else {
        return null;
    }
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.email, Validators.required]],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required],
  }, 
  {
    validators: passwordsMatchValidator()
  });

  constructor (
    public firestore: Firestore,
    private authService: AuthenticationService,
    private toast: HotToastService,
    private router: Router,
    private fb: NonNullableFormBuilder) {}

  ngOnInit(): void {}

  get name() {
    return this.signUpForm.get('name');
  }

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  async submitSignUp(value: any) {

    var isValid = true;

    const {name, email, password} = this.signUpForm.value;

    if (!this.signUpForm.valid || !name || !password || !email) {
      return;
    }

    const snapshot = await getDocs(collection(this.firestore, 'levelling_and_xp'));
      snapshot.forEach((doc) => {
          if(doc.data()['email'] == email){
            isValid = false;
          }
      });
      
      if (isValid) {
        this.registerUserXp(value);
        this.registerUserStatistics(value); 
      }

    this.authService
      .signUp(email, password)
      .pipe(
        this.toast.observe({
          success: 'Congrats! You are all signed up',
          loading: 'Signing up...',
          error: 'The email address is already in use',
        })
      )
      .subscribe(() => {
        this.router.navigate(['/user-statistics']);
      });
  }

  registerUserXp(value: any) {
    const dbInstanceXp = collection(this.firestore, 'levelling_and_xp');
    addDoc(dbInstanceXp, {
      email: value.email,
      xp: 0
    })
    .catch((err) => {
      alert(err.message)
    })
  }

  registerUserStatistics(value: any) {
    const dbInstanceStatistics = collection(this.firestore, 'recycled_items');
    addDoc(dbInstanceStatistics, {
      email: value.email,
      metal: 0,
      paper: 0,
      plastic: 0
    })
    .catch((err) => {
      alert(err.message)
    })
  }
}
