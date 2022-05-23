import { ReversePipe } from './reverse.pipe';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

describe('ReversePipe', () => {
  it('create an instance', () => {
    const pipe = new ReversePipe();
    expect(pipe).toBeTruthy();
  });


  it('Should transform "roma" to "amor', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform("Roma");
    expect(rta).toEqual('amoR');
  })


  it('Should transform "123" to "321', () => {
    const pipe = new ReversePipe();
    const rta = pipe.transform("123");
    expect(rta).toEqual('321');
  })
});

@Component({
  template: `
      <h5>{{ 'amor' | reverse }}</h5>
      <input [(ngModel)]="text">
      <p>{{ text | reverse }}</p>
  `
})

class HostComponent {
  public text = '';
}


describe('Test pipe from host component', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule],
      declarations: [ HostComponent, ReversePipe ],
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

  it('Should the h5 be "roma"', () => {
    const h5Deb = fixture.debugElement.query(By.css('h5'));
    const h5El = h5Deb.nativeElement;
    expect(h5El.textContent).toEqual('roma');
  })

  it('Should apply reverse pipe when typing in the <input>"', () => {
    const inputDeb = fixture.debugElement.query(By.css('input'));
    const inputEl: HTMLInputElement = inputDeb.nativeElement;
    const pDeb = fixture.debugElement.query(By.css('p'));
    const pElm = pDeb.nativeElement;
    expect(pElm.textContent).toEqual('');

    inputEl.value = 'amores';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(pElm.textContent).toEqual('seroma');
  })
})
