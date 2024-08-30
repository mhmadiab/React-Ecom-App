import { Button, Spinner } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customeypes/product";
import { useAppDispatch } from "@store/hooks";
import { addToCart } from "@store/cart/cartSlice";
import { useEffect, useState , memo} from "react";



const { product, productImg, maximumNotice } = styles;

const Product = ({id,title,price,img, max, quantity}:TProduct) => {
  console.log("fire")
  const dispatch = useAppDispatch()

  console.log()
  const [isBtnDisabeled,  setIsBtnDisabeled]= useState(false)

  const currentRemainingQuantity = max - (quantity ?? 0)


  const quantityReachedToMax = currentRemainingQuantity <= 0 ? true : false

  useEffect(()=>{
    if(!isBtnDisabeled){
      return
    }
    setIsBtnDisabeled(true)

    const debounce = setTimeout(()=>{
      setIsBtnDisabeled(false)
    },300)
    
    return ()=> clearTimeout(debounce)
  },[isBtnDisabeled])



  const addToCartHandler = ()=>{
     dispatch(addToCart(id))
     setIsBtnDisabeled(true)
  }

  return (
    <div className={product}>
      <div className={productImg}>
        <img
          src={img}
          alt=""
        />
      </div>
      <h2>{title}</h2>
      <h3>{price.toFixed(2)} LBP</h3>
      <p className={maximumNotice}>{quantityReachedToMax ? "You reached maximum amount." : `Remaining: ${currentRemainingQuantity}`}</p>
      <Button 
            variant="info" 
            style={{ color: "white" }} 
            onClick={addToCartHandler}
            disabled={isBtnDisabeled || quantityReachedToMax}
            >
              {isBtnDisabeled ? <><Spinner animation="border" size="sm"/>Loading...</> :" Add to cart" }
    
      </Button>
    </div>
  );
};

export default memo(Product);