import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil-view',
  templateUrl: './appareil-view.component.html',
  styleUrls: ['./appareil-view.component.scss']
})
export class AppareilViewComponent implements OnInit {

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

  appareils: any[];
  appareilSubscription: Subscription; //On vas stocker notre subscription dans un objet du type Subscirption

  /* premiere version utilisé avec ngIf ainsi que le Input() appareilName
  appareilOne = "Machine à laver";
  appareilTwo = "Ordinateur";
  appareilThree = "Télévision";
  */

  //Goal: Injéction du service AppareilService directement dans le constructor Ainsi c'est de cette manière qu'on déclare un service
  //Goal: Timer de 4 seconde crée pour rendre le boutton cliquable au bout d'un moment
  constructor(private appareilService: AppareilService){
    setTimeout(
       () => {
      this.isAuth = true;
    }, 4000
    );
  }

  //Goal faire en sorte que notre tableau Local appareils: any[]; soit égale au tableau dans notre services
  ngOnInit(){

    this.appareilSubscription = this.appareilService.appareilSubject.subscribe(  // <-- On souscit au Subject qui va emmetre un array de type any qui contiendra nos appareils
      (appareils: any[]) =>{
        this.appareils = appareils; // this.appareil = notre liste d'appareil en local // Goal on prend la copie qui est donner et on l'associe a notre variable local
      }

    );

    this.appareilService.emitAppareilSubject();

  }

  //appelle les methode du service 
  onAllumer() { 
    this.appareilService.switchOnAll();
  }

  onEteindre(){
    this.appareilService.switchOffAll();
  }

}
