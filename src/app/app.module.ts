import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { FileUploadComponent } from './file-upload/file-upload.component';

const appRoutes: Routes = [
  { path: 'chart', component: ChartComponent, data: { title: 'ETF Files' } },
  { path: '', component: FileUploadComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    FileUploadComponent
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
