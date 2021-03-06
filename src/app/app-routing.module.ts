import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './components/courses/courses.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CourseNewItemComponent } from './components/courses/course-new-item/course-new-item.component';
import { CourseEditItemComponent } from './components/courses/course-edit-item/course-edit-item.component';
import { AuthGuard } from './@auth/auth.guard';
import { LoginComponent } from './components/login/login/login.component';

const routes: Routes = [
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuard] },
  { path: 'courses/new', component: CourseNewItemComponent, canActivate: [AuthGuard] },
  { path: 'courses/:id', component: CourseEditItemComponent, canActivate: [AuthGuard] },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule),
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
