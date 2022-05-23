import { Directive, ElementRef, HostListener, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[highligth]'
})
export class HighligthDirective implements OnChanges{

  public defaultColor = 'gray';
  @Input('highligth') bgColor = '';

  constructor(private elementRef: ElementRef) {
    this.elementRef.nativeElement.style.backgroundColor = this.defaultColor;
   }


  ngOnChanges() {
    this.elementRef.nativeElement.style.backgroundColor = this.bgColor || this.defaultColor;
  }

}
