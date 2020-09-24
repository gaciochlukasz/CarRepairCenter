import { Component, OnInit } from '@angular/core';
import { MenuModel } from '../models/menu.model';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { PersonService } from '../services/person.service';
import { all } from 'q';
import { PersonTypeEnum } from 'src/app/enums/person-type.enum';


const TREE_DATA: MenuModel[] = [
  {
    name: 'Pulpit',
    routerLink: ['panel/dashboard']
  },
  {
    name: 'Klienci',
    elements: [
      {
        name: 'Lista klientów',
        routerLink: ['panel/clients-list']
      },
      {
        name: 'Dodaj nowego klienta',
        routerLink: ['panel/new-client']
      }
    ]
  }, {
    name: 'Ustawienia pracownika',
    elements: [
      {
        name: 'Profil',
        routerLink: ['panel/employee-profile']
      }
    ]
  }, {
    name: 'Warsztat',
    access: '1',
    elements: [
      {
        name: 'Ustawienia',
        routerLink: ['panel/garage-settings']
      },
      {
        name: 'Nowy pracownik',
        routerLink: ['panel/add-employee']
      },
      {
        name: 'Lista pracowników',
        routerLink: ['panel/employee-list']
      }
    ]
  }
];

interface ExampleFlatNode {
  name: string;
  routerLink?: any;
  icon?: string;
  elements?: MenuModel[];
  action?: Function;
  access?: string;
  expandable: boolean;
  level: number;
}

@Component({
  selector: 'crc-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  private transformer = (node: MenuModel, level: number) => {
    return {
      expandable: !!node.elements && node.elements.length > 0,
      name: node.name,
      routerLink: node.routerLink ? node.routerLink : null,
      icon: node.icon ? node.icon : null,
      action: node.action ? node.action : null,
      access: node.access ? node.access : 'all',
      level: level,
    };
  }

  // tslint:disable-next-line:member-ordering
  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);

  // tslint:disable-next-line:member-ordering
  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.elements);

  // tslint:disable-next-line:member-ordering
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  constructor(private router: Router, public personService: PersonService) {
    this.dataSource.data = TREE_DATA;
  }

  ngOnInit() {
  }

  accessToMenu(access: string) {
    if (access === 'all') {
      return true;
    } else if (access === '1') {
      return this.personService.currentPerson.personType === PersonTypeEnum.Boss;
    }
  }

  hasChild = (_: number, node: ExampleFlatNode) => node.expandable;

  onClickMenu(element: MenuModel) {
    if (element.routerLink) {
      this.router.navigate(element.routerLink);
    }
  }
}
