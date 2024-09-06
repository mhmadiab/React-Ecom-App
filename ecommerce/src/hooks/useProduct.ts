import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { actGetProductsByCatPrefix , cleanUp} from "@store/products/productsSlice"
import { useParams } from "react-router-dom"

const useProduct = () => {
    const dispatch = useAppDispatch()
    const param = useParams()
   
    const {records, error, loading} = useAppSelector((state)=> state.products)
    
    const cartItems = useAppSelector((state)=> state.carts.items)
    const wishlistItems = useAppSelector((state)=> state.wishlists.itemId)
    const userAccessToke =  useAppSelector((state)=> state.auths.accessToken)

  
    const ProductsFullInfo = records.map((el)=>{
      return {
        ...el,
        quantity: cartItems[el.id] || 0, 
        isLiked:  wishlistItems.includes(el.id),
        isAuthenticated: userAccessToke ? true : false
  
      }
    })
  
    useEffect(()=>{
      let prefix: string
      if(param.prefix && typeof param.prefix === "string" ){
        prefix = param.prefix
       const promise =  dispatch(actGetProductsByCatPrefix(prefix))
        return ()=>{
          promise.abort()
          dispatch(cleanUp())
        }
      }
    },[dispatch, param])
  
  return {
    loading, 
    error, 
    ProductsFullInfo,
    param,
  }
}

export default useProduct