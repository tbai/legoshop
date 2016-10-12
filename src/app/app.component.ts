import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { select, NgRedux } from 'ng2-redux';
import { AppState } from './app.state';
import { fetchState } from './app.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @select() loading$: Observable<boolean>;

  constructor (private store: NgRedux<AppState>) {
    // this.store.subscribe
  }

  ngOnInit(){
    this.store.dispatch(fetchState());
  }

}
