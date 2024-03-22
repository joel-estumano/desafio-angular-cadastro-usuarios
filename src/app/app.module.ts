import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { SharedModule } from './shared/shared.module';
import localePT from '@angular/common/locales/pt';
registerLocaleData(localePT);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt-br' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
