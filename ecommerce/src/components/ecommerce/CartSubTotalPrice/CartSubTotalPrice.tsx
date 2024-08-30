import { TProduct } from '@customeypes/product'
import styles from './styles.module.css'

type CartSubTotalPriceProps = {
 product : TProduct[]
}

const CartSubTotalPrice = ({product}:CartSubTotalPriceProps) => {
  const subtotal = product.reduce((acc, el)=>{
    const price = el.price
    const quant = el.quantity
    if(quant && typeof quant === 'number'){
      return acc + price * quant
    }else{
      return acc
    }
  }, 0)

  return (
    <div className={styles.container}>
        <span>Subtotal</span>
        <span>{subtotal.toFixed(2)} LPB</span>
    </div>
  )
}

export default CartSubTotalPrice