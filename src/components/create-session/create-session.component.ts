import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-create-session',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-session.component.html',
  styleUrls: ['./create-session.component.css']
})
export class CreateSessionComponent {
  sessionName: string = '';
  errorMessage: string | null = null;
  user: User = { id: '', name: '', password: '' };


  constructor(private router: Router) {
    const user = localStorage.getItem('user');
    console.log('User: ', user);
  }

  onSubmit(form: any) {
    if (form.valid) {


        const projectId = localStorage.getItem('projectId');

      const user= JSON.parse(localStorage.getItem('user') || '{}');

      if (!user) {  
        console.error('User not found in local storage');
        this.router.navigate(['/login']);
        return;
      }

      // Collect the session data
      console.log("heeere", user);

      const sessionData = { projectId: projectId, adminName: user.name, adminPassword: user.password, sessionName : this.sessionName };
      


      // Send a POST request to create a session
      fetch(environment.apiUrl + '/sessions/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sessionData)
      })
      .then(response => {
        if (response.status !== 201) {
          console.log('session creation response', response);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('session created successfully', data);

        const session = {
          id: data.id,
          name: this.sessionName
        };

        // Store the created session in local storage
        localStorage.setItem('session', JSON.stringify(session));

        // Navigate to the sessions list page after successful creation
        this.router.navigate(['/project']);
      })
      .catch(error => {
        console.error('Error during session creation', error);
        this.errorMessage = 'Error creating session. Please try again.';
      });

      console.log('Form Submitted', { session: sessionData });
    }
  }

  goBack() {
    this.router.navigate(['/project']);
  }
}
