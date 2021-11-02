export class AppareilService {

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

  switchOnAll() {
      for(let appareil of this.appareils){
          appareil.statut = "allumer"
      }
  }

  switchOffAll() {
      for(let appareil of this.appareils){
          appareil.statut = "éteint"
      }
  }

  switchOnOne(index: number){
      this.appareils[index].statut = "allumer"
  }

  switchOfOne(index: number){
      this.appareils[index].statut = "éteint"
  }
}