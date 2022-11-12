import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'gmap',
  templateUrl: './gmap.component.html',
  styles: [
  ]
})
export class GmapComponent implements OnInit {

  options: any;

    overlays: any[];

    ngOnInit() {
        this.options = {
            center: {lat: 41.305022, lng:69.265344},
            zoom: 12
        };
    } constructor() { }


}
