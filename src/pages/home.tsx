import { GetServerSideProps } from 'next';
import {Container,ImageWrapper,ProductTitle} from '../styles/home.style';
import Image from 'next/image';
import Link from 'next/link';
import imgSrc from '../../assets/images/81fPKd-2AYL._AC_SL1500_.jpg'
import React from 'react';

const Home = () => {
  return (
    <Container>
        <ImageWrapper>
        <Image 
        objectFit="cover"
        src={imgSrc}/>
      </ImageWrapper>
      <Link href={`/post/${1}`} passHref>
        <ProductTitle>{"Test Link 1"}</ProductTitle>
      </Link>
    </Container>
  )
}

export default Home

export const getServerProps:GetServerSideProps = async()=>{
  try{
    return {
        props:{}
    }
  }catch{
    return undefined;
  }
}