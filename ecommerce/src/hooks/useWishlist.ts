
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetWishlist, productFullInfoCleanUp } from "@store/whishlist/wishlistSlice"

const useWishlist = () => {
    const dispatch = useAppDispatch()
    const {productFullInfo, error, loading} = useAppSelector((state)=> state.wishlists)
    const cartItems = useAppSelector((state)=> state.carts.items)

    const records = productFullInfo.map((el)=>{
        return {
          ...el,
          quantity: cartItems[el.id] || 0, 
          isLiked:  true
    
        }
      })
    

    useEffect(()=>{
       const promise = dispatch(actGetWishlist());
       
       return ()=> {
        promise.abort()
        dispatch(productFullInfoCleanUp())}
    }, [dispatch])

  return {records, error, loading}
}

export default useWishlist