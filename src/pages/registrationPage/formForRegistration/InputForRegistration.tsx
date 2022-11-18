import React, {useState} from 'react';
import {FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput} from '@mui/material';
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {FormikTouched} from "formik/dist/types";

type InputForRegistrationProps = {
    value: string | number
    onChange: (e: React.ChangeEvent<any>) => void
    name: string
    type?: string
    label?: string
    onBlur?: (e: React.FocusEvent<any>) => void
    error?: string
    touched?: FormikTouched<any>

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
        <FormControl style={{width: '250px'}} variant="outlined" fullWidth={true}>
            <InputLabel htmlFor="outlined-adornment-password"
                color={props.touched && props.error ? "error" : "success"}
            >{props.label}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                type={isVisiblePassword ? 'text' : typeInput}
                value={props.value}
                name={props.name}
                onChange={props.onChange}
                label={props.label}
                onBlur={props.onBlur}
                color={props.touched && props.error ? "error" : "success"}
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