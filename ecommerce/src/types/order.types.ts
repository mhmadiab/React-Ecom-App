import { TProduct } from "./product"


export type TOrderItem ={
    id: number,
    subtotal: number,
    items:TProduct[],
}