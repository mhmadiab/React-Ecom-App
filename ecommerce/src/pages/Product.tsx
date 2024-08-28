import { Products } from "@components/ecommerce"
import { Container} from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { actGetProductsByCatPrefix , cleanUp} from "@store/products/productsSlice"
import { useParams } from "react-router-dom"
import Loading from "@components/feedback/index"
import { GridList, Heading } from "@components/common"


const Product = () => {
  const dispatch = useAppDispatch()
  const param = useParams()
 
  const {records, error, loading} = useAppSelector((state)=> state.products)

  const cartItems = useAppSelector((state)=> state.carts.items)

  const ProductsFullInfo = records.map((el)=>{
    return {
      ...el,
      quantity: cartItems[el.id] || 0
    }
  })

  useEffect(()=>{
    let prefix: string
    if(param.prefix && typeof param.prefix === "string" ){
      prefix = param.prefix
      dispatch(actGetProductsByCatPrefix(prefix))
      return ()=>{
        dispatch(cleanUp())
      }
    }
  },[dispatch, param])

 


  return (
    <Container>
      <Heading>{param.prefix}'s Products</Heading>
      <Loading error={error} status={loading}> 
        <GridList records={ProductsFullInfo} renderItem={(record)=> <Products {...record} />}/>
      </Loading>
    </Container>
  )
}

export default Product