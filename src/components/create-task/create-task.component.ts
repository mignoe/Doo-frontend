import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environment/environment';
import { User } from '../../interfaces/User';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css']
})
export class CreateTaskComponent {
  taskName: string = '';
  taskContent: string = '';
  errorMessage: string | null = null;


  constructor(private router: Router) {
    const user = localStorage.getItem('user');
    console.log('User: ', user);
  }

  onSubmit(form: any) {
    if (form.valid) {


        const sessionId = localStorage.getItem('sessionId');

      const user= JSON.parse(localStorage.getItem('user') || '{}');

      if (!user) {  
        console.error('User not found in local storage');
        this.router.navigate(['/login']);
        return;
      }

      // Collect the task data
      console.log("heeere", user);

      const taskData = { 
                    sessionId: sessionId, 
                    userName: user.name, 
                    userPassword: user.password, 
                    taskName: this.taskName, 
                    taskContent: this.taskContent 
                  };
      


      // Send a POST request to create a task
      fetch(environment.apiUrl + '/tasks/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      })
      .then(response => {
        if (response.status !== 201) {
          console.log('task creation response', response);
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        console.log('task created successfully', data);

        const task = {
          id: data.id,
          name: this.taskName
        };

        // Store the created task in local storage
        localStorage.setItem('task', JSON.stringify(task));

        // Navigate to the tasks list page after successful creation
        this.router.navigate(['/session']);
      })
      .catch(error => {
        console.error('Error during task creation', error);
        this.errorMessage = 'Error creating task. Please try again.';
      });
      

      console.log('Form Submitted', { task: taskData });
    }
  }

  goBack() {  
    this.router.navigate(['/session']);
  }
}
