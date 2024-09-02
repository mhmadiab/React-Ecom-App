import Lottie from 'lottie-react'
import notFound from '@assets/LottieFiles/Error404Animation.json'
import empty from '@assets/LottieFiles/EmptyCartAnimation.json'
import loading from '@assets/LottieFiles/LoadingAnimation.json'
import networkError from '@assets/LottieFiles/networkErrorAnimation.json'
const lottieFilesMap = {
    notFound,
    empty,
    loading,
    networkError,
}

type TLottieHandlerProps = {
    type: keyof typeof lottieFilesMap,
    message?: string
}

const LottieHandler = ({type, message}: TLottieHandlerProps) => {
    const lottieFile = lottieFilesMap[type]
  return (
    <div className='d-flex flex-column align-items-center'> 
        <Lottie animationData={lottieFile} />
        {message && <h3 style={{fontSize : "19px"}}>{message}</h3>}
    </div>
  )
}

export default LottieHandler