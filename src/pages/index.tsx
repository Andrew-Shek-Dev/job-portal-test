import React from 'react';

const Home = () => {
  return (
    <>
      <h1>Tecky Job Portal</h1>
      <div>Backend URL : {process.env.BACKEND_URL}</div>
    </>
  );
};
export default Home;
