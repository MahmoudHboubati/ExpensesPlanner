import {AngularFire, FirebaseAuthState, AuthProviders, AuthMethods} from 'angularfire2';
import * as firebase from 'firebase';
import {Observable, Observer} from 'rxjs';
import { Inject } from '@angular/core';
import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  constructor(@Inject(AngularFire) private af: AngularFire) {
  }

  getAuth() {
    return firebase.auth();
  }

  logout() {
    this.af.auth.logout();
  }

  login(userEmail, password) {
    return firebase.auth().signInWithEmailAndPassword(userEmail, password);
  }

  public isAuthenticated() {

    var data = this.af.auth.getAuth();

    return data != null;
  }

  addOrUpdateUser(_authData) {
    const itemObservable = this.af.database.object('/users/' + _authData.uid);
    itemObservable.set({
      "provider": _authData.auth.providerData[0].providerId,
      "avatar": _authData.auth.photoURL || "MISSING",
      "displayName": _authData.auth.providerData[0].displayName || _authData.auth.email,
    })
  }

}

export interface IUserInfo {
  displayName: string;
  uid: string;
}
