import { TLoading } from "@customeypes/shared"

//Skeleton:
import CategorySkeleton from "../Skeletons/CategorySkeleton/CategorySkeleton"
import  ProductSkeleton from "../Skeletons/ProductSkeleton/ProductSkeleton"
import CartSkeleton from "../Skeletons/CartSkeleton/CartSkeleton"

//lottieHandler:
import LottieHandler from "../LottieHandler/LottieHandler"

const skeletonTypes  = {
    category : CategorySkeleton,
    product : ProductSkeleton,
    cart : CartSkeleton
}

interface ILoadingProps {
   status:TLoading,
   error: null | string
   children: React.ReactNode,
   type?: keyof typeof skeletonTypes
}

const Loading = ({status, error, children, type = "category"}:ILoadingProps) => {

    const Component = skeletonTypes[type]

    if(status === 'pending'){
        return <Component />
    }
    else if(status === 'failed'){
        return <div>
            <LottieHandler type="networkError" message={error as string}/>
        </div>
    }
    return <>{children}</>

}

export default Loading