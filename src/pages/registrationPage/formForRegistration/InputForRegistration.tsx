import React, {useState} from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";

type InputForRegistrationProps = {
    value: string | number
    onChange: (e: React.ChangeEvent<any>) => void
    name: string
    type?: string
    label?: string
    onBlur?: (e: React.FocusEvent<any>) => void

}
const InputForRegistration = (props: InputForRegistrationProps) => {
    const [isVisiblePassword, setIsVisiblePassword] = useState(false)
    const handlerShowPassword = () => {
        setIsVisiblePassword(!isVisiblePassword)
    }
    let typeInput = 'password'
   if (props.name === 'email') {
      typeInput = 'text'
   }
    return (
        <FormControl variant="outlined" fullWidth={true}>
            <InputLabel htmlFor="outlined-adornment-password"
                // color={formik.touched.password && formik.errors.password ? "error" : "success"}
            >{props.label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                // type={props.type}
                type={isVisiblePassword ? 'text' : typeInput}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                label={props.label}
                onBlur={props.onBlur}
                // color={formik.touched.password && formik.errors.password ? "error" : "success"}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handlerShowPassword}
                            // onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {props.name !== 'email' && (isVisiblePassword ? <VisibilityOff/> : <Visibility/>)}
                        </IconButton>
                    </InputAdornment>
                }
            />
        </FormControl>
    );
};

export default InputForRegistration;