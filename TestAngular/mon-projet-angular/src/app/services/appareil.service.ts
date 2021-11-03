import { Subject } from "rxjs";

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
}