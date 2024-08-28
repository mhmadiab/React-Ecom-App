import { Category} from "@components/ecommerce"
import { Container} from "react-bootstrap"
import { useEffect } from "react"
import { GridList, Heading } from "@components/common"

//Customized Dispatch and Selector:
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetCategories } from "@store/categories/categoriesSlice"

import Loading from "@components/feedback/index"



const Categories = () => {

  const dispatch = useAppDispatch()
  const {records, error, loading} = useAppSelector((state)=> state.categories)
  

  useEffect(()=>{
    if(!records.length){
    dispatch(actGetCategories())
  }
},[dispatch, records])




  return (
    <Container>
      <Heading>Categories</Heading>
      <Loading error={error} status={loading}> 
        <GridList records={records} renderItem={(record)=> <Category {...record}/>}/>
      </Loading>
    </Container>
  )
}

export default Categories