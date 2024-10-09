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
  sessionName: string = localStorage.getItem('sessionName') || '';
  sessions: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadSessions();
  }

  async loadSessions(): Promise<void> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const sessionId = localStorage.getItem('sessionId');
    const queryParams = new URLSearchParams({
      sessionId: sessionId || ''
    }).toString();

    try {
      const response = await fetch(`${environment.apiUrl}/sessions/getSessionsBySession?${queryParams}`, {
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

  goToSession(sessionId: string): void {
    console.log('Navigating to session:', sessionId);
    localStorage.setItem('sessionId', sessionId);
    this.router.navigate(['/session', sessionId]);
  }

}
