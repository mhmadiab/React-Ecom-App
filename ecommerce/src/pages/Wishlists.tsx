
import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetWishlist, productFullInfoCleanUp } from "@store/whishlist/wishlistSlice"
import Loading from "@components/feedback/index"
import { GridList, Heading } from "@components/common"
import { Products } from "@components/ecommerce"


const Wishlists = () => {

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
       dispatch(actGetWishlist());
       return ()=> {dispatch(productFullInfoCleanUp())}
    }, [dispatch])

  return (
    <>
      <Heading>Your Wishlist</Heading>
      <Loading error={error} status={loading}> 
        <>
        {records.length > 0 ?  <GridList 
                  records={records} 
                  renderItem={(record)=> <Products {...record} />}/> : "Your wishlist is empty" }
        </>
      </Loading>
    </>
  )
}

export default Wishlists