import { Component, NgModule  } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  passwordsDoNotMatch: boolean = false;

  constructor(private router: Router) { }

  onSubmit(form: any) {
    this.passwordsDoNotMatch = this.password !== this.confirmPassword;


    if (!this.passwordsDoNotMatch && form.valid) {
      // Process the form (e.g., send data to the server)

      const signupData = { name: this.username, password: this.password };
  
      fetch(environment.apiUrl + '/sign-up', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signupData)
      })
      .then(response => {
        if (response.status !== 201) {
          
        console.log('Sign up response', response);
          throw new Error(response.statusText);
        }
        console.log('Sign up response', response);
        return response.json();
      })
      .then(data => {
        console.log('Sign up successful', data);
        // Navigate to login page after successful sign-up
        this.router.navigate(['/login']);
      })
      .catch(error => {
        console.error('Error during sign up', error);
        // Handle error (e.g., display error message)
      });


      console.log('Form Submitted', { username: this.username, password: this.password });
    }
  }
}
