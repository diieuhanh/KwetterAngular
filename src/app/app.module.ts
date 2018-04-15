import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { KwetterCmpComponent } from './kwetter-cmp/kwetter-cmp.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeCmpComponent } from './home-cmp/home-cmp.component';
import { routing, appRoutingProviders }  from './app.routing';


@NgModule({
  declarations: [
     AppComponent,
     KwetterCmpComponent,
     ProfileComponent,
     HomeCmpComponent
    ],
  imports: [
     BrowserModule,
     BrowserAnimationsModule,
     HttpModule,
     routing 
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
  

})
export class AppModule { }
