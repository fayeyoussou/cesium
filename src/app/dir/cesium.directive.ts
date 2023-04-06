import { Directive, ElementRef, OnInit } from '@angular/core';
import { Viewer } from 'cesium';
@Directive({
  selector: '[appCesium]'
})
export class CesiumDirective {

  constructor(private el: ElementRef) { }
  ngOnInit(): void {
    const viewer = new Viewer(this.el.nativeElement);
  }

}