import {Injectable} from '@angular/core';
import {AngularFire} from 'angularfire2';
import {FirebaseService} from './firebase.service';
import {IExpenses} from '../domain/expenses.entity';
import {AuthService} from './auth.service';

@Injectable()
export class ExpensesService extends FirebaseService<IExpenses> {
  constructor(private af: AngularFire, _authService: AuthService) {
    super(_authService);
  }
  get() {
    return this.af.database.list('/expenses');
  }
}
