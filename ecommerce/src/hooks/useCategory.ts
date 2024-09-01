import { useEffect } from "react"


//Customized Dispatch and Selector:
import { useAppDispatch, useAppSelector } from "@store/hooks"
import { actGetCategories, cleanUpCategoriesRecords } from "@store/categories/categoriesSlice"

const useCategory = () => {
  const dispatch = useAppDispatch()
  const {records, error, loading} = useAppSelector((state)=> state.categories)
  

  useEffect(()=>{
  const promise = dispatch(actGetCategories())
  
  return ()=>{
    promise.abort()
    dispatch(cleanUpCategoriesRecords())
  }
},[dispatch])

  return {records, error, loading}
}

export default useCategory