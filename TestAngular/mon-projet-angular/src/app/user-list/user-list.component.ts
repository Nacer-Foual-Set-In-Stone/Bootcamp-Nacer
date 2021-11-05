import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {

  //un array User en Local
  users: User[];
  userSubsciption: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(){
    this.userSubsciption = this.userService.userSubject.subscribe( //on crée une subscription et on souscrit au subjet dans le service
    (users: User[]) => {
      this.users = users;

    } 
    );
    this.userService.emitUser();
  }

  ngOnDestroy(){
    this.userSubsciption.unsubscribe();
  }
}
