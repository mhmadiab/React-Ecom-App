import { Button, Spinner, Modal } from "react-bootstrap";
import styles from "./styles.module.css";
import { TProduct } from "@customeypes/product";
import { useAppDispatch } from '@store/hooks'
import { actLikeToggle } from '@store/whishlist/wishlistSlice'
import { addToCart } from "@store/cart/cartSlice";
import { useEffect, useState , memo} from "react";
import Like from '@assets/svg/like.svg?react'
import LikeFill from '@assets/svg/like-fill.svg?react'


const { product, productImg, maximumNotice, wishlist } = styles;

const Product = ({id,title,price,img, max, quantity, isLiked, isAuthenticated}:TProduct) => {

  const dispatch = useAppDispatch()

  const [isBtnDisabeled,  setIsBtnDisabeled]= useState(false)
  const [isLoading , setIsLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

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

  const LikeToggleHandler = ()=>{
    if(isAuthenticated){
      if(isLoading ){
        return 
      }
      setIsLoading(true)
      dispatch(actLikeToggle(id)).unwrap()
      .then(()=>{setIsLoading(false)})
      .catch(()=> setIsLoading(false))
    }else{
      setShowModal(true)
    }
  }

  return (
    <>
        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Login Required</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            You need to login first to add this item to your wishlist.
          </Modal.Body>
        </Modal>

        <div className={product}>
          <div className={wishlist} onClick={LikeToggleHandler}>
            {isLoading ? (
              <Spinner animation="border" size="sm" variant="primary" />
            ) : isLiked ? (
              <LikeFill />
            ) : (
              <Like />
            )}
          </div>
          <div className={productImg}>
            <img src={img} alt={title} />
          </div>
          <h2>{title}</h2>
          <h3>{price.toFixed(2)} EGP</h3>
          <p className={maximumNotice}>
            {quantityReachedToMax
              ? "You reached to the limit"
              : `You can add ${currentRemainingQuantity} item(s)`}
          </p>
          <Button
            variant="info"
            style={{ color: "white" }}
            onClick={addToCartHandler}
            disabled={isBtnDisabeled || quantityReachedToMax}
          >
            {isBtnDisabeled ? (
              <>
                <Spinner animation="border" size="sm" /> Loading...
              </>
            ) : (
              "Add to cart"
            )}
          </Button>
        </div>
      </>
  );
};

export default memo(Product);