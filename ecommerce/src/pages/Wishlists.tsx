import useWishlist from "@hooks/useWishlist"
import Loading from "@components/feedback/index"
import { GridList, Heading } from "@components/common"
import { Products } from "@components/ecommerce"
import LottieHandler from "@components/feedback/LottieHandler/LottieHandler"

const Wishlists = () => {

  //customed hook:
  const {records, error, loading} = useWishlist()

  return (
    <>
      <Heading title="Your wishlist"/>
      <Loading error={error} status={loading} type="product"> 
        <>
        {records.length > 0 ?  <GridList 
                  message="Your wishlist is empty" 
                  records={records} 
                  renderItem={(record)=> <Products {...record} />}/> :<LottieHandler type="empty" message="Your wishlist is empty" /> }
        </>
      </Loading>
    </>
  )
}

export default Wishlists