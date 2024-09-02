import LottieHandler from "@components/feedback/LottieHandler/LottieHandler"
import { Row, Col } from "react-bootstrap"

type GridList<T> = {
    records:T[],
    renderItem:(record:T)=> React.ReactNode
    message : string

}
type hasID = {id?:number}
const GridList = <T extends hasID> ({records, renderItem, message}: GridList <T>) => {
    const categoriesList = records.length >0 ? records.map((record)=>{
        return (<Col xs={6} md={3} className="d-flex justify-content-center mb-5 mt-2" key={record.id}>
                  {renderItem(record)}
               </Col>)
      }) 
      : <LottieHandler type="empty" message={message} />

      return(<Row>
        {categoriesList}
      </Row>)
}

export default GridList