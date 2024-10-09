import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


import { FormsModule } from '@angular/forms'; 
import { environment } from '../../../environment/environment';
import { User } from '../../interfaces/User';

// import { HttpClient } from '@angular/common/http';;

interface Project {
  id: string;
  name: string;
  sessions: any[];
  users: any[];
  admins: any[];
}

@Component({
  selector: 'app-projects-page',
  standalone: true,
  imports: [
    CommonModule
  ], 
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {
  projects: Project[] = [];
  user: User = { id: '', name: '', password: '' };

  constructor(private router: Router) {

    const user = localStorage.getItem('user');
    console.log('User: ', user);
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  async loadProjects(): Promise<void> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const queryParams = new URLSearchParams({
      name: user.name,
      password: user.password
    }).toString();
    
    console.log("making request on ", `${environment.apiUrl}/projects/getProjectsByUser?${queryParams}`);
    try {
      const response = await fetch(`${environment.apiUrl}/projects/getProjectsByUser?${queryParams}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
      });

      if (!response.ok) {
      throw new Error(response.statusText);
      }

      const data = await response.json();
      this.projects = data.projects;
      console.log('Projects:', this.projects);
      console.log(data); // Handle the data here

    } catch (error) {
      console.error('Error:', error);
    }
    

  }

  createProject(): void {
    console.log('Creating project');
    this.router.navigate(['/create-project']);
  }

  goToProject(projectId: string): void {
    console.log('Navigating to project:', projectId);
    localStorage.setItem('projectId', projectId);
    this.router.navigate(['/project']);
  }

}
