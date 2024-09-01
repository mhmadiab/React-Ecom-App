import useWishlist from "@hooks/useWishlist"
import Loading from "@components/feedback/index"
import { GridList, Heading } from "@components/common"
import { Products } from "@components/ecommerce"


const Wishlists = () => {

  //customed hook:
  const {records, error, loading} = useWishlist()

  return (
    <>
      <Heading title="Your wishlist"/>
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