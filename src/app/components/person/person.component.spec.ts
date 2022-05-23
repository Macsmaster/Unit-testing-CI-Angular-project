import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Person } from 'src/app/models/person.model';

import { PersonComponent } from './person.component';

describe('PersonComponent', () => {
  let component: PersonComponent;
  let fixture: ComponentFixture<PersonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the name be "Migue"', () => {
    component.person = new Person('Migue', 'Coy', 31, 74, 176)
    expect(component.person.name).toEqual('Migue');
  });

  describe('Test for elements', () => {
    it('should have <p> with text "Mi altura es {person.height}"', () => {
      //Arrange
      component.person = new Person('Migue', 'Coy', 31, 74, 166);
      const expectMsg = `Mi altura es ${component.person.height}`
      const debugElement: DebugElement = fixture.debugElement;
      const pDebug = debugElement.query(By.css('p'));
      const parrafElement: HTMLElement = pDebug.nativeElement;
      // Act
      fixture.detectChanges();
      // Assert
      expect(parrafElement?.textContent).toEqual(expectMsg);
    })

    it('should have <p> with text "Hola {person.name}"', () => {
      component.person = new Person('Migue', 'Coy', 31, 74, 166);
      const debugElement: DebugElement = fixture.debugElement;
      const pDebug = debugElement.query(By.css('h3'));
      const element: HTMLElement = pDebug.nativeElement;
      fixture.detectChanges();
      expect(element?.textContent).toContain('Hola Migue');
    })
  })

  describe('Test for click btn', () => {
    it('Should return IMC when calcIMC() is called', () => {
      // Arrange
      component.person = new Person('Migue', 'Coy', 32, 150, 1.76);
      const expectedMsg = 'IMC: Overweight level 3';

      const debugElement: DebugElement = fixture.debugElement;
      const btn = debugElement.query(By.css('button.btn-imc')).nativeElement;
      // Act
      component.calcIMC();
      fixture.detectChanges();
      // Assert
      expect(btn?.textContent).toBe(expectedMsg)
    });

    it('Should return IMC when btn is clicked', () => {
      // Arrange
      component.person = new Person('Migue', 'Coy', 32, 150, 1.76);
      const expectedMsg = 'IMC: Overweight level 3';

      const debugElement: DebugElement = fixture.debugElement;
      const btnDebug = debugElement.query(By.css('button.btn-imc'));
      const btnElement = btnDebug.nativeElement;
      // Act
      btnDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      // Assert
      expect(btnElement?.textContent).toBe(expectedMsg)
    });

    it('Should raise selected event when btn is clicked', () => {
      // Arrange
      const expectPerson = new Person('Migue', 'Coy', 32, 150, 1.76);
      component.person = expectPerson;
      const debugElement: DebugElement = fixture.debugElement;
      const btnDebug = debugElement.query(By.css('button.btn-choose'));
      let getPerson: Person | undefined;
      component.onSelected.subscribe((data) => {
        getPerson = data;
      })
      // Act
      btnDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      // Assert
      expect(getPerson).toEqual(expectPerson)
    });
  })
});

  @Component({
    template: `<app-person [person]="person" (onSelected)="onSelected($event)"></app-person>`
  })

  class HostComponent {
    person = new Person('Migue', 'Coy', 31, 74, 176);
    selectedPerson: Person | undefined;

    onSelected(person: Person){
      this.selectedPerson = person;
    }
  }

  describe('Test personComponent from HostComponent', () => {
    let component: HostComponent;
    let fixture: ComponentFixture<HostComponent>;

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [ HostComponent, PersonComponent ]
      })
      .compileComponents();
    });

    beforeEach(() => {
      fixture = TestBed.createComponent(HostComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('Should display person name', () => {
      // Arrange
      const expectedName = component.person.name;
      const debugElement: DebugElement = fixture.debugElement;
      const h3Debug = debugElement.query(By.css('app-person h3'));
      const h3El = h3Debug.nativeElement;
      // Act
      fixture.detectChanges();
      // Assert
      expect(h3El?.textContent).toContain(expectedName);
    })

    it('Should raise selected event when btn is clicked', () => {
      // Arrange
      const debugElement: DebugElement = fixture.debugElement;
      const btnDebug = debugElement.query(By.css('app-person .btn-choose'));
      // Act
      btnDebug.triggerEventHandler('click', null);
      fixture.detectChanges();
      // Assert
      expect(component.selectedPerson).toEqual(component.person)
    });
  })

