import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-edit-appareil',
  templateUrl: './edit-appareil.component.html',
  styleUrls: ['./edit-appareil.component.scss']
})
export class EditAppareilComponent implements OnInit {

  defaultOnOff = "éteint";

  constructor(private appareilService: AppareilService,  //<--- on injecte le service et le router
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm){
  //  console.log(form.value); //<-- console log des valeurs du formulaire
  const name = form.value["name"];
  const statut = form.value["statut"];
  this.appareilService.addAppareil(name, statut);
  this.router.navigate(["/appareils"]);
  }



}
