import { createReducer, on } from "@ngrx/store";
import { IProducts } from "../../models/product.interface";
import { addToCart, decrementProduct, incrementProduct, removeItem } from "./cart.action";

export interface cartState{
    products:IProducts[],
    totalPrice?:number
}
export const initialCartState:cartState={
    products:[]
}

export const cartReducer = createReducer(
    initialCartState,
    on(addToCart,(state,{product})=>{
        const updatedProduct = [...state.products,product]
        return {
            ...state,
            updatedProduct
        }
    }),
    on(incrementProduct,(state,{productId})=>{
        const updatedProduct = state.products.map((product)=>product.id === productId ? product.quantity++ : product)
        return {
            ...state,
            updatedProduct
        }
    }),
    on(decrementProduct,(state,{productId})=>{
        const updatedProduct = state.products.map((product)=>product.id === productId ? product.quantity-- : product)
        return {
            ...state,
            updatedProduct
        }
    }),
    on(removeItem,(state,{productId})=>{
        const updatedProduct = state.products.filter((product)=>product.id !== productId ? product.quantity-- : product)
        return {
            ...state,
            updatedProduct
        }
    }),
)
