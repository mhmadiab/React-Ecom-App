import { Heading } from "@components/common"
import { CartItemList, CartSubTotalPrice} from "@components/ecommerce/index"
import { useCallback, useEffect } from "react"
import { actGetProductsByItems, cartItemChangeQuantity , removeItem} from "@store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import Loading from "@components/feedback"


const Cart = () => {
    
    const  dispatch = useAppDispatch()

    const {loading, error , items, productFullInfo} = useAppSelector((state)=> (state.carts))
    
    useEffect(()=>{
       dispatch(actGetProductsByItems())
    }, [dispatch])

    const product = productFullInfo.map((el)=> ({...el, 
                                              quantity: items[el.id]
                                            }))

    const changeQuantitHandler = useCallback(
        (quantity: number, id: number)=>{
        dispatch(cartItemChangeQuantity({quantity, id}))
    },[dispatch] )

    const removeHandler = useCallback((id: number)=>{
        dispatch(removeItem(id))
    },[dispatch] )
    
    
  return (
    <>
       <Heading>Your Cart</Heading>
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