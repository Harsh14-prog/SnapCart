import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import mongoose from "mongoose";

interface IGrocery {
    _id: string,
    name: string,
    quantity : number
    category: string,
    price: string,
    unit: string,
    image: string,
    createdAt?: Date,
    updatedAt?: Date
}

interface ICartSlice {
    cartData : IGrocery[] ,
    subTotal : number,
    deliveryFee : number ,
    finalTotal : number
}

let initialState : ICartSlice = {
    cartData : [],
    subTotal : 0,
    deliveryFee : 40 ,
    finalTotal : 40
}
const cartSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
      addToCart :(state , actions : PayloadAction<IGrocery>) => {
        state.cartData.push(actions.payload)
        cartSlice.caseReducers.calculateTotal(state)
      },

      increaseQuantity : (state , actions : PayloadAction<string>) => {
        const item = state.cartData.find(i => i._id == actions.payload)
        if(item){
            item.quantity = item.quantity + 1
        }
        cartSlice.caseReducers.calculateTotal(state)
      },

       decreaseQuantity : (state , actions : PayloadAction<string>) => {
        const item = state.cartData.find(i => i._id == actions.payload)
        if(item?.quantity && item.quantity > 1){
            item.quantity = item.quantity - 1
        }
        else{
            state.cartData = state.cartData.filter(i => i._id != actions.payload)
        }
         cartSlice.caseReducers.calculateTotal(state)
       },

       removeFromCart : (state , actions : PayloadAction<string>) => {
         state.cartData = state.cartData.filter(i => i._id != actions.payload)
         cartSlice.caseReducers.calculateTotal(state)
       },

       calculateTotal : (state) => {
         state.subTotal = state.cartData.reduce((sum , item) => sum + Number(item.price) * item.quantity ,0)
         state.deliveryFee = state.subTotal > 100 ? 0 : 40
         state.finalTotal = state.subTotal + state.deliveryFee
       }
    }
})

export const {addToCart , increaseQuantity , decreaseQuantity , removeFromCart} = cartSlice.actions
export default cartSlice.reducer