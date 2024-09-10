import { TProduct } from '@customeypes/product'
import styles from './styles.module.css'
import { Button ,Modal, Spinner} from 'react-bootstrap'
import { useState } from 'react'
import { useAppDispatch } from '@store/hooks'
import { actPlaceOrder } from '@store/orders/ordersSlice'
import { clearCartAfterPlaceOrder } from '@store/cart/cartSlice'

type CartSubTotalPriceProps = {
 product : TProduct[]
 userAccess:  string | null

}

const CartSubTotalPrice = ({product, userAccess}:CartSubTotalPriceProps) => {
  const subtotal = product.reduce((acc, el)=>{
    const price = el.price
    const quant = el.quantity
    if(quant && typeof quant === 'number'){
      return acc + price * quant
    }else{
      return acc
    }
  }, 0)

  const dispatch = useAppDispatch()

  const [show, setShow] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const ModalHandler = ()=>{
    setShow(!show)
    setError(null)
  }

  const placeOrderHandler =()=>{
    dispatch(actPlaceOrder(subtotal))
    .unwrap()
    .then(()=>{
      dispatch(clearCartAfterPlaceOrder())
      setShow(false)
    })
    .catch((error)=>{
      setError(error)
    })
    .finally(()=>setLoading(false))
  }

  return (
    <>
    <Modal show={show} onHide={()=>ModalHandler} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Placing Order</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to place order with Subtotal: {subtotal.toFixed(2)} LBP
          {!loading && error && (<p style={{color: "#DC3545", marginTop:  "10px"}}>Error: {error}</p>)}

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={ModalHandler}>
            Close
          </Button>
          <Button variant="info" style={{color : "white"}} onClick={placeOrderHandler}>
            {loading ? (
              <><Spinner animation="border" size="sm"></Spinner>Loading...</>
            ): (
              "Confirm"
            )}
          </Button>
        </Modal.Footer>
      </Modal>
    <div className={styles.container}>
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)} LPB</span>
    </div>
    <div className={styles.container}>
        <span></span>
        {userAccess ? <span>
            <Button variant='info' style={{color: "white"}} onClick={ModalHandler}>
               Place order
            </Button>
          </span> : " You must be logged in to place an order"}

    </div>
    </>
  )
}

export default CartSubTotalPrice