import styles from './styles.module.css'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const {Container, totalNUm, pumpAnimate, iconWrapper}=styles

type HeaderCounterProps = {
  Totalquantity : number,
  svgIcon : React.ReactNode, 
  page: string, 
  title : string
}

const HeaderCounter = ({Totalquantity, svgIcon, page, title}:HeaderCounterProps ) => {

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
    <div className={Container} onClick={()=> navigate(`${page}`)}>
        <div className={iconWrapper}>
          {svgIcon}
          {Totalquantity > 0 ? <div className={quantityStyle}>{Totalquantity}</div> : null}
        </div>
        <h3>{title}</h3>
    </div>
  )
}

export default HeaderCounter