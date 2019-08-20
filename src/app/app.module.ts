// MODULES
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';

// COMPONENTS
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { CoursesComponent } from './components/courses/courses.component';
import { CoursesListItemComponent } from './components/courses/courses-list-item/courses-list-item.component';
import { CreationDateDirective } from './@directives/creation-date.directive';
import { HouresPipe } from './@pipes/houres.pipe';
import { OrderByPipe } from './@pipes/order-by.pipe';

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
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
