import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { TestServiceService } from './test-service.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule, HttpClientJsonpModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ],
  providers: [TestServiceService]
})
export class AppModule { }
