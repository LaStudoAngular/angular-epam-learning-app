// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListItemComponent } from './components/courses/courses-list-item/courses-list-item.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { CourseNewItemComponent } from './components/courses/course-new-item/course-new-item.component';
import { CourseEditItemComponent } from './components/courses/course-edit-item/course-edit-item.component';

// DIRECTIVES
import { CreationDateDirective } from './@directives/creation-date.directive';

// MODULES
import { LoginModule } from './components/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

// PIPES
import { HouresPipe } from './@pipes/houres.pipe';
import { OrderByPipe } from './@pipes/order-by.pipe';
import { SearchByPipe } from './@pipes/search-by.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    BreadcrumbsComponent,
    CoursesComponent,
    CoursesListItemComponent,
    CreationDateDirective,
    HouresPipe,
    OrderByPipe,
    SearchByPipe,
    NotFoundComponent,
    CourseNewItemComponent,
    CourseEditItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoginModule,
    HttpClientModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
