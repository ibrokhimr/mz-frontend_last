import { Component, HostListener, OnInit } from '@angular/core';
import { UsersService } from '@variant-bor-uz-frontend/users';

@Component({
  selector: 'variant-bor-uz-frontend-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  title = 'variantbor-frontend';
  constructor(
    private usersService: UsersService
  ) { }
  ngOnInit(): void {
    this.usersService.initAppSession()
  }

  // header_fixed = false;
  // header = document.getElementById('header');
  // scrollDistance = window.scrollY;

  // @HostListener('window.scroll',['$event'])

  // onScroll() {

  //   if (this.scrollDistance > this.header.clientHeight) {
  //     // headerBot.classList.add('fixed-header')
  //     this.header_fixed = true
  //   } else {
  //     // headerBot.classList.remove('fixed-header')
  //     this.header_fixed = false;
  //   }

  // }
}
