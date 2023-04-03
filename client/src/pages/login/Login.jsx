import React,{useState} from 'react';
import axios from "axios";
import { useNavigate  } from 'react-router-dom';


const Login = () => {
  const [email, setEmail]=useState();
  const [password, setPassword]=useState();

  let history = useNavigate ()
  const login = ()=>{
    const data = {email:email, password:password}
    axios.post("http://localhost:3001/auth/login", data).then((response)=>{
        if(response.data.error){
          alert(response.data.error);
        }else{
          sessionStorage.setItem("accessToken", response.data)
          history.push("/")
        }
        
    })
  }

  return (
    <div>
      <input
      type='email'
      onChange={(event)=>{
        setEmail(event.target.value)
      }}
      />
      <input
      type='password'
      onChange={(event)=>{
        setPassword(event.target.value)
      }}
      />
      <button onClick={login}>Sign in</button>
    </div>
  )
}

export default Login