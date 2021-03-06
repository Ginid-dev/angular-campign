import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CampaignComponent } from './components/campaign/campaign.component';

@NgModule({
  declarations: [AppComponent, CampaignComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [CookieService],
  bootstrap: [AppComponent],
})
export class AppModule {}
