import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValidationCorrect]'
})
export class ValidationCorrectDirective {

  @HostBinding('class')
  elementClass = 'is-valid';

  constructor() { }

}
