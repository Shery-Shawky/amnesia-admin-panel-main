import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValidationError]'
})
export class ValidationErrorDirective {

  @HostBinding('class')
  elementClass = 'is-invalid';

  constructor() { }

}
