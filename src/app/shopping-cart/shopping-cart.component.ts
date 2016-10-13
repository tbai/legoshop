import { Component, OnInit } from '@angular/core';

import { select, NgRedux } from 'ng2-redux';
import { AppState } from '../app.state';
import { removeFromCart } from '../app.actions';
import { Lego } from '../shared';
import { Observable } from 'rxjs';


@Component({
  selector: 'shopping-cart',
  styles:[`
    md-list-item md-icon {
      float:right;
    }
    md-list-item p {
      color: #333;
      font-size:12px;
    }

    md-list-item h4 {
      font-size: 12px;
    }
  `],
  template: `
    <p class="icon-text">
      <md-icon>shopping_cart</md-icon>
      Shopping Cart ({{legoList.length}})
    </p>

    <md-list>

      <md-list-item *ngFor="let lego of legoList">
        <img md-list-avatar src="{{lego.thumbnail}}">
        <h4 md-line title="{{lego.name}}">{{lego.name}}</h4>
        <p md-line> {{lego.price | currency:'AUD':true}} </p>

        <button md-icon-button title="Remove from cart" (click)="remove(lego)">
          <md-icon color="warn">delete</md-icon>
        </button>
      </md-list-item>

    </md-list>
  `
})
export class ShoppingCartComponent implements OnInit {

  legoList: Lego[];

  @select('cartList') legoIds$: Observable<string[]>;

  constructor(private store: NgRedux<AppState>) {

    this.legoIds$.subscribe(ids => {
      let state = this.store.getState();
      this.legoList = ids.map(legoId => state.legos[legoId]);
    });

  }

  ngOnInit() { }

  remove(lego){
    this.store.dispatch(removeFromCart(lego.id));
  }
}
