import { cartState } from "./cart/cart.reducer";
import { CounterState } from "./counter/counter.reducer";

export interface AppState{
    counter:CounterState,
    cart:cartState
 }