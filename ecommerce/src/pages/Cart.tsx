import { Heading } from "@components/common"
import { CartItemList, CartSubTotalPrice} from "@components/ecommerce/index"
import Loading from "@components/feedback"
import useCart from "@hooks/useCart"


const Cart = () => {
    
   //customed hook:
   const {loading, error , product, changeQuantitHandler, removeHandler} = useCart()
    
  return (
    <>
       <Heading title="Your Cart"/>
       <Loading  status={loading} error={error}>
            <>
            {product.length ? <>
            <CartItemList product={product}  changeQuantitHandler={changeQuantitHandler} removeHandler={removeHandler}/>
            <CartSubTotalPrice product={product}/>
            </>
            : " Your cart is empty"}


            </>
       </Loading>
</>    
   
  )
}

export default Cart