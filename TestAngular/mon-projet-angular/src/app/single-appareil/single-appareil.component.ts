import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-single-appareil',
  templateUrl: './single-appareil.component.html',
  styleUrls: ['./single-appareil.component.scss']
})
export class SingleAppareilComponent implements OnInit {

  name: string = "Apppareil";
  statut: string = "Satut";

  constructor(private appareilService: AppareilService,
              private route: ActivatedRoute) { }

  //pour une raison que je ne comprend pas il faut rajouter un ! après l'expr (ou sinon --strictNullChecks dans les param du compilateur)
  ngOnInit(){
    /*
    const appareil = this.appareilService.getAppareilById(
      this.route.snapshot.params['id']
    )
    */
 
    const id = this.route.snapshot.params['id'];
    const appareil = this.appareilService.getAppareilById(+id)!;
    if (appareil !== null){ 
    //this.name = this.appareilService.getAppareilById(+id).name; // l'ajout du + permet de cast en tant que int
    //this.statut = this.appareilService.getAppareilById(id).statut;
    this.name = appareil.name;
    this.statut = appareil.statut;
    }else{
      console.log("error");
    }
   /*
   this.route.params.forEach(async () => {
    this.id = params.id;
    this.appareil = await this.appareilService.getAppareilById(this.id);
     
   });
   */
  }

}
