import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appPasswordError]'
})
export class PasswordErrorDirective {

  // @HostBinding('class')
  // elementClass = 'is-valid';

  constructor() { }

}
