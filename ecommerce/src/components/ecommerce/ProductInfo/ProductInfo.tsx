
import styles from './styles.module.css'


type TProductInfo = {
   title:  string,
   price:  number,
   img: string,
   children?: React.ReactNode,
   style?: React.CSSProperties,
   direction?: "row" | "column",
   quantity?: number
}


const ProductInfo = ({title, price,  img, children, style, direction="row", quantity}: TProductInfo) => {

  return (
    <div className={`${styles[`product-${direction}`]}`} style={style}>
          <div className={`${styles[`productImg-${direction}`]}`}>
            <img src={img} alt=""/>
          </div>
          <div className={`${styles[`productInfo-${direction}`]}`}>
            <h2 title={title}>{title}</h2>
            <h3>{price.toFixed(2)} LPB</h3>
            {quantity && <h3>Quantity: {quantity}</h3>}
            {quantity && <h3>Total Price: {(quantity * price).toFixed(2)} LBP</h3>}
            {children}
          </div>
    </div>
  )
}

export default ProductInfo