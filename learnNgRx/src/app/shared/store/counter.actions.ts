import { createAction, props } from "@ngrx/store";

export const increment = createAction('increment')
export const decrement = createAction('decrement')
export const reset = createAction('reset')
export const customincrement = createAction('customIncrement',props<{value:number,action:string}>())
export const changename = createAction('changeName',props<{name:string}>())