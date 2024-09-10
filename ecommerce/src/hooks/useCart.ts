import { useCallback, useEffect } from "react"
import { actGetProductsByItems, cartItemChangeQuantity , removeItem, cartCleanUp} from "@store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { cleanUpOrder } from "@store/orders/ordersSlice"

const useCart = () => {
    const  dispatch = useAppDispatch()

    const {loading, error , items, productFullInfo} = useAppSelector((state)=> (state.carts))

    const PlaceOrderStatus = useAppSelector((state)=> state.orders.loading)
    
    useEffect(()=>{
       const promise = dispatch(actGetProductsByItems())
       return ()=> {
        promise.abort()
        dispatch(cartCleanUp())
        dispatch(cleanUpOrder())
       }

    }, [dispatch])

    const userAccess = useAppSelector((state)=> state.auths.accessToken)

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
    
  return {loading, error , product, changeQuantitHandler, removeHandler, userAccess, PlaceOrderStatus}
}

export default useCart