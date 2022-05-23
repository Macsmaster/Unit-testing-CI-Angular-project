import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';
import { PersonComponent } from '../person/person.component';

import { PeopleComponent } from './people.component';

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let fixture: ComponentFixture<PeopleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PeopleComponent, PersonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should have a list of app-person components', () => {
    // Arrange
    component.people = [
      new Person('Migue', 'Coy', 30, 60, 1.6),
      new Person('Angel', 'Coy', 30, 120, 1.6),
    ];
    // Act
    fixture.detectChanges();
    const debugElement = fixture.debugElement.queryAll(By.css('app-person'));
    // Assert
    expect(component.people.length).toEqual(debugElement.length);
  });

  describe('Test for click', () => {
    it('Should fill selectedPerson when choose function has been called', () => {
      component.selectedPerson = new Person('', '', 0, 0, 0);
      component.people = [
        new Person('Miguel', 'Coy', 30, 72, 1.76),
        new Person('Ernesto', 'Pérez', 30, 60, 1.8),
      ];
      component.choose(component.people[0]);
      fixture.detectChanges();
      expect(component.selectedPerson).toEqual(component.people[0]);
      component.choose(component.people[1]);
      fixture.detectChanges();
      expect(component.selectedPerson).toEqual(component.people[1]);
    });

    it('Should raise selected event when btn is clicked', () => {
      // Arrange
      const buttonDe = fixture.debugElement.query(
        By.css('app-person .btn-choose')
      );
      // Act
      buttonDe.triggerEventHandler('click', null);
      fixture.detectChanges();
      // Assert
      expect(component.selectedPerson).toEqual(component.people[0]);
    });

    it('Should h3 contain "Selected Person"', () => {
      const debugElement = fixture.debugElement.query(By.css('h3'));
      const h3element = debugElement.nativeElement;
      fixture.detectChanges();
      expect(h3element?.textContent).toContain('Selected Person');
    });

    it('Should render the name, lastname and age of selected person', () => {
      component.selectedPerson = new Person('Migue', 'Coy', 30, 60, 1.6);
      fixture.detectChanges();
      const debugNameItemElement = fixture.debugElement.query(
        By.css('.name-item')
      );
      const liNameElement = debugNameItemElement.nativeElement;
      const debugAgeElement = fixture.debugElement.query(By.css('.age-item'));
      const liAgeElement = debugAgeElement.nativeElement;
      expect(liNameElement?.textContent).toContain('Name: Migue Coy');
      expect(liAgeElement?.textContent).toContain('Age: 30');
    });

    it('Should show the length of array people in count person', () => {
      // Arrange
      component.people = [
        new Person('Migue', 'Coy', 30, 60, 1.6),
        new Person('Angel', 'Coy', 30, 120, 1.6),
        new Person('Angel', 'Coy', 30, 120, 1.6),
        new Person('Angel', 'Coy', 30, 120, 1.6),
        new Person('Angel', 'Coy', 30, 120, 1.6),
      ];
      fixture.detectChanges();
      // Act
      const debugCountItemElement = fixture.debugElement.query(
        By.css('.count-item')
      );
      const h3CountElement = debugCountItemElement.nativeElement;

      // Assert
      expect(h3CountElement?.textContent).toContain('Count: (5)');
    });
  });
});
