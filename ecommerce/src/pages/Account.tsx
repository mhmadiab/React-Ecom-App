import { Heading } from "@components/common"
import { useAppSelector } from "@store/hooks"
import '@styles/global.css'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faUser,faMailBulk, } from '@fortawesome/free-solid-svg-icons';

const Account = () => {

  const accountInfo = useAppSelector((state)=> state.auths.user)

  return (
    <>
      <Heading title="Account Info" />
      <ul>
        <li><FontAwesomeIcon icon={faUser} style={{marginRight : "1em"}} />User Name: {accountInfo?.firstName} {accountInfo?.lastName}</li>
        <li><FontAwesomeIcon icon={faMailBulk} style={{marginRight : ".8em"}} />Email: {accountInfo?.email}</li>
      </ul>
    </>
  )
}

export default Account