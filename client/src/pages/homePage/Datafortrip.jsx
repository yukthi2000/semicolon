import React from 'react';
import "./datafortrip.css"
import styled from 'styled-components';
const Datafortrip = () => {
    return (
        <div className='body'>
            <Maincontainer />
        </div>
    );
}


export default Datafortrip;

const Maincontainer=styled.div`display:flex;
align-items:center;
flex-direction:column;
height:80vh;
width:30vw;
background:rgba(255,255,255,0.15);
box-shadow:0 8px 32px 0 rgba(31,38,135,0.37);
backdrop-filter:blur(8.5px);
border-radius:10px`;
