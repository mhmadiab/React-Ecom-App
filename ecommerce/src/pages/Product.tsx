import { Products } from "@components/ecommerce"
import { Container} from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { actGetProductsByCatPrefix , cleanUp} from "@store/products/productsSlice"
import { useParams } from "react-router-dom"
import Loading from "@components/feedback/index"
import { GridList } from "@components/common"

const Product = () => {
  const dispatch = useAppDispatch()
  const param = useParams()
 
  const {records, error, loading} = useAppSelector((state)=> state.products)

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
    <Loading error={error} status={loading}> 
    <GridList records={records} renderItem={(record)=> <Products {...record}/>}/>
    </Loading>
    </Container>
  )
}

export default Product