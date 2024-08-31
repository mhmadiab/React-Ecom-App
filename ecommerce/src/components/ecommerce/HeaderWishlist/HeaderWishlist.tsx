import styles from './styles.module.css'
import Logo from '@assets/svg/wishlist.svg?react'
import { useAppSelector } from '@store/hooks'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const {Container, totalNUm, pumpAnimate, iconWrapper}=styles

const HeaderWishlist = () => {



  const Totalquantity = useAppSelector((state)=> state.wishlists.itemId)
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
    <div className={Container} onClick={()=> navigate("wishlist")}>
        <div className={iconWrapper}>
          <Logo />
          {Totalquantity.length > 0 ? <div className={quantityStyle}>{Totalquantity.length}</div> : null}
        </div>
        <h3>Wishlist</h3>
    </div>
  )
}

export default HeaderWishlist