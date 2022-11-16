import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
import {setErrorApp} from '../../AppReducer';
import {AppRootStateType} from '../../Redux/Store';


const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export  const  ErrorSnackbar = () => {
    const error = useSelector<AppRootStateType,string | null>(state => state.App.error)
    const dispatch = useDispatch()




    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
       dispatch(setErrorApp(null))
    };


    return (
            <Snackbar open={error && error.length > 1 && !null ? true : false} autoHideDuration={5000} anchorOrigin={{vertical:"bottom",horizontal: 'center'}}  onClose={handleClose}>
                <Alert onClose={handleClose}  severity="error" sx={{ width: '100%',backgroundColor:'rgba(0, 0, 0, 0.50)' }}>
                    {error}
                </Alert>
            </Snackbar>
    );
}