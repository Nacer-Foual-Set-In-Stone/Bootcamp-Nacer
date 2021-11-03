import { Component, OnDestroy, OnInit } from '@angular/core';
import { AppareilService } from './services/appareil.service';
import { Observable, interval, Subscription } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  secondes: number;
  counterSubscription: Subscription;

  constructor(){}

  //méthode qui crée une subscription et initialise un counter qui s'incremente au fur est à mesure 
  //Ceci illustre l exemple d'un observable qui récupère des information et les traite
  ngOnInit()  {

    const counter = interval(1000);
    this.counterSubscription = counter.subscribe(
      (value: number) => {
        this.secondes = value;
      }
    );


    /* Méthode initial pour le counter 
    counter.subscribe(
      (value: number) => {
        this.secondes = value;
      },
      (error: any) => {
        console.log("erooooor in interval");
      },
      () => {
        console.log("Obserable complété");
      }
    )
    */
  } 

  //méthode pour detruire la subscription à la fin de la vie du component afin d'eviter un comportement infinie
  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }
 
}

