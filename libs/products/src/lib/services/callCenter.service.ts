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
  url = 'https://mzone.uz/api/v1/callCenter/';

  apiURLCallCenter = 'https://mzone.uz/api/v1/'+ 'callCenter';

  constructor(private http: HttpClient) {}

  changeMessage(message: string) {
    this.messageSource.next(message);
  }


  getCallCenters(): Observable<CallCenter[]> {
    return this.http.get<CallCenter[]>(
      `${this.apiURLCallCenter}/`
    );
  }

  getCalCenter(callCenterId: string): Observable<CallCenter> {
    return this.http.get<CallCenter>(
      `${this.apiURLCallCenter}/${callCenterId}`
    );
  }

  createCenterData(callCenter: CallCenter): Observable<CallCenter> {
    return this.http.post<CallCenter>(
      `${this.apiURLCallCenter}/`,
      callCenter
    );
  }

  deleteCenterData(centerId: string): Observable<any> {
    return this.http.delete<any>(
      `${this.apiURLCallCenter}/${centerId}`
    );
  }

  updateCenterData(callCenter: CallCenter): Observable<CallCenter> {
    return this.http.put<CallCenter>(
      `${this.apiURLCallCenter}/` + callCenter.id,
      callCenter
    );
  }

  updateZakupData(callCenter: CallCenter): Observable<CallCenter> {
    return this.http.put<CallCenter>(
      `${this.apiURLCallCenter}/zakup/` + callCenter.id,
      callCenter
    );
  }
}
