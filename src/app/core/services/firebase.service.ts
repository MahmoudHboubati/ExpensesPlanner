import {GenericService} from './generic.service';
import {FirebaseListObservable} from 'angularfire2';
import {FirebaseList, IFirebaseEntity} from '../domain/firebase.entity';
import {AuthService} from './auth.service';

export abstract class FirebaseService<TFirebaseEntity extends IFirebaseEntity> extends GenericService<TFirebaseEntity, FirebaseList<TFirebaseEntity>> {

  user: any;
  constructor(private _authService: AuthService) {
    super()
  }

  add(p: TFirebaseEntity, user) {

    var uid = user.uid;

    if (uid) {
      p.createdBy = uid;
    }

    this.get().push(p);
  }
}
