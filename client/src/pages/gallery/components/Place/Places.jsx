import React, {useState}from "react";
import styled from "styled-components";
//import { Zoom } from "react-awesome-reveal";
import { Medias } from "./medias";
import { MdDisabledByDefault } from 'react-icons/md'


const Places = () => {
  const [file,setFile] = useState(null);
  console.log(Medias)
  return (
    <Container >
      
        <h2>The Wonder of  Asia</h2>
        <h1>Get Sri Lankan'ED</h1>
      
      <MediaContainer>
        {
            Medias.map((file,index) =>(
              <Media key={index}
                onClick = {()=> setFile(file)}>
                {
                  file.type==='image'
                  ? <img src={file.url} alt='' />
                  : <video src ={file.url} muted />
                }
              </Media>
            ))
          }
          
      </MediaContainer>

      <PopupMedia style={{display: file ? 'block' : 'none'}}>
        <span onClick={()=> setFile(null)}><MdDisabledByDefault/></span>

        {
          file?.type === 'video'
          ? <video src={file?.url} muted autoPlay controls/>
          : <img src={file?.url} />
        }
      </PopupMedia>
          
    </Container>
  );
};

export default Places;


const Container = styled.div`
  width: 80%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;
  color: rgb(43, 43, 53) ;
  @media (max-width: 840px) {
    width: 80%;
  }
  
`;

const MediaContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  width: 100%;
  padding: 1rem;
  object-fit: cover;
`;

const Media = styled.div`
  height: 220px;
  width: 100%;
  border: 5px solid #383131;
  box-shadow: 0 5px 15px rgb(43, 43, 53) 100%;
  overflow: hidden;
  cursor: pointer;

  video,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: all 0.3s linear;
  }

  &:hover {
    video,
    img {
      transform: scale(1.1);
    }
  }
`;

const PopupMedia = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.8);
  width: 100%;
  height: 100%;

  video,
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-59%, -50%);
    display: block;
    max-width: 80%;
    max-height: 70%;
    object-fit: contain;
    border: 3px solid black;
  }

  span {
    position: absolute;
    top: 60px;
    right: 20px;
    font-size: 50px;
    font-weight: bolder;
    z-index: 100;
    cursor: pointer;
    color: #fff;
    user-select: auto;
    &:hover{
      color:red;
    }
  }
`;


