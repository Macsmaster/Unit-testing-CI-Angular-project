import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person.model';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit {
  public selectedPerson: Person | null = null;
  public people: Person[] = [
    new Person('Migue', 'Coy', 30, 60, 1.60),
    new Person('Angel', 'Coy', 30, 120, 1.60),
  ];

  constructor() { }

  ngOnInit(): void {
  }

  choose(person: Person){
    this.selectedPerson = person;
  }

}
