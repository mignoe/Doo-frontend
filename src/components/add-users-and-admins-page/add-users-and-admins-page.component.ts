import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';

@Component({
  selector: 'app-add-users-and-admins-page',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './add-users-and-admins-page.component.html',
  styleUrls: ['./add-users-and-admins-page.component.css']
})
export class AddUsersAndAdminsPageComponent {
  newUserName: string = '';
  isAdmin: boolean = false;
  typeOfUser: string = 'user'; // Will be updated based on checkbox value
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  onSubmit(form: any) {
    if (form.valid) {
      const user = JSON.parse(localStorage.getItem('user') || '{}');

      if (!user) {
        console.error('User not found in local storage');
        this.router.navigate(['/login']);
        return;
      }

      const projectId = localStorage.getItem('projectId');
      this.newUserName = this.newUserName.trim();
      console.log('New user name:', this.newUserName);

      // Set the type of user based on the checkbox value
      this.typeOfUser = this.isAdmin ? 'Admin' : 'User';

      let addUserData: any = {};

      if (!this.isAdmin) {
        addUserData = { 
          newUserName: this.newUserName, 
          projectId: projectId, 
          adminName: user.name, 
          adminPassword: user.password 
        };
      } else {
        addUserData = { 
          newAdminName: this.newUserName, 
          projectId: projectId, 
          adminName: user.name, 
          adminPassword: user.password 
        };
      }

      // Send a PATCH request to add the user to a project
      fetch(environment.apiUrl + '/projects/add' + this.typeOfUser, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(addUserData)
      })
      .then(response => {
        if (response.status !== 200) {
          console.log('Add user response', response);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('User added successfully', data);
        this.router.navigate(['/project']);
      })
      .catch(error => {
        console.error('Error during user addition', error);
        if (error.status === 500) {
          this.errorMessage = 'Error on adding user. Please try again. Most likely this user doesn\'t exist.';
        } else if (error.status === 401) {
          this.errorMessage = 'Unauthorized. You are not an admin from this project.';
        }
      });

      console.log('Form Submitted', { project: addUserData });
    }
  }

  goBack() {
    this.router.navigate(['/projects']);
  }
}
