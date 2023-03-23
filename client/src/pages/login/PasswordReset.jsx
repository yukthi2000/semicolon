import React from "react";
import "./Login.css";
import rpMan from "../../assets/rpMan.png"
import LockIcon from '@mui/icons-material/Lock';
import HomeIcon from '@mui/icons-material/Home';



const PasswordReset = () => {
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
                    <img className="logMan-img" src={rpMan} alt=""></img>
                </div>

            </div>
            <div className="login">
                <div><h1>Password Reset</h1></div><br /><br />
                <form>
                    <div>
                        <div>
                            <LockIcon />
                            <input
                                className='input'
                                type="password"
                                id="password"
                                required
                                placeholder='New Password'
                            />
                        </div>
                        <div>
                            <LockIcon />
                            <input
                                className='input'
                                type="password"
                                id="password"
                                required
                                placeholder='Confirm New Password'
                            />
                        </div><br />
                        <div><a class="btn btn-primary" href="login" role="button">SUBMIT</a></div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset;