import {AuthService} from '../../app/core/services/auth.service';

export abstract class BasePage {
  constructor(public headerPageTitle: string) {
  }
}

export abstract class GeneralPage extends BasePage {

  user: any;

  constructor(title: string, protected authService: AuthService) {
    super(title)

    authService.getAuth().onAuthStateChanged((user) => {
      console.log('user: ');
      console.log( user);
      if (user) {
        this.user = user;
      }
    });

    this.user = authService.getAuth().currentUser;

  }
}
