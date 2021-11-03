import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.authStatus = this.authService.isAuth; 
  }

  //Goal : déclanche la méthode signIn() de notre fichier auth.service qui est asynchrone
  onSignIn(){
    this.authService.signIn().then(
      ()=> {
        this.authStatus = this.authService.isAuth;
        this.router.navigate(['appareils']); //navigate permet  gâce à un tableau dynamique de rediriger une des pages du tableau    
      }
    );
  }

  //Goal : déclanche la méthode signOut() de note fichier auth.service
  onSignOut() {
    this.authService.signOut();
    this.authStatus = this.authService.isAuth;
  }

}
