import { Products } from "@components/ecommerce"
import { Container, Row, Col } from "react-bootstrap"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { useEffect } from "react"
import { actGetProductsByCatPrefix , cleanUp} from "@store/products/productsSlice"
import { useParams } from "react-router-dom"

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

  const producList = records.length >0 ? records.map((record)=>{
    return (<Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2" key={record.id}>
              <Products {...record}/>
           </Col>)
  }) 
  : "there are no categories"


  return (
    <Container>
      <Row>
        {producList}
      </Row>
    </Container>
  )
}

export default Product