import React from "react";
import "./Login.css";
import fpMan from "../../assets/fpMan.png"
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';



const ForgetPassword = () => {
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
                    <img className="logMan-img" src={fpMan} alt=""></img>
                </div>
                <div>
                    <a href="/login">Back</a>
                </div>
            </div>
            <div className="login">
                <div><h1>Forget Password</h1></div><br /><br />
                <form>
                    <div><h6>No worries! Enter your email address and we will <br />send you a link to reset password</h6></div><br />
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
                        <br />
                        <div><a class="btn btn-primary" href="reset-password" role="button">SEND</a></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword;