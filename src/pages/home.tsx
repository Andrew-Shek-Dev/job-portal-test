import { GetServerSideProps } from 'next';
import {Container,ImageWrapper,ProductTitle} from '../styles/home.style';
import Image from 'next/image';
import Link from 'next/link';
import imgSrc from '../../assets/images/81fPKd-2AYL._AC_SL1500_.jpg'

const home = () => {
  return (
    <Container>
      <ImageWrapper>
        <Image 
        layout="fill" 
        objectFit="cover"
        src={imgSrc}/>
      </ImageWrapper>
      <Link href={`/post/${1}`} passHref>
        <ProductTitle>{"Test Link"}</ProductTitle>
      </Link>
    </Container>
  )
}

export default home

export const getServerProps:GetServerSideProps = async()=>{
    return {
        props:{}
    }
}