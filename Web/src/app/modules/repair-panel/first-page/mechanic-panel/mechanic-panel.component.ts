import { Component, OnInit } from '@angular/core';
import { GarageService } from '../../services/garage.service';
import { PersonService } from '../../services/person.service';

@Component({
  selector: 'crc-mechanic-panel',
  templateUrl: './mechanic-panel.component.html',
  styleUrls: ['./mechanic-panel.component.scss']
})
export class MechanicPanelComponent implements OnInit {

  constructor(private garageService: GarageService,
    private pesronService: PersonService) { }


  ngOnInit() {
  }
}
