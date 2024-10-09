import { Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { ProjectsPageComponent } from '../components/projects-page/projects-page.component';
import { CreateProjectComponent } from '../components/create-project/create-project.component';
import { ProjectComponent } from '../components/project/project.component';
import { CreateSessionComponent } from '../components/create-session/create-session.component';
import { SessionComponent } from '../components/session/session.component';
import { CreateTaskComponent } from '../components/create-task/create-task.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: "projects", component: ProjectsPageComponent },
    {path: "create-project", component: CreateProjectComponent},
    { path: 'project', component: ProjectComponent },
    { path: 'create-session', component: CreateSessionComponent },
    { path: 'session', component: SessionComponent },
    { path: 'create-task', component: CreateTaskComponent },  

];
