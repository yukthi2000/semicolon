import React from "react";
import TextField from '@mui/material/TextField';

const Register=()=>{
    return(
        <div>
        <TextField
          id="outlined-multiline-flexible"
          label="Multiline"
          multiline
          maxRows={4}
        />
        </div>
    )
}

export default Register;