
import { Container } from 'react-bootstrap'
import { Link} from 'react-router-dom'
import LottieHandler from '@components/feedback/LottieHandler/LottieHandler'

const Error = () => {
    

  return (
      <Container className='notFound'>
        <LottieHandler type="notFound" message='cannot  find page' />

        <Link to="/" replace={true}>go back</Link>
      </Container>
  )
}

export default Error