import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string;
  @Input() appareilStatut: string;

  constructor() { }

  ngOnInit()  {
  }

  getStatus() {
    return this.appareilStatut;
  }

  getColor(){
    if(this.appareilStatut === "allumer"){
      return 'green';
    }else 
      return 'red';
    }
  
}
