import React from "react";
import Log from '../components/Log';
import image from '../logo/imgentreprise.jpg';


const Home = () => {
  return (
    <>
      <main id="main-log">
        <div id="log-presentation">
          <img src={image} alt="bureau avec des ordinateurs"></img>
          <div className="log-box"></div>
          {/* <h1>Bienvenue sur votre premier réseau social d'entreprise</h1> */}
        </div>
        <Log signin={true} signup={false} />
      </main>

    </>
  )
};

export default Home;
