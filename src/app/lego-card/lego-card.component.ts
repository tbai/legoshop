

import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from '../app.state';
import { addToCart } from '../app.actions';
import { Lego } from '../shared';

@Component({
  selector: 'lego-card',
  styles: [`
    md-card {
      margin: 0;
      margin-bottom:16px;
    }

    md-card-actions,
    md-card-content {
      text-align: center;
    }

    p.name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 12px;
    }
  `],
  template: `
    <md-card *ngIf="lego">
      <img md-card-image src="{{lego.thumbnail}}">
      <md-card-content>
        <p class="name" title="{{lego.name}}"><strong>{{lego.name}}</strong></p>
        <p class="price">{{lego.price | currency:'AUD':true}}</p>
      </md-card-content>

      <md-card-actions>
        <button (click)="addToCart($event)"
          md-fab title="Add to cart" color="accent">
          <md-icon>add_shopping_cart</md-icon>
        </button>
      </md-card-actions>
    </md-card>
  `
})
export class LegoCardComponent implements OnInit {

  @Input() lego:Lego;

  constructor(private store: NgRedux<AppState>) { }

  ngOnInit() { }

  addToCart(){
    this.store.dispatch(addToCart(this.lego.id));
  }
}
