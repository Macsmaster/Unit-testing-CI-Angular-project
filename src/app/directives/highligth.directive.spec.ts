import { HighligthDirective } from './highligth.directive';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

@Component({
  template: `
      <h5 class="title" highligth>default</h5>
      <h5 highligth="yellow">yellow</h5>
      <p highligth="blue">parrafo</p>
      <p>otro parrafo</p>
      <input [(ngModel)]="color" type="text" [highligth]="color">
  `
})

class HostComponent {
  public color = 'pink';
}

describe('HighligthDirective', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ HostComponent, HighligthDirective ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('Should have one not highligth element', () => {
    const elementsWithout = fixture.debugElement.queryAll(By.css('*:not([highligth])'));
    expect(elementsWithout.length).toEqual(2);
  })

  it('Should elements be match with bgColor', () => {
    const elements = fixture.debugElement.queryAll(By.directive(HighligthDirective));
    expect(elements[0].nativeElement.style.backgroundColor).toEqual('gray');
    expect(elements[1].nativeElement.style.backgroundColor).toEqual('yellow');
    expect(elements[2].nativeElement.style.backgroundColor).toEqual('blue');
    expect(elements.length).toEqual(4);
  })

  it('Should the h5.title be defaultColor', () => {
    const element = fixture.debugElement.query(By.css('.title'));
    const dir = element.injector.get(HighligthDirective)
    expect(element.nativeElement.style.backgroundColor).toEqual(dir.defaultColor);
  })

  it('Should bind <input> and change the bg', () => {
    const inputDe = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    expect(inputEl.style.backgroundColor).toEqual('pink');

    inputEl.value = 'red';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(inputEl.style.backgroundColor).toEqual('red');
    expect(component.color).toEqual('red');
  })
});
