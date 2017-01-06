import { Component, ViewChild, OnInit } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import {PlanInitialize} from '../pages/planInitialize/planInitialize';
import {LoginPage} from '../pages/login/login';
import {AngularFire} from 'angularfire2';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = PlanInitialize;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform, private af: AngularFire) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Initialize Plan', component: PlanInitialize }
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  ngOnInit() {
    this.af.auth.subscribe(auth => {
      if (auth) {
        this.openPage({ title: 'Initialize Plan', component: PlanInitialize });
      } else {
        this.openPage({ title: 'Login', component: LoginPage });
      }
    });
  }
}
