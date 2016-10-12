

import { Component, OnInit, ViewChild } from '@angular/core';
import { MdSlider } from '@angular/material';
import { saveBudget } from '../app.actions';
import { AppState } from '../app.state';
import { NgRedux } from 'ng2-redux';

@Component({
  selector: 'budget-selector',

  styles: [`
    :host {
      text-align:center;
      display: block;
      margin-bottom: 2em;
    }

    md-slider {
      width: 100%;
    }

    p .warning {
      color: red;
    }
  `],

  template: `
    <p class="icon-text"><md-icon>monetization_on</md-icon>Budget</p>
    <md-slider min="1" max="1000"
               (value)="currentBudget"
               (slide)="updateBudget()"
               (slideend)="saveBudget()"
               ></md-slider>
    <p>
      <strong>Your budget is {{currentBudget | currency:'AUD':true}}.</strong>
      <span *ngIf="budgetLeft > 0">You have {{budgetLeft | currency:'AUD':true}} left to spend...</span>
      <span class="warning" *ngIf="budgetLeft < 0">You don't have enough budget!!</span>
      <span *ngIf="budgetLeft === 0">Nice, you spent all your budget!</span>
    </p>
  `
})
export class BudgetComponent implements OnInit {

  currentBudget: number = 1;
  budgetUsed: number = 0;

  @ViewChild(MdSlider) slider: MdSlider

  constructor(private store: NgRedux<AppState>) {

  }

  ngOnInit() {

    let setData = () => {
      let state = this.store.getState();
      this.currentBudget = state.budget;
      this.budgetUsed = state.budgetUsed;
      this.slider.value = this.currentBudget;
    };
    setData();

    this.store.subscribe(setData);
  }

  saveBudget(){
    this.store.dispatch(saveBudget(this.slider.value));
  }

  get budgetLeft(){
    return this.currentBudget - this.budgetUsed;
  }

  updateBudget(){
    this.currentBudget = this.slider.value;
  }

}
