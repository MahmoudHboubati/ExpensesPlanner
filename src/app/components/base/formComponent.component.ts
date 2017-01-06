import {FormGroup} from '@angular/forms';
import {AuthService} from '../../core/services/auth.service';

export abstract class FormComponent<TEntity> {

  form: FormGroup;

  abstract buildControls(): FormGroup;
  abstract add();
  abstract createEntity(): TEntity;

  user: any;

  constructor(protected authService: AuthService) {

    authService.getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      }
    });

    this.form = this.buildControls();
  }
}
