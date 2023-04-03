import React from "react";
import styled from "styled-components";
import { Slide } from "react-awesome-reveal";
import img02 from './img02.jpeg'
import img03 from './img03.jpeg'
import img04 from './img04.jpeg'


const HeaderComponent = () => {
  return (
    <Container id="home">
      <Slide direction="left">
        <Texts>
          <h3>   
          Choose Your 
          </h3>
          <h1> Perfect Holiday</h1>
          <p>
          Trippers provides you a wide range of holidays packages on your favourite destinations.
          Every destination by Trippers have tours that are tailor made specially for travel enthusiasts.
          </p>
          <button>Search</button>
        </Texts>
        
      </Slide>
    </Container>
  );
};

export default HeaderComponent;

const Container = styled.div`
  background-image: url(${img02});
  background-size: cover;
  background-position: center center;
  display: flex;
  gap: 2rem;
  padding-top: 3rem;
  width: 100%;
  height:60vh;
  margin: 0 auto;
  z-index: 1;
  animation: animateBackground 20s ease-in-out infinite;

  @media (max-width: 640px) {
    flex-direction: column;
  }

  @keyframes animateBackground {
    0% {
      background-image: url(${img02});
    }
    25% {
      background-image: url(${img03}); 
    }
    50% {
      background-image: url(${img04}); 
    }
    75% {
      background-image: url(${img04}); 
    }
    100% {
      background-image: url(${img04}); 
    }

  }
`;
const Texts = styled.div`
  flex: 1;
  margin:50px;
  
  h1 {
    font-size: 2rem;
    font-family: "Secular One", sans-serif;
    letter-spacing: 4px;
  }
  h3 {
    font-weight: 500;
    font-size: 1.2rem;
    padding-bottom: 1.2rem;
    text-transform: capitalize;
    padding: 1rem 0;
  }
  p {
    font-weight: 500;
    font-size: 1.5rem
    color: #000000;
  }

  button {
    padding: 0.7rem 2rem;
    margin-top: 3rem;
    cursor: pointer;
    background-color: #000000;
    border: none;
    color: #fff;
    font-weight: 500;
    filter: drop-shadow(0px 10px 10px #01be9551);
    :hover {
      filter: drop-shadow(10px 10px 10px #01be9570);
    }
  }
`;


