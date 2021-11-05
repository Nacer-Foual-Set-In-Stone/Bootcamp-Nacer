import { Subject } from "rxjs";
import { User } from "../models/User.model";

export class UserService {

    private users: User[] = [
        {
            firstName: 'test1',
            lastName: 'testus',
            email:'ratus@ratz.fr',
            hobbies: ['foot','rien']
        }
    ]; //<--array de user

    
    userSubject = new Subject<User[]>();//<--crée un nouveau subject qui émettera des arrays d'objet de type user

    //Goal: Appelle la méthode next sur userSubject et vas émettre une copie de l'array user
    emitUser(){
        this.userSubject.next(this.users.slice());
    }
    //Goal : ajouter un user , push le user dans notre array private users , puis emet le subject
    addUser(user: User){
        this.users.push(user);
        this.emitUser();   
    }
}