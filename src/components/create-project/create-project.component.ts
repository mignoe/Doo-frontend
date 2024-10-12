import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-create-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent {
  projectName: string = '';
  projectUsers: string = '';
  projectAdmins: string = '';

  errorMessage: string | null = null;
  user: User = { id: '', name: '', password: '' };

  constructor(private router: Router) {
    const user = localStorage.getItem('user');
    console.log('User: ', user);
  }

  onSubmit(form: any) {
    if (form.valid) {

      const user= JSON.parse(localStorage.getItem('user') || '{}');

      if (!user) {  
        console.error('User not found in local storage');
        this.router.navigate(['/login']);
        return;
      }

      // Parse the users and admins names into lists
      // we need to trim the results to avoid any spaces characters in the names
      let listOfUsers = this.projectUsers.split(',').map(name => name.trim());
      let listOfAdmins = this.projectAdmins.split(',').map(name => name.trim());

      // we need to add the current user to the list of admins, if not already there
      // If the current user isn't on the project admins list he won't be able to control the projct
      if (!listOfAdmins.includes(user.name)) {
        listOfAdmins.push(user.name);
        listOfAdmins = listOfAdmins.filter(name => name !== '');
        console.log(listOfAdmins);
      }

      // Collect the project data
      const projectData = { 
                        name: this.projectName, 
                        usersNames: listOfUsers, 
                        adminsNames: listOfAdmins, 
                        // We still need to authenticate the user to make this operation
                        userName: user.name, 
                        userPassword: user.password }
                        ;
      


      // Send a POST request to create a project
      fetch(environment.apiUrl + '/projects/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(projectData)
      })
      .then(response => {
        if (response.status !== 201) {
          console.log('Project creation response', response);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('Project created successfully', data);

        const project = {
          id: data.id,
          name: this.projectName
        };

        // Store the created project in local storage
        localStorage.setItem('project', JSON.stringify(project));

        // Navigate to the projects list page after successful creation
        this.router.navigate(['/projects']);
      })
      .catch(error => {
        console.error('Error during project creation', error);
        this.errorMessage = 'Error creating project. Please try again.';
      });

      console.log('Form Submitted', { project: projectData });
    }
  }


  goBack() {
    this.router.navigate(['/projects']); // Make sure to import and inject Router in your component
  }

}
