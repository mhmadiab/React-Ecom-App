import styles from './styles.module.css'
import Logo from '@assets/svg/cart.svg?react'
import { useAppSelector } from '@store/hooks'
import { getCartTotalQuantity } from '@store/cart/cartSlice'
import { useEffect, useState } from 'react'

const {basketContainer, basketQuantity, pumpCartQuantity, basketCart}=styles

const HeaderBasket = () => {

  const Totalquantity = useAppSelector(getCartTotalQuantity)

  const [isAnimate, setIsAnimate] = useState(false) 
  const quantityStyle = `${basketQuantity} ${isAnimate ? pumpCartQuantity : "" }`


  useEffect(()=>{
    if(!Totalquantity){
      return
    }
    setIsAnimate(true)

    const debounce = setTimeout(()=>{
      setIsAnimate(false)
    }, 300)

    return ()=> clearTimeout(debounce)
  },
  [Totalquantity])

  return (
    <div className={basketContainer}>
        <div className={basketCart}>
          <Logo />
          <div className={quantityStyle}>{Totalquantity}</div>
        </div>
        <h3>Cart</h3>
    </div>
  )
}

export default HeaderBasket