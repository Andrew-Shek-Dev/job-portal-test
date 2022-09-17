import { GetServerSideProps } from 'next';
import {Container,ImageWrapper,ProductTitle} from '../styles/home.style';
import Image from 'next/image';
import Link from 'next/link';
import imgSrc from '../../assets/images/81fPKd-2AYL._AC_SL1500_.jpg'
import React, { ChangeEvent, useState } from 'react';
import { useRouter } from 'next/router';
import { sortByPrice } from 'dist/shared/fake-data';
import { Direction } from 'src/shared/fake-data';
import { PageTitle } from './post/[postId].style';

const Home = () => {
  const [direction,setDirection] = useState<Direction>("ASC");
  const router = useRouter();
  const products = sortByPrice(direction);

  const sortingHandler = (e:ChangeEvent<HTMLSelectElement>)=>{
    const dir = e.target.value;
    router.push(`${router.pathname}?direction=${dir}`,undefined,{shallow:true})
  }

  // return (
  //   <Container>
  //       <ImageWrapper>
  //       <Image 
  //       objectFit="cover"
  //       src={imgSrc}/>
  //     </ImageWrapper>
  //     <Link href={`/post/${1}`} passHref>
  //       <ProductTitle>{"Test Link 1"}</ProductTitle>
  //     </Link>
  //   </Container>
  // )
  return ( <>
    <PageTitle>商品列表</PageTitle>
    <div>
      Price:
      <select value={direction} onChange={sortingHandler}>
        <option value="ASC">價格由低到高</option>
        <option value="DES">價格由高到低</option>
      </select>
    </div>
    <div>
     {JSON.stringify(products)}
    </div>
  </>)
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