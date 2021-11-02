import { Component, Input, OnInit } from '@angular/core';
import { AppareilService } from '../services/appareil.service';

@Component({
  selector: 'app-appareil',
  templateUrl: './appareil.component.html',
  styleUrls: ['./appareil.component.scss']
})
export class AppareilComponent implements OnInit {

  @Input() appareilName: string;
  @Input() appareilStatut: string;
  @Input() IndexOfAppareil: number;

  constructor(private appareilService: AppareilService)  { }

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

  onSwitchOn(){
    this.appareilService.switchOnOne(this.IndexOfAppareil);
  }  

  onSwitchOff(){
    this.appareilService.switchOfOne(this.IndexOfAppareil);
  }
  
}
