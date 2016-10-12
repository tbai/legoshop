
import {Lego} from './shared';


export interface AppState {
  loading: boolean,
  budget: number,
  budgetUsed: number,
  // lego dictionary
  legos: { [legoId:string]:Lego },
  // list of items in the cart
  cartList: string[],
  // list of items available in the shopping list
  shopList: string[]
}

export const initialState:AppState = {
  loading:true,
  budget: 1,
  budgetUsed:0,
  legos: {},
  cartList: [],
  shopList: []
};
