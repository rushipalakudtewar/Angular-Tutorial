import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CounterComponent } from './counter/counter.component';
import { CustomCounterComponent } from './custom-counter/custom-counter.component';
import { AngularModule } from './angular.module';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { LoadingspinnerComponent } from './loadingspinner/loadingspinner.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    CounterComponent,
    CustomCounterComponent,
    AngularModule,
    HeaderComponent,
    LoadingspinnerComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'learnNgRx';

}
