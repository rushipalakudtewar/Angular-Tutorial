import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { cartState } from "./cart.reducer";

export const selectCartState = (state:AppState)=>state.cart;

export const selectCartProducts = createSelector(
    selectCartState,
    (state:cartState)=>state.products
)
export const selectTotal = createSelector(
    selectCartState,
    (state:cartState)=>state.totalPrice
)