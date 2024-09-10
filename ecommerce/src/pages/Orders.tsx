import useOrders from "@hooks/useOrders"
import { Heading } from "@components/common"
import { Table, Modal } from "react-bootstrap"
import Loading from "@components/feedback"
import ProductInfo from "@components/ecommerce/ProductInfo/ProductInfo"
const Orders = () => {
  
  const {orderList,
        firstName, 
        lastName,
        loading, 
        error, 
        showModal, 
        selectedProduct,  
        viewDetailsHandler, 
        closeModalHandler} = useOrders()  

    
  return (
    <>
     <Modal show={showModal} onHide={closeModalHandler}>
        <Modal.Header closeButton>
          <Modal.Title>Products Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct.map((el) => (
            <ProductInfo
              key={el.id}
              title={el.title}
              img={el.img}
              price={el.price}
              quantity ={el.quantity}
              direction="column"
              style={{ marginBottom: "10px" }}
            />
          ))}
        </Modal.Body>
      </Modal>

      <Heading title={`${firstName} ${lastName} Orders`} />
      <Loading type="table" error={error} status={loading} >
            <Table striped bordered hover>
                <thead>
                        <tr>
                        <th>Order Number</th>
                        <th>Items</th>
                        <th>Total Price</th>
                        </tr>
                </thead>
                <tbody>
                    {orderList.map((order)=>(
                        <tr key={order.id}>
                            <td>#{order.id}</td>
                            <td>{order.items.length} items {" / "} 
                                <span
                                    onClick={() => viewDetailsHandler(order.id)}
                                    style={{ textDecoration: "underline", cursor: "pointer" }}
                                >
                                    Product Details
                                </span>
                            </td>
                            <td>{order.subtotal.toFixed(2)} LBP</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Loading>

    </>
  )
}

export default Orders