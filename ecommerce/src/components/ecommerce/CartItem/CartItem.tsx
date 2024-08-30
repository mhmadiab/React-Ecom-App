import { TProduct } from '@customeypes/product';
import styles from  './styles.module.css';
import {Form, Button } from 'react-bootstrap'
import { memo } from 'react';

const {cartItem, product, productImg, productInfo, cartItemSelection} = styles

type CartItemProps = TProduct & {
  changeQuantitHandler :  (quantity: number, id: number) => void,
  removeHandler : (id:number)=> void
}

const CartItem = memo(({id, title, img, price, max, quantity,changeQuantitHandler, removeHandler }:CartItemProps ) => {

  const renderOption = Array(max).fill(0)
  .map((_, index) => (
    <option key={index} value={index + 1} >{index + 1}</option>
  ))

  const changeQuantity = (event: React.ChangeEvent<HTMLSelectElement>)=>{
    const quantity = +event.target.value
    changeQuantitHandler(quantity, id)
  }




  return (
    <div className={cartItem}>
        <div className={product}>
          <div className={productImg}>
            <img src={img} alt=""/>
          </div>
          <div className={productInfo}>
            <h2>{title}</h2>
            <h3>{price.toFixed(2)} LPB</h3>
            <Button
              variant="secondary"
              style={{ color: "white", width: "100px" }}
              className="mt-auto"
              onClick={()=>removeHandler(id)}
            >
              Remove
            </Button>
          </div>
        </div>

        <div className={cartItemSelection}>
          <span className="d-block mb-1">Quantity</span>
          <Form.Select value={quantity} onChange={changeQuantity}>
            {renderOption}
          </Form.Select>
        </div>
      </div>
    );
  })
 

export default CartItem