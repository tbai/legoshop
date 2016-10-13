

import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from 'ng2-redux';
import { AppState } from '../app.state';
import { Lego } from '../shared';
import { Observable } from 'rxjs';

@Component({
  selector: 'lego-card-list',
  template: `
    <lego-card *ngFor="let lego of legoList" [lego]="lego"
      class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
    </lego-card>
  `
})
export class LegoCardListComponent implements OnInit {

  legoList: Lego[];

  @select('shopList') legoIds$: Observable<string[]>;

  constructor(private store: NgRedux<AppState>) {

  }

  ngOnInit() {
    this.legoIds$.subscribe(ids => {
      let state = this.store.getState();
      this.legoList = ids.map(legoId => state.legos[legoId]);
    });
  }
}
