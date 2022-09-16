import React from 'react';
import styles from '../styles/index.module.css';

const Home = () => {
  return (
    <>
      <h1 className={styles.title}>Tecky Job Portal</h1>
      <div>Backend URL : {process.env.BACKEND_URL}</div>
    </>
  );
};
export default Home;
