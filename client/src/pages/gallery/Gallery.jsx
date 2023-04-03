import React, { useState } from 'react';
import Header2 from "../../componets/Header2";
import WeatherOptions from "../weatherApi/WeatherOptions"
import Forecast from "../weatherApi/Forecast"
import HeaderComponent from "./components/Banner/HeaderComponent";
import Clients from "./components/Clients/Clients";
import BestRattings from "./components/BestRatting/BestRattings";
import Places from "./components/Place/Places";
import styled from 'styled-components';
const Gallery = () => {

  const tripDate = new Date('2023-03-30');

  //pull changed location from child components to this cmponent
  const [globalLocation, setGlobalLocation] = useState('Kandy');

  const pull_newGlobalLocation = (newLocation) => {
    setGlobalLocation(newLocation);
  }

  return (
    <div>
      <Header2 />
      <br />
      <br /><br />

      <div className="galler">
        <Container>
          <Banner>
            <Logo>
              <h1>Gallery</h1>
            </Logo>
          </Banner>
          <HeaderComponent />
          <Places />
          <LightColor>
            <BestRattings />
          </LightColor>
          <Clients />
        </Container>
      </div>
      <div className="gallerycontainer">
        <WeatherOptions />
        <Forecast

          currentCity={globalLocation}
          tripDate={tripDate}
          Globalfunc={pull_newGlobalLocation} //passing location function

        />

      </div>

    </div>
  );

}

export default Gallery

const Container = styled.div`
  background:DarkSeaGreen  ;
`;
const Banner = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
  height: 20vh;
  @media (max-width: 640px) {
    height: 100%;
    padding-bottom: 2rem;
  }
`;

const LightColor = styled.div`
  background: linear-gradient(159deg, rgb(45, 45, 58) 0%, rgb(43, 43, 53) 100%);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1280px;
  width: 80%;
  margin: 0 auto;
  padding: 1rem 0;
  position: relative;
  @media(max-width: 840px){
      width: 90%;
  }
    
  h1{
      font-weight: 600;
      font-size: 4rem;
  }

  
`;