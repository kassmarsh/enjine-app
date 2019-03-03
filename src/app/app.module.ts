import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: 'chart', component: ChartComponent, data: { title: 'ETF Files' } },
  { path: '', component: HomeComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    HomeComponent
  ],
  imports: [
  	RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
