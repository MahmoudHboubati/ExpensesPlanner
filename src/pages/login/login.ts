import {AngularFire, AuthProviders, AuthMethods, FirebaseAuthState, FirebaseAuth} from 'angularfire2';
import {Component, OnInit, Inject} from '@angular/core';
import { NavController, ViewController, NavParams} from 'ionic-angular';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService, IUserInfo} from '../../app/core/services/auth.service';
import {TabsPage} from '../tabs/tabs';

@Component({
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class LoginPage {

  error: any;
  loginForm: FormGroup;

  userInfo: any;

  constructor(public viewCtrl: ViewController,
    builder: FormBuilder,
    public _params: NavParams,
    private _authService: AuthService,
    private _navCtrl: NavController,
    private fbAuth: FirebaseAuth,
  private af: AngularFire) {

    this.loginForm = builder.group({
      'email': [
        '', // default value
        [Validators.required, Validators.minLength(5)]
      ],
      'password': [
        '',
        [Validators.required, Validators.minLength(5)]
      ]
    });
    // console.log(this.af);
  }
  /**
   * this will dismiss the modal page
   */
  dismiss() {
    this.viewCtrl.dismiss();
  }
  /**
   * this create in the user using the form credentials.
   *
   * we are preventing the default behavor of submitting
   * the form
   *
   * @param _credentials {Object} the email and password from the form
   * @param _event {Object} the event information from the form submit
   */
  // registerUser(_credentials, _event) {
  //   _event.preventDefault();
  //
  //   this._authService.registerUser(_credentials, this.registerSucceded, this.registerError);
  // }

  registerSucceded(userInfo: IUserInfo) {

  }

  registerError(error) {

  }

  /**
   * this logs in the user using the form credentials.
   *
   * if the user is a new user, then we need to create the user AFTER
   * we have successfully logged in
   *
   * @param _credentials {Object} the email and password from the form
   * @param _event {Object} the event information from the form submit
   */
  login(credentials, _event) {
    _event.preventDefault();
    // console.log('hi')
    // if this was called from the register user,  the check if we
    // need to create the user object or not
    let addUser = credentials.created;
    credentials.created = null;

    var userEmail = credentials.email;
    var password = credentials.password;

    // var promis = this._authService.login(userEmail, password);
    //
    // promis.then((a: firebase.User) => {
    //   this.loggedInSucceeded(a);
    // }).catch((e: Error) => {
    //   this.loginFailed(e);
    // });

    this.af.auth.login({email: userEmail, password: password}).catch((e)=>{
      console.log(e)
    });
  }

  loginFailed(error) {
  }

  loggedInSucceeded(userInfo: firebase.User) {
    try {
      this.userInfo = userInfo;
      console.log('login: ')
      console.log(this.userInfo)
    }
    catch (e) {
    }
  }
}
