import { Category} from "@components/ecommerce"
import { Container, Row, Col } from "react-bootstrap"
import { useEffect } from "react"

//Customized Dispatch and Selector:
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetCategories } from "@store/categories/categoriesSlice"



const Categories = () => {

  const dispatch = useAppDispatch()
  const {records, error, loading} = useAppSelector((state)=> state.categories)
  

  useEffect(()=>{
    if(!records.length){
    dispatch(actGetCategories())
  }
},[dispatch, records])

  const categoriesList = records.length >0 ? records.map((record)=>{
    return (<Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2" key={record.id}>
              <Category {...record}/>
           </Col>)
  }) 
  : "there are no categories"


  return (
    <Container>
      <Row>
        {categoriesList}
      </Row>
    </Container>
  )
}

export default Categories