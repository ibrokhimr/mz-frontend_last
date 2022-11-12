import { Component, OnInit } from '@angular/core';
import { AuthService, UsersService } from '@variant-bor-uz-frontend/users';
import { LocalstorageService } from 'libs/users/src/lib/services/localstorage.service';

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [`
      :host ::ng-deep button {
          margin-right: .25em;
      }
  `]
})
export class SidebarComponent implements OnInit {

  user:any;
  sellerId:string;


  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private localStorageService: LocalstorageService,
    // private authService: AuthService,
    ) { }

  ngOnInit(): void {
    this.sellerId = this.localStorageService.getUserIdFromToken();
    this.usersService.getUser(this.sellerId).subscribe((user)=>{
      this.user = user.name;
    });
  }

  logoutUser(){
    this.authService.logout();
  }

}
