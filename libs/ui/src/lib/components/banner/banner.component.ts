import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ui-banner',
  templateUrl: './banner.component.html',
  styles: [],
})
export class BannerComponent implements OnInit {
  ads: any[] = [
    'assets/images/ad1.jpg',
    'assets/images/ad1.jpg',
    'assets/images/test2.png',
    'assets/images/test3.jpg',
    'assets/images/ad1.jpg',
  ];

  constructor() {}

  ngOnInit(): void {}
}
