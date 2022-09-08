import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';

const ShallowRouting = () => {
    const router = useRouter();
    const [counter,setCounter] = useState<number[]>([]);

    useEffect(()=>{
        if(router.query.counter){
            setCounter(previous=>[...previous,parseInt(router.query.counter as string)]);
        }
    },[router.query.counter]);
  return (
    <>
    <ul>
        {counter.map(c=>(<li key={c}>{c}</li>))}
    </ul>
    <button onClick={()=>{
        router.push(`/ShallowRouting?counter=${Math.floor(Math.random()*100)}`,undefined,{shallow:true});
    }}>Add Counter</button>
    </>
  )
}

export default ShallowRouting