import { Category} from "@components/ecommerce"
import { Container} from "react-bootstrap"
import { GridList, Heading } from "@components/common"
import Loading from "@components/feedback/index"
import useCategory from "@hooks/useCategory"



const Categories = () => {

  //customed hook:
  const {records, error, loading} = useCategory()
  
  return (
    <Container>
      <Heading title="Categories"/>
      <Loading error={error} status={loading}> 
        <GridList records={records} renderItem={(record)=> <Category {...record}/>}/>
      </Loading>
    </Container>
  )
}

export default Categories