import { Products } from "@components/ecommerce"
import { Container} from "react-bootstrap"
import Loading from "@components/feedback/index"
import { GridList, Heading } from "@components/common"
import useProduct from "@hooks/useProduct"


const Product = () => {

  //customed hook:
  const {loading, error, ProductsFullInfo, param} = useProduct()

  return (
    <Container>
      <Heading title={`${param.prefix?.toUpperCase()}'s Products`}/>
      <Loading error={error} status={loading}> 
        <GridList records={ProductsFullInfo} renderItem={(record)=> <Products {...record} />}/>
      </Loading>
    </Container>
  )
}

export default Product