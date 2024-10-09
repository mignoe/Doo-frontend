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

  constructor() {

    const user = localStorage.getItem('user');
    console.log('User: ', user);
  }

  ngOnInit(): void {
    this.loadProjects();
  }

  async loadProjects(): Promise<void> {
    const userId = 'user-id-here'; // Replace with actual user ID

    if (!userId) {
      console.error("User ID is required");
      return;
    }

    fetch(environment.apiUrl + '/projects/getProjectsByUser', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.user)
    }).
    then(response => {
      if (response.status !== 200) {
        throw new Error(response.statusText);
      }
      console.log(response.json());
    })

  }

}
