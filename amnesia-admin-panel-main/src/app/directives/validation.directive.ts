import { Directive, ElementRef, HostBinding, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appValidation]'
})
export class ValidationDirective implements OnInit{

  @HostBinding('class')
  elementClass = 'is-valid';
  
  constructor(private elRef:ElementRef, private renderer:Renderer2) { }
  ngOnInit(){
    // this.renderer.setStyle(this.elRef.nativeElement,'color','green');
  }
}
