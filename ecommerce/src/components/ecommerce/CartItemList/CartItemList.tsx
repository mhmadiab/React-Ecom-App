import CartItem from "../CartItem/CartItem"
import { TProduct } from "@customeypes/product"


type CartItemListProps = {
    product: TProduct[], 
    changeQuantitHandler:  (quantity: number, id: number) => void, 
    removeHandler : (id: number)=> void
}

const CartItemList = ({product, changeQuantitHandler, removeHandler}:CartItemListProps) => {

    const renderList = product.map(el=>{
        return <CartItem key={el.id} {...el}  changeQuantitHandler={changeQuantitHandler} removeHandler={removeHandler} />

    })

    return(
        <div>{renderList}</div>
    )
  
}

export default CartItemList