import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable} from 'angularfire2';
import {FirebaseService} from "./firebase.service";
import {IUserSettings} from '../domain/userSettings.entity';
import {AuthService} from './auth.service';

@Injectable()
export class UserSettingsService extends FirebaseService<IUserSettings> {
  constructor(private af: AngularFire, _authService: AuthService) {
    super(_authService);
  }

  get() {
    return this.af.database.list('/userSettings');
  }

  //Todo: this should be maintained an put it in base.
  addOrUpdate(userSettings: IUserSettings){
    this.af.database.object('/userSettings/' + userSettings.createdBy).set(userSettings);
  }

  getUserSettings(user){
    return this.af.database.object('/userSettings/' + user.uid);
  }
}
