import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { CvComponent } from './pages/cv/cv.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ViewProjectComponent } from './pages/view-project/view-project.component';
import { ManageProjectsComponent } from './pages/manage-projects/manage-projects.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'cv', component: CvComponent },
    { path: 'projects', component: ProjectsComponent },
    { path: 'project', children: [
        {path: '', component: ProjectsComponent},
        {path: ':id_pro', component: ViewProjectComponent}
    ]},
    { path: 'manage', component: ManageProjectsComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
