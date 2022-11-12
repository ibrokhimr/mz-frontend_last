import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '@variant-bor-uz-frontend/products';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { Scoring } from 'libs/products/src/lib/models/scoring';
import { LocalstorageService } from '../../../../../../libs/users/src/lib/services/localstorage.service';
import { Injectable } from '@angular/core';
import { UsersService } from '../../../../../../libs/users/src/lib/services/users.service';
import { takeUntil } from 'rxjs/operators';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { pipe, timer } from 'rxjs';


import { Observable, Subscription, interval, Subject } from 'rxjs';
interface Status {
  status: string;
}

@Component({
  selector: 'admin-scoring',
  templateUrl: './scoring.component.html',
  styles: [],
})
export class ScoringComponent implements OnInit, OnDestroy {
  scorings: Scoring[] = [];
  statuses: Status[];
  endSubs$: Subject<any> = new Subject();
  userName: string;
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
    this.statuses = [{ status: 'Odobren' }, { status: 'Atmen' }];
  }

  ngOnInit(): void {
    this.userId = this.localStorageService.getUserIdFromToken();
    this.userName = this.getUserName(this.userId)
    this._getScoring();

    this.updateSubscription = interval(4000).subscribe((val) => {
      this._getScoring();
    });
  }

  ngOnDestroy(): void {
    this.endSubs$.next(null);
    this.endSubs$.complete();
  }

  private _getScoring() {
    this.scoringService
      .getScoring()
      .pipe(takeUntil(this.endSubs$))
      .subscribe((score) => {
        this.scorings = [];
        let newScorings = score;
        newScorings.map(scoring => {
          if (scoring.statusAdmin === 'Новый') {
            this.scorings.push(scoring);
          }
        })
        this.scorings = this.scorings.reverse();
        // console.log(this.scorings)
      });

  }

  updateScoring(scoringId: string) {
    this.router.navigateByUrl(`scoring/${scoringId}`);
  }

  managerChoose(scoringId: any) {
    const data: any = {
      id: scoringId,
      menedjerName: this.userName,
      menedjerId: this.userId,
      statusAdmin: 'В процессе',
      acceptAt: new Date().toLocaleString('uz-UZ', { timeZone: 'Asia/Tashkent' })
    };
    this._editMenedjerStatus(data);
    this._getScoring();
    // window.location.reload();

  }

  getUserName(userId: string) {
    this.usersService
      .getUser(userId)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(user => {
        this.userName = user.name;
      })

    return this.userName;
  }

  private _editMenedjerStatus(data: any) {
    this.scoringService
      .editMenedjerStatus(data)
      .pipe(takeUntil(this.endSubs$))
      .subscribe(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Info Message',
          detail: `${this.userName} принял этот документ`
        });

      });
  }
}
