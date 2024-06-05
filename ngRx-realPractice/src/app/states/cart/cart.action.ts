import { createAction, props } from "@ngrx/store";
import { IProducts } from "../../models/product.interface";

export const addToCart = createAction('[Cart Component] AddToCart',props<{product:IProducts}>());
export const incrementProduct = createAction('[Cart Component] IncrementProduct',props<{productId:number}>())
export const decrementProduct = createAction('[Cart Component] DecrementProduct',props<{productId:number}>())
export const removeItem = createAction('[Cart Component] RemoveItem',props<{productId:number}>())