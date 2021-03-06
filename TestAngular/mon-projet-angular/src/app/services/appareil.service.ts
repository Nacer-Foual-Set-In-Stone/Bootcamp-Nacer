import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable()
export class AppareilService {

//on crée un Subject afin de pouvoir manipuler et afficher notre liste d'appareils qui est maintenant private donc non accessible 
//Goal: le Subject émet la liste des appareils
appareilSubject = new Subject<any[]>();

//Goal: Crée un tableau contenant les appareils que nous appelons dans nos directive if etc..
private appareils = [
  {
      id: 1,
      name: "Machine à laver",
      statut: "allumer" 
    },
    {
      id: 2,
      name: "Ordinateur",
      statut: "allumer"
    },
    {
      id: 3,
      name: "Télévision",
      statut: "éteint"
    }
  ];

constructor(private httpClient: HttpClient) {}

  //Goal : appelle la méthode next() sur le subject et force le subject à émettre ce qu'on lui passe en arguments
  //le .Sslice() permet d'emmettre une copie de notre array
  emitAppareilSubject(){
    this.appareilSubject.next(this.appareils.slice());
  }

  //Goal: retourne l'objet appareil par son id
  //Lafonction Find va chercher l'objet dans l'array appareil ou l'id correspond à l'id donné en argument 
  getAppareilById(id: number){
    const appareil = this.appareils.find(
      (appareilObject) => {
        return appareilObject.id === id;
      }
    );
      return appareil;
  }

  switchOnAll() {
      for(let appareil of this.appareils){
          appareil.statut = "allumer"
      }
      this.emitAppareilSubject();
  }

  switchOffAll() {
      for(let appareil of this.appareils){
          appareil.statut = "éteint"
      }
      this.emitAppareilSubject();
  }

  switchOnOne(index: number){
      this.appareils[index].statut = "allumer"
      this.emitAppareilSubject();
  } 

  switchOfOne(index: number){
      this.appareils[index].statut = "éteint"
      this.emitAppareilSubject();
  }

  addAppareil(name: string, statut: string){

    const appareilObject = {
      id: 0,
      name: "",
      statut: ""
    };
    appareilObject.name = name;
    appareilObject.statut = statut;
    appareilObject.id = this.appareils[this.appareils.length - 1].id + 1; //<- on récupère le dernier id de la list 
    this.appareils.push(appareilObject);
    this.emitAppareilSubject(); 
  }

  saveAppareilsToServer(){
    this.httpClient.put('https://angular-demo-32bf4-default-rtdb.europe-west1.firebasedatabase.app/appareils.json', this.appareils).subscribe(
      () =>{
        console.log("enregistrement terminer");
      },
      (error) => {
        console.log(" error in save" + error);
      }
    )
  }

  getAppareilsFromServer(){
    this.httpClient.get<any []>('https://angular-demo-32bf4-default-rtdb.europe-west1.firebasedatabase.app/appareils.json, this.appareils').subscribe(
      (response) => {
        this.appareils = response;
        this.emitAppareilSubject();
      },
      (error) => {
        console.log("error de chargement"+ error);
      }
    )
  }
}