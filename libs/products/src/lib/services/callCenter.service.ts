import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { CallCenter } from '../models/callCenter';

@Injectable({
  providedIn: 'root',
})
export class CallCenterService {
  private messageSource = new BehaviorSubject<string>('default message');
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) {}

  changeMessage(message: string) {
    this.messageSource.next(message);
  }


  getCallCenters(): Observable<CallCenter[]> {
    return this.http.get<CallCenter[]>(
      `https://mobilezone-shop.herokuapp.com/api/v1/callCenter/`
    );
  }

  getCalCenter(callCenterId: string): Observable<CallCenter> {
    return this.http.get<CallCenter>(
      `https://mobilezone-shop.herokuapp.com/api/v1/callCenter/${callCenterId}`
    );
  }

  createCenterData(callCenter: CallCenter): Observable<CallCenter> {
    return this.http.post<CallCenter>(
      `https://mobilezone-shop.herokuapp.com/api/v1/callCenter/`,
      callCenter
    );
  }

  deleteCenterData(centerId: string): Observable<any> {
    return this.http.delete<any>(
      `https://mobilezone-shop.herokuapp.com/api/v1/callCenter/${centerId}`
    );
  }

  updateCenterData(callCenter: CallCenter): Observable<CallCenter> {
    return this.http.put<CallCenter>(
      `https://mobilezone-shop.herokuapp.com/api/v1/callCenter/` + callCenter.id,
      callCenter
    );
  }

  updateZakupData(callCenter: CallCenter): Observable<CallCenter> {
    return this.http.put<CallCenter>(
      `https://mobilezone-shop.herokuapp.com/api/v1/callCenter/zakup/` + callCenter.id,
      callCenter
    );
  }
}
