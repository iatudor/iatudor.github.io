import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireAuthGuard, hasCustomClaim, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';

import { HomeComponent } from './pages/home/home.component';
import { CvComponent } from './pages/cv/cv.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ViewProjectComponent } from './pages/view-project/view-project.component';
import { ManageProjectsComponent } from './pages/manage-projects/manage-projects.component';
import { LoginComponent } from './pages/login/login.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['home']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'cv', component: CvComponent },
    { path: 'projects', children: [
      {path: '', component: ProjectsComponent},
      {path: 'tags/:tag_pro', component: ProjectsComponent}, //! Perque l'agaffa la ruta?
      {path: 'title/:title_pro', component: ProjectsComponent}
    ]},
    { path: 'project', children: [
        {path: '', component: ProjectsComponent},
        {path: ':id_pro', component: ViewProjectComponent}
    ]},
    { path: 'manage', component: ManageProjectsComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin} },
    { path: 'login', component: LoginComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToHome }}
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
