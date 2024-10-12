import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms'; // Import FormsModule
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  name: string = '';
  password: string = '';
  errorMessage: string | null = null;

  constructor(private router: Router) {}

  onSubmit(form: any) {


    if (form.valid) {
      // Process the form (e.g., send data to the server)

      const login = { name: this.name, password: this.password };
  
      fetch(environment.apiUrl + '/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(login)
      })
      .then(response => {
        if (response.status !== 200) {
          
        console.log('Login response', response);
          throw new Error(response.statusText);
        }
        console.log('Login response', response);
        return response.json();
      })
      .then(data => {
        console.log('Login successful', data);

        const user = {
          id: data.id,
          name: data.user,
          password: this.password
        }

        // Store the user data in local storage
        localStorage.setItem('user', JSON.stringify(user));

        // Navigate to login page after successful sign-up
        this.router.navigate(['/projects']);
      })
      .catch(error => {
        console.error('Error during sign up', error);
        // Handle error (e.g., display error message)
        if (error.message === 'Unauthorized') {
          this.errorMessage = "Invalid username or password";
        } else if (error.message == "Failed to fetch") {
          this.errorMessage = "Failed to connect to the server, the server may be down";
        }
      });


      console.log('Form Submitted', { username: this.name, password: this.password });
    }
  }
}
