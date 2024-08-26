import { TLoading } from "@customeypes/shared"

interface ILoadingProps {
   status:TLoading,
   error: null | string
   children: React.ReactNode
}

const Loading = ({status, error, children}:ILoadingProps) => {
    if(status === 'pending'){
        return <h3>Loading please wait...</h3>
    }
    else if(status === 'failed'){
        return <h3>{error}</h3>
    }
    return <>{children}</>

}

export default Loading