import React from "react";
import "./Login.css";
import logMan from "../../assets/logMan.png"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';


const Login = () => {
    return (
        <div className="login-form">
            <div>
                <a href="/"><HomeIcon
                    sx={{
                        position: "absolute",
                        color: "#E86E18",
                        backgroundColor: "rgb(238, 238, 238)",
                        borderRadius: "5px",
                        height: "30px",
                        width: "30px",
                        marginLeft: "170vh",
                        marginTop: "-10vh"
                    }} /></a>
            </div>
            <div className="login-man">
                <div>
                    <img className="logMan-img" src={logMan} alt=""></img>
                </div>
                <div>
                    <a href="/register">Create a new Account</a>
                </div>
            </div>
            <div className="login">
                <div><h1>Sign In</h1></div><br /><br />
                <form>
                    <div>
                        <div>
                            <EmailIcon />
                            <input
                                className='input'
                                type="email"
                                id="email"
                                required
                                placeholder='email'
                            />
                        </div>
                        <div>
                            <LockIcon />
                            <input
                                className='input'
                                type="password"
                                id="password"
                                required
                                placeholder='Password'
                            />
                        </div><br />
                        <h6><a href="forget-password">Forget password</a></h6>
                        <div><a class="btn btn-primary" href="/" role="button">LOG IN</a></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login;