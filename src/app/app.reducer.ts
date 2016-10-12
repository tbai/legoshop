import { NgRedux } from 'ng2-redux';
import { Action, Reducer } from 'redux';
import { AppState } from './app.state';
import * as Actions from './app.actions';
import { StateAction, CartAction, BudgetAction } from './app.actions';

import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';


@Injectable()
export class AppReducer {

  constructor(private store: NgRedux<AppState>, private http:Http) {

  }

  reduce(state:AppState, action:Action):AppState {
    switch (action.type){
      case Actions.FETCH_STATE:
        return this.reduceFetchState(state, action as StateAction);

      case Actions.FETCH_STATE_SUCCESS:
        return this.reduceFetchStateSuccess(state, action as StateAction);

      case Actions.SAVE_STATE:
        return this.reduceSaveState(state, action as StateAction);

      case Actions.ADD_TO_CART:
        return this.reduceAddToCart(state, action as CartAction);

      case Actions.REMOVE_FROM_CART:
        return this.reduceRemoveFromCart(state, action as CartAction);

      case Actions.SAVE_BUDGET:
        return this.reduceSaveBudget(state, action as BudgetAction);

      default:
        return state;
    }
  }

  reduceFetchState(state:AppState, action:StateAction):AppState {
    this.http.get('/state').map(
      response => response.json()
    ).subscribe( stateObj => {
      this.store.dispatch(Actions.fetchStateSuccess(stateObj));
    });

    return Object.assign({}, state, {
      loading: true
    });
  }

  reduceFetchStateSuccess(state:AppState, action:StateAction) : AppState {
    return Object.assign({}, action.state, {
      loading: false
    });
  }

  reduceSaveState(state:AppState, action:StateAction) : AppState {
    // I am not doing any error handling on the response of the http request for this exercise
    let postData = Object.assign({}, state, {legos:null});
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    this.http.post('/state', JSON.stringify(postData), options).subscribe( () => {
      this.store.dispatch(Actions.fetchStateSuccess(state));
    });
    return state;
  }

  moveLegoIdTo(legoId:string, listFrom:string[], listTo:string[]) {

    let i = listFrom.indexOf(legoId);
    if (i >= 0){
      listFrom.splice(i, 1); // remove the id

      if (listTo.indexOf(legoId) === -1){ // extra failsafe
        listTo.push(legoId);
      }
    }
  }

  reduceAddToCart(state:AppState, action:CartAction) : AppState {
    // clone both lists to prevent changing the state object
    let shopList = Array.from(state.shopList);
    let cartList = Array.from(state.cartList);

    let nextState = Object.assign({}, state, {
      shopList: shopList,
      cartList: cartList
    });

    // remove from the shopList and push it to the cartList
    this.moveLegoIdTo(action.legoId, nextState.shopList, nextState.cartList);

    // update budget used
    nextState.budgetUsed = this.calculateBudgetUsed(nextState);

    setTimeout(() => {
      this.store.dispatch(Actions.saveState({state:nextState}));
    }, 100);

    return nextState;
  }

  reduceRemoveFromCart(state:AppState, action:CartAction) : AppState {
    // clone both lists to prevent changing the state object
    let shopList = Array.from(state.shopList);
    let cartList = Array.from(state.cartList);

    let nextState = Object.assign({}, state, {
      shopList: shopList,
      cartList: cartList
    });

    // remove from the cartList and push it to the shopList
    this.moveLegoIdTo(action.legoId, nextState.cartList, nextState.shopList);

    // update budget used
    nextState.budgetUsed = this.calculateBudgetUsed(nextState);

    setTimeout(() => {
      this.store.dispatch(Actions.saveState({state:nextState}));
    }, 100);

    return nextState;
  }


  reduceSaveBudget(state:AppState, action:BudgetAction) : AppState {
    let newBudget = action.budget > 0 ? action.budget : 0;

    let nextState = Object.assign({}, state, {
      budget: newBudget
    });

    setTimeout(() => {
      this.store.dispatch(Actions.saveState({state:nextState}));
    }, 100);

    return nextState;
  }

  calculateBudgetUsed(state:AppState) {
    let budgetUsed = 0;

    state.cartList.forEach(legoId => {
      budgetUsed += state.legos[legoId].price;
    });

    return budgetUsed;
  }

  // reduceUpdateBudgetUsed(state:AppState, action:BudgetAction) : AppState {
  //   let budgetUsed = this.calculateBudgetUsed(state);

  //   return Object.assign({}, state, {
  //     budgetUsed: budgetUsed
  //   });
  // }

}
