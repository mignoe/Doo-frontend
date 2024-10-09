import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { FormsModule } from '@angular/forms';
import { environment } from '../../../environment/environment';


@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
    
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  projectName: string = localStorage.getItem('projectName') || '';
  sessions: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  async loadSessions(): Promise<void> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const projectId = localStorage.getItem('projectId');
    const queryParams = new URLSearchParams({
      projectId: projectId || ''
    }).toString();

    try {
      const response = await fetch(`${environment.apiUrl}/sessions/getSessionsByProject?${queryParams}`, {
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
      this.sessions = data;
      console.log('Sessions:', data);
    } catch (error) {
      console.error('Failed to load sessions:', error);
    }
  }

  createSession(): void {
    console.log('Creating session');
    this.router.navigate(['/create-session']);
  }

  goBack() {
    this.router.navigate(['/projects']); // Make sure to import and inject Router in your component
  }

  goToSession(sessionId: string, sessionName: string): void {
    console.log('Navigating to session:[', sessionId);
    localStorage.setItem('sessionName', sessionName);
    localStorage.setItem('sessionId', sessionId);
    this.router.navigate(['/session']);
  }

}
