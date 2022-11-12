import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'front-end-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  constructor() { }

  ngOnInit(): void {
  }
  header_fixed = false;
  header :HTMLElement;
  headerBot: HTMLElement;
  scrollDistance: number;


  @HostListener('window:scroll',['$event'])

  onScroll() {

  this.header = document.getElementById('header');
  this.headerBot = document.getElementById('header-bot');

    if (window.scrollY > this.header.clientHeight) {

      this.header_fixed = true
    } else {
      this.header_fixed = false;
    }

  }


}
