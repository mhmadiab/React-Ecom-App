export type TProduct = {
    id:number,
    title:string,
    price:number,
    cat_prefix:string | undefined,
    img:string,
    quantity?:number | undefined, 
    max:  number,
    isLiked?: boolean

}