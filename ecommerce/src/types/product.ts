export type TProduct = {
    id:number,
    title:string,
    price:string,
    cat_prefix:string | undefined,
    img:string,
    quantity?:number | undefined, 
    max:  number,

}