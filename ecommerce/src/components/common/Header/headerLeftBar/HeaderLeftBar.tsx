import Styles from './styles.module.css'
import HeaderCounter from '../HeaderCounter/HeaderCounter'
import LogoCart from '@assets/svg/cart.svg?react'
import LogoWishlist from '@assets/svg/wishlist.svg?react'
import { useAppSelector } from '@store/hooks'
import getCartTotalQuantity from '@store/cart/selectors'

const {headerLeftBar} = Styles


const HeaderLeftBar = () => {

    const TotalquantityWishList = useAppSelector((state)=> state.wishlists.itemId.length)
    const TotalquantityCart = useAppSelector(getCartTotalQuantity)
  return (
    <div className={headerLeftBar}>
            <HeaderCounter title="Wishlist" svgIcon={<LogoWishlist title='wishlistIcon'/>} Totalquantity={TotalquantityWishList} page='wishlist'/>
            <HeaderCounter title="Cart" svgIcon={<LogoCart title='CartIcon'/>} Totalquantity ={TotalquantityCart} page='cart'/>
    </div>
  )
}

export default HeaderLeftBar