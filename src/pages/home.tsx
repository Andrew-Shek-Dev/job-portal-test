import { GetServerSideProps } from 'next';
import {Container,ImageWrapper,ProductTitle} from '../styles/home.style';
import Image from 'next/image';
import Link from 'next/link';
import imgSrc from '../../assets/images/81fPKd-2AYL._AC_SL1500_.jpg'
import React, { ChangeEvent, useEffect, useState } from 'react';
import { PageTitle } from './post/[postId].style';
import { Direction, sortByPrice } from 'src/shared/fake-data';
import { useRouter } from 'next/router';

const Home = () => {
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

  const [direction, setDirection] = useState<Direction>("ASC");
  const router = useRouter();

  const products = sortByPrice(direction);

  const handleSortingDirectionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    //setDirection(e.target.value as Direction);
    const dir = e.target.value;
    router.push(`${router.pathname}?direction=${dir}`,undefined,{shallow:true});
  };

  useEffect(() => {
    if (router.query.direction) {
      setDirection(router.query.direction as Direction);
    }
  }, [router.query.direction]);


  return ( <>
    <PageTitle>商品列表</PageTitle>
    <div>
      Price:
      <select value={direction} onChange={handleSortingDirectionChange}>
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