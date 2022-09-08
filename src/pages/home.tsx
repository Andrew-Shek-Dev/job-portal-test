//import { GetServerSideProps } from 'next';
import {Container,ImageWrapper} from '../styles/home.style';
import Image from 'next/image';

const home = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image 
        loader={()=>"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"} 
        layout="fill" 
        objectFit="cover" 
        src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"/>
      </ImageWrapper>
    </Container>
  )
}

export default home

// export const getServerProps:GetServerSideProps = async()=>{
//     return {
//         props:{}
//     }
// }