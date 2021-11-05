import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/User.model';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent implements OnInit {

  userForm: FormGroup;

  constructor(private formbuilder: FormBuilder,
              private userService: UserService,
              private router: Router) {


   }

  ngOnInit() {

    this.initForm();
  }

  initForm(){
    this.userForm = this.formbuilder.group( {
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email] ],
      hobbies: this.formbuilder.array([])
    });
  }

  onSubmitForm(){
    const formValue = this.userForm.value;
    const newUser = new User(
      formValue["firstName"],
      formValue["lastName"],
      formValue["email"],
      formValue["hobbies"] ? formValue["hobbies"] : [] // si il existe hobbies sinon []
    );
    this.userService.addUser(newUser);
    this.router.navigate(["/users"]);
  }

  getHobbies(){
    return this.userForm.get("hobbies") as FormArray;
  }

  onAddHobby(){
    const newHobbyControl = this.formbuilder.control("", Validators.required); //<- càd à partire du moment oou on cree le champs hobby alors il est requis
    this.getHobbies().push(newHobbyControl);
  }
}
