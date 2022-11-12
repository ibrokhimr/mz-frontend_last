import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { Dillers } from '../models/dillers';
import { Filial } from '../models/filial';
import { BehaviorSubject } from 'rxjs';
import { Scoring } from '../models/scoring';
@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private messageSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageSource.asObservable();
  url = 'https://mobilezone-shop.herokuapp.com/api/v1/';
  url1 = 'http://localhost:3000/api/v1/'; //http://localhost:3000
  constructor(private http: HttpClient) {}
  //Messages
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  //Dillers
  updateDiller(diller: Dillers): Observable<Dillers> {
    return this.http.put<Dillers>(
      `https://mobilezone-shop.herokuapp.com/api/v1/dillers/` + diller.id,
      diller
    );
  }

  getDiller(dillerId: string): Observable<Dillers> {
    return this.http.get<Dillers>(
      `https://mobilezone-shop.herokuapp.com/api/v1/dillers/${dillerId}`
    );
  }

  getDillers(): Observable<Dillers[]> {
    return this.http.get<Dillers[]>(
      `https://mobilezone-shop.herokuapp.com/api/v1/dillers/`
    );
  }

  createDiller(diller: Dillers): Observable<Dillers> {
    return this.http.post<Dillers>(
      `https://mobilezone-shop.herokuapp.com/api/v1/dillers/`,
      diller
    );
  }

  deleteDiller(dillerId: string): Observable<any> {
    return this.http.delete<any>(
      `https://mobilezone-shop.herokuapp.com/api/v1/dillers/${dillerId}`
    );
  }

  //Filial
  createFilial(filialData: Filial): Observable<Filial> {
    return this.http.post<Filial>(
      `https://mobilezone-shop.herokuapp.com/api/v1/filial/`,
      filialData
    );
  }
  getFilial(): Observable<Filial[]> {
    return this.http.get<Filial[]>(
      `https://mobilezone-shop.herokuapp.com/api/v1/filial/`
    );
  }

  deleteFilial(filialId: string): Observable<any> {
    return this.http.delete<any>(
      `https://mobilezone-shop.herokuapp.com/api/v1/filial/${filialId}`
    );
  }

  //Scoring
  getScoring(): Observable<Scoring[]> {
    return this.http.get<Scoring[]>(this.url1 + `scoring`);
  }

  managerScoringDocs(userId: string): Observable<Scoring[]> {
    return this.http.get<Scoring[]>(this.url1 + `scoring/manager/` + userId);
  }

  getScore(scoreId: string): Observable<Scoring> {
    return this.http.get<Scoring>(this.url1 + `scoring/${scoreId}`);
  }

  putScoringMoney(data: FormData, scoringId: string): Observable<Scoring[]> {
    return this.http.put<Scoring[]>(
      this.url1 + `scoring/limit/` + scoringId,
      data
    );
  }

  // updateScoringLimit(limitMoney: any, scoringId:any): Observable<any> {
  //   return this.http.put<any>(
  //    this. url1+ `scoring/limit/` + scoringId,
  //     limitMoney
  //   );
  // }
  updateScoring(scoringData: FormData, scoringid: string): Observable<Scoring> {
    return this.http.put<Scoring>(
      this.url1 + `scoring/` + scoringid,
      scoringData
    );
  }

  getScoringById(scoringId: string): Observable<Scoring> {
    return this.http.get<Scoring>(this.url1 + `scoring/${scoringId}`);
  }

  downloadFile(document: string, Id: any) {
    return this.http.get(this.url1 + `scoring/download/${document}/${Id}`, {
      responseType: 'blob',
    });
  }

  editMenedjerStatus(data: any): Observable<any> {
    // let jsonData = JSON.stringify(data);
    console.log(data);
    return this.http.put<any>(this.url1 + 'scoring/manager/' + data.id, data);
  }

  moveToArchive(scoringId: string): Observable<any> {
    return this.http.put<any>(this.url1 + 'scoring/archive/' + scoringId,scoringId );
  }

  // sendCode(data: any): Observable<any> {
  //   return this.http.put(
  //    this. url1+ 'scoring/code/' + data.id,
  //     data
  //   );
  // }

  //Categories
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(
      `https://mobilezone-shop.herokuapp.com/api/v1/categories/`
    );
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(
      `https://mobilezone-shop.herokuapp.com/api/v1/categories/${categoryId}`
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `https://mobilezone-shop.herokuapp.com/api/v1/categories/`,
      category
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `https://mobilezone-shop.herokuapp.com/api/v1/categories/` + category.id,
      category
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(
      `https://mobilezone-shop.herokuapp.com/api/v1/categories/${categoryId}`
    );
  }
}
