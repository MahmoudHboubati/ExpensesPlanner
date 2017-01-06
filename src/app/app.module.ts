import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { PlanInitialize } from '../pages/planInitialize/planInitialize';
import { LoginPage } from '../pages/login/login';
import {PlanDistribution} from '../pages/planDistribution/planDistribution';
import {MainHeaderNavbarComponent} from './components/headerNavbar/mainHeaderNavbar.component';
import {ChartDirective} from './components/charts/ChartJS.directive';
import {AuthService} from './core/services/auth.service';

import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { ChartsModule } from 'ng2-charts/ng2-charts';
// Must export the config
export const firebaseConfig = {
  apiKey: "AIzaSyC5VvURIFqzvPJt-35oUyQCPWgx2svvaNg",
  authDomain: "myanimationapp.firebaseapp.com",
  databaseURL: "https://myanimationapp.firebaseio.com",
  storageBucket: "firebase-myanimationapp.appspot.com",
};

export const firebaseAuthConfig = {
  provider: AuthProviders.Password,
  method: AuthMethods.Popup,
  remember: 'default',
  scope: ['email']
}

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
    MainHeaderNavbarComponent,
    ChartDirective,
    PlanInitialize,
    LoginPage,
    PlanDistribution
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    ChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
    PlanInitialize,
    LoginPage,
    PlanDistribution
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, AuthService]
})
export class AppModule { }
