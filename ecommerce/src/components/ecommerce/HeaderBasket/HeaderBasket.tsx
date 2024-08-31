import styles from './styles.module.css'
import Logo from '@assets/svg/cart.svg?react'
import { useAppSelector } from '@store/hooks'
import { getCartTotalQuantity } from '@store/cart/cartSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const {Container, totalNUm, pumpAnimate, iconWrapper}=styles

const HeaderBasket = () => {

  const Totalquantity = useAppSelector(getCartTotalQuantity)

  const [isAnimate, setIsAnimate] = useState(false) 
  const quantityStyle = `${totalNUm} ${isAnimate ? pumpAnimate : "" }`

  const navigate = useNavigate()


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
    <div className={Container} onClick={()=> navigate("cart")}>
        <div className={iconWrapper}>
          <Logo />
          {Totalquantity > 0 ? <div className={quantityStyle}>{Totalquantity}</div> : null}
        </div>
        <h3>Cart</h3>
    </div>
  )
}

export default HeaderBasket