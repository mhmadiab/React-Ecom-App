import { TProduct } from "@customeypes/product"
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetOrders, cleanUpOrder } from "@store/orders/ordersSlice"
import { useEffect, useState } from "react"

const useOrders = () => {
    const dispatch = useAppDispatch()

    const {orderList, loading, error} = useAppSelector((state)=> state.orders)
    const firstName = useAppSelector((state)=> state.auths.user?.firstName)
    const lastName = useAppSelector((state)=> state.auths.user?.lastName)

    const [showModal ,setShow] = useState(false)
    const [selectedProduct, setSelectedProduct] = useState<TProduct []>([])

    const viewDetailsHandler = (id: number)=>{
       setShow(true)
       const productDetails = orderList.find(order => order.id === id)
       const newItem = productDetails?.items ?? []
       setSelectedProduct(prev => [...prev,  ...newItem])

    }

    const closeModalHandler = ()=>{
         setShow(!showModal)
         setSelectedProduct([])
    }

    useEffect(()=>{
        const promise = dispatch(actGetOrders())
        return ()=>{
            promise.abort()
            dispatch(cleanUpOrder())
        }
    },[dispatch])

    
  
    return {orderList, firstName, lastName, loading, error, showModal, selectedProduct,  viewDetailsHandler, closeModalHandler}
}

export default useOrders