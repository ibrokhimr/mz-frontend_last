import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { map } from 'rxjs/operators';
import { Shop, Procent } from '../models/shops';
//import * as countriesLib from 'i18n-iso-countries';
// import { UsersFacade } from '../state/users.facade';

declare const require;

@Injectable({
  providedIn: 'root'
})
export class ShopsService {
  apiURLShops = 'http://localhost:3000/api/v1/' + 'shops';
  apiURLShops1 = 'https://mobilezone-shop.herokuapp.com/api/v1/'+ 'shops';
  // apiURLProcent = 'http://localhost:3000/api/v1/shops/' + 'protsent';


  constructor(
    private http: HttpClient,
    // private usersFacade:UsersFacade
    ) {
    // countriesLib.registerLocale(require('i18n-iso-countries/langs/en.json'));
  }

  createShop(shop: Shop): Observable<Shop> {
    return this.http.post<Shop>(this.apiURLShops, shop);
  }

  getShops(): Observable<Shop[]> {
    return this.http.get<Shop[]>(this.apiURLShops);
  }

  getShop(shopId: string): Observable<Shop> {
    return this.http.get<Shop>(`${this.apiURLShops}/${shopId}`);
  }

  updateShop(shop: Shop): Observable<Shop> {
    return this.http.put<Shop>(`${this.apiURLShops}/${shop.id}`, shop);
  }

  updateProcent(procent: Procent): Observable<Procent> {
    return this.http.put<Procent>(`${this.apiURLShops}/foiz/togrlimiz`, procent);
  }

  getProcent(): Observable<Procent[]> {
    return this.http.get<Procent[]>(`${this.apiURLShops}/foiz/olamiz`);
  }

  // getUsers(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiURLUsers);
  // }

  // getUser(userId: string): Observable<User> {
  //   return this.http.get<User>(`${this.apiURLUsers}/${userId}`);
  // }

  // createUser(user: User): Observable<User> {
  //   return this.http.post<User>(this.apiURLUsers, user);
  // }

  // updateUser(user: User): Observable<User> {
  //   return this.http.put<User>(`${this.apiURLUsers}/${user.id}`, user);
  // }

  // deleteUser(userId: string): Observable<any> {
  //   return this.http.delete<any>(`${this.apiURLUsers}/${userId}`);
  // }

  // getCountries(): { id: string; name: string }[] {
  //   return Object.entries(countriesLib.getNames('en', { select: 'official' })).map((entry) => {
  //     return {
  //       id: entry[0],
  //       name: entry[1]
  //     };
  //   });
  // }

  // getCountry(countryKey: string): string {
  //   return countriesLib.getName(countryKey, 'en');
  // }


  // initAppSession(){
  //   this.usersFacade.buildUserSession()
  // }

  // observeCurrentUser(){
  //   return this.usersFacade.currentUser$
  // }

  // isCurrentUserAuth(){
  //   return this.usersFacade.isAuthenticated$
  // }

  // getUsersCount(): Observable<number> {
  //   return this.http
  //     .get<number>(`${this.apiURLUsers}/get/count`)
  //     .pipe(map((objectValue: any) => objectValue.userCount));
  // }

}
