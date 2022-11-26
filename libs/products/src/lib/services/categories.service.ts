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
  apiURLScoring = 'https://mzone.uz/api/v1/'; //http://localhost:3000

  apiURLDillers = 'https://mzone.uz/api/v1/'+ 'dillers';
  apiURLFilials = 'https://mzone.uz/api/v1/'+ 'filial';
  apiURLCategories = 'https://mzone.uz/api/v1/'+ 'categories';
  constructor(private http: HttpClient) {}
  //Messages
  changeMessage(message: string) {
    this.messageSource.next(message);
  }
  //Dillers
  updateDiller(diller: Dillers): Observable<Dillers> {
    return this.http.put<Dillers>(
      `${this.apiURLDillers}/` + diller.id,
      diller
    );
  }

  getDiller(dillerId: string): Observable<Dillers> {
    return this.http.get<Dillers>(
      `${this.apiURLDillers}/${dillerId}`
    );
  }

  getDillers(): Observable<Dillers[]> {
    return this.http.get<Dillers[]>(
      `${this.apiURLDillers}/`
    );
  }

  createDiller(diller: Dillers): Observable<Dillers> {
    return this.http.post<Dillers>(
      `${this.apiURLDillers}/`,
      diller
    );
  }

  deleteDiller(dillerId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURLDillers}/${dillerId}`
    );
  }

  //Filial
  createFilial(filialData: Filial): Observable<Filial> {
    return this.http.post<Filial>(
      `${this.apiURLFilials}/`,
      filialData
    );
  }
  getFilial(): Observable<Filial[]> {
    return this.http.get<Filial[]>(
      `${this.apiURLFilials}/`
    );
  }

  deleteFilial(filialId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURLFilials}/${filialId}`
    );
  }

  //Scoring
  getScoring(): Observable<Scoring[]> {
    return this.http.get<Scoring[]>(this.apiURLScoring + `scoring`);
  }

  managerScoringDocs(userId: string): Observable<Scoring[]> {
    return this.http.get<Scoring[]>(this.apiURLScoring + `scoring/manager/` + userId);
  }

  getScore(scoreId: string): Observable<Scoring> {
    return this.http.get<Scoring>(this.apiURLScoring + `scoring/${scoreId}`);
  }

  putScoringMoney(data: FormData, scoringId: string): Observable<Scoring[]> {
    return this.http.put<Scoring[]>(
      this.apiURLScoring + `scoring/limit/` + scoringId,
      data
    );
  }

  // updateScoringLimit(limitMoney: any, scoringId:any): Observable<any> {
  //   return this.http.put<any>(
  //    this. url2+ `scoring/limit/` + scoringId,
  //     limitMoney
  //   );
  // }
  updateScoring(scoringData: FormData, scoringid: string): Observable<Scoring> {
    return this.http.put<Scoring>(
      this.apiURLScoring + `scoring/` + scoringid,
      scoringData
    );
  }

  getScoringById(scoringId: string): Observable<Scoring> {
    return this.http.get<Scoring>(this.apiURLScoring + `scoring/${scoringId}`);
  }

  downloadFile(document: string, Id: any) {
    return this.http.get(this.apiURLScoring + `scoring/download/${document}/${Id}`, {
      responseType: 'blob',
    });
  }

  editMenedjerStatus(data: any): Observable<any> {
    // let jsonData = JSON.stringify(data);
    console.log(data);
    return this.http.put<any>(this.apiURLScoring + 'scoring/manager/' + data.id, data);
  }

  moveToArchive(scoringId: string): Observable<any> {
    return this.http.put<any>(this.apiURLScoring + 'scoring/archive/' + scoringId,scoringId );
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
      `${this.apiURLCategories}/`
    );
  }

  getCategory(categoryId: string): Observable<Category> {
    return this.http.get<Category>(
      `${this.apiURLCategories}/${categoryId}`
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(
      `${this.apiURLCategories}/`,
      category
    );
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(
      `${this.apiURLCategories}/` + category.id,
      category
    );
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURLCategories}/${categoryId}`
    );
  }
}
