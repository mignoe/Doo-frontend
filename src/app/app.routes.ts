import { Routes } from '@angular/router';

import { LoginComponent } from '../components/login/login.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { ProjectsPageComponent } from '../components/projects-page/projects-page.component';
import { CreateProjectComponent } from '../components/create-project/create-project.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'sign-up', component: SignUpComponent },
    { path: "projects", component: ProjectsPageComponent },
    {path: "create-project", component: CreateProjectComponent}
];
