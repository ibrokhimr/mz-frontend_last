import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '@variant-bor-uz-frontend/products';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Scoring } from 'libs/products/src/lib/models/scoring';
import { LocalstorageService } from '../../../../../../libs/users/src/lib/services/localstorage.service';
import { Injectable } from '@angular/core';
import { UsersService } from '../../../../../../libs/users/src/lib/services/users.service';
import { takeUntil } from 'rxjs/operators';
import {ToastModule} from 'primeng/toast';
import {MessageService} from 'primeng/api';

import { Observable, Subscription, interval, Subject } from 'rxjs';
interface Status {
  status: string;
}
@Component({
  selector: 'variant-bor-uz-frontend-my-scoring',
  templateUrl: './my-scoring.component.html',
  styles: [
  ]
})
export class MyScoringComponent implements OnInit, OnDestroy {

  scorings: Scoring[] = [];
  statuses: Status[]=[{ status: 'Odobren' }, { status: 'Atmen' }];

  endSubs$: Subject<any> = new Subject();
  // userName: string;
  userId: string;
  // scoringss: Scoring[]=[]

  private updateSubscription: Subscription;
  constructor(
    private scoringService: CategoriesService,
    private router: Router,
    private localStorageService: LocalstorageService,
    private usersService: UsersService,
    private messageService: MessageService

  ) {
    // this.statuses = [{ status: 'Odobren' }, { status: 'Atmen' }];
  }

  ngOnInit(): void {
    this.userId = this.localStorageService.getUserIdFromToken();
    this._getuserScoringDocs();

    this.updateSubscription = interval(8000).pipe(takeUntil(this.endSubs$)).subscribe((val) => {
      this._getuserScoringDocs();
    });
  }


  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  private _getuserScoringDocs() {
    // let userId = this.localStorageService.getUserIdFromToken();
    this.scoringService
    .managerScoringDocs(this.userId)
    .pipe(takeUntil(this.endSubs$))
    .subscribe((score) => {
      console.log(score);
      this.scorings = score;
      this.scorings = this.scorings.reverse();
    })
  }

  updateScoring(scoringId: string) {
    this.router.navigateByUrl(`scoring/${scoringId}`);
  }


}
