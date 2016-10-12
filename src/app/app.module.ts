import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

// Redux
// import reduxLogger from 'redux-logger';
import { NgReduxModule, NgRedux } from 'ng2-redux';
import { AppReducer } from './app.reducer';
import { AppState, initialState } from './app.state';

import { MaterialModule } from '@angular/material';
import { AppComponent } from './app.component';
import { LegoCardComponent, LegoCardListComponent } from './lego-card';
import { ShoppingCartComponent } from './shopping-cart';
import { BudgetComponent } from './budget';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LegoCardComponent,
    LegoCardListComponent,
    ShoppingCartComponent,
    BudgetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    MaterialModule.forRoot()
  ],
  providers: [AppReducer],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(store: NgRedux<AppState>, appReducer:AppReducer) {
    store.configureStore(appReducer.reduce.bind(appReducer), initialState, [ ]);
  }
}
