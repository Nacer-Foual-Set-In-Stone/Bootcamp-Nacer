import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isAuth = false;

  //lastUpdate = new Date(); <-- version simple sans async

  //GOAL : version async ou on attend la fin du timeout pour afficher la date
  lastUpdate: Promise<Date> = new Promise(
    (resolve,reject) => {
      const date = new Date();
      setTimeout(
        () => {
          resolve(date);
        }, 2000 
      );
    }
  );

//Goal: Crée un tableau contenant les appareils que nous appelons dans nos directive if etc..
  appareils = [
    {
      name: "Machine à laver",
      statut: "allumer" 
    },
    {
      name: "Ordinateur",
      statut: "allumer"
    },
    {
      name: "Télévision",
      statut: "éteint"
    }
  ];
  /* premiere version utilisé avec ngIf ainsi que le Input() appareilName
  appareilOne = "Machine à laver";
  appareilTwo = "Ordinateur";
  appareilThree = "Télévision";
  */

  //Goal: Timer de 4 seconde crée pour rendre le boutton cliquable au bout d'un moment
  constructor(){
    setTimeout(
       () => {
      this.isAuth = true;
    }, 4000
    );
  }

  onAllumer() { 
    console.log("On Allume tout");
  }
}

