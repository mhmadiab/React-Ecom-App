import { Heading } from "@components/common"
import { CartItemList, CartSubTotalPrice} from "@components/ecommerce/index"
import Loading from "@components/feedback"
import useCart from "@hooks/useCart"
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler"

const Cart = () => {
    
   //customed hook:
   const {loading, error , product, userAccess, changeQuantitHandler, removeHandler, PlaceOrderStatus} = useCart()
    
  return (
    <>
       <Heading title="Your Cart"/>
       <Loading  status={loading} error={error} type="cart">
            <>
            {product.length ? <>
            <CartItemList product={product}  changeQuantitHandler={changeQuantitHandler} removeHandler={removeHandler}/>
            <CartSubTotalPrice product={product} userAccess={userAccess}/>
            </>
            : ( PlaceOrderStatus === "succeeded" ? <LottieHandler type="success" message="your order is placed successfully"/>:  
            <LottieHandler type="empty" message=" Your cart is empty"/>)}


            </>
       </Loading>
</>    
   
  )
}

export default Cart