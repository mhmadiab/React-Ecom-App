import {Container, Row} from 'react-bootstrap'
import { Swiper, SwiperSlide } from 'swiper/react';
import {Scrollbar, A11y, Autoplay} from 'swiper/modules'



//sliders:
import slider1 from  '../assets/png/freepik-export-202409110640371JdM.png'
import slider2 from  '../assets/png/freepik-export-20240913081936sNFU.jpeg'
import slider3 from '@assets/png/freepik-export-20240913083420YhUC2.png'
import slider4 from '@assets/png/freepik-export-20240913090501oSbY.png'

// Import Swiper styles
import 'swiper/swiper-bundle.css';

const Home = () => {
  return (
    <Container>
      <Row>
      <Swiper
          modules={[Autoplay, Scrollbar, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          scrollbar={{ draggable: true }}
          autoplay={{ 
            delay: 3000, 
            disableOnInteraction: false, 
          }}
          loop={true} 
        >
          <SwiperSlide><img src={slider1} alt="Slide 1" style={{width : "100%"}} /></SwiperSlide>
          <SwiperSlide><img src={slider2} alt="Slide 2" style={{width : "100%"}} /></SwiperSlide>
          <SwiperSlide><img src={slider3} alt="Slide 3" style={{width : "100%"}} /></SwiperSlide>
          <SwiperSlide><img src={slider4} alt="Slide 4" style={{width : "100%"}} /></SwiperSlide>
        </Swiper>
      </Row>
      <Row >
        
      </Row>
    </Container>
  )
}

export default Home