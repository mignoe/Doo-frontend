import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { environment } from '../../../environment/environment';


@Component({
  selector: 'app-session',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
    
  ],
  templateUrl: './session.component.html',
  styleUrl: './session.component.css'
})
export class SessionComponent {
  taskName: string = localStorage.getItem('taskName') || '';
  tasks: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  async loadTasks(): Promise<void> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const sessionId = localStorage.getItem('sessionId');
    const queryParams = new URLSearchParams({
      sessionId: sessionId || ''
    }).toString();

    try {
      const response = await fetch(`${environment.apiUrl}/tasks/getTasksBySession?${queryParams}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        console.error('Failed to load sessions:', response.statusText);
        return;
      }

      const data = await response.json();
      this.tasks = data;
      console.log('Tasks:', data);
    } catch (error) {
      console.error('Failed to load tasks:', error);
    }
  }

  completeTask(taskId: string): void {
  }

  goBack() {
    this.router.navigate(['/project']); // Make sure to import and inject Router in your component
  }
  

  createTask(): void {
    console.log('Creating task');
    this.router.navigate(['/create-task']);
  }

  goToTask(taskId: string, taskName: string): void {
    console.log('Navigating to task:', taskId);
    localStorage.setItem('taskName', taskName);
    localStorage.setItem('taskId', taskId);
    this.router.navigate(['/task']);
  }

}
