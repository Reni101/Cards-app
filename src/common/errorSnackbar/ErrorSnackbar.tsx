import * as React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {useDispatch, useSelector} from 'react-redux';
// import {setErrorApp} from '../../reducers/App-reducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export  const  ErrorSnackbar = () => {
    //const error = useSelector<AppStateType,string | null>(state => state.app.error)
    const dispatch = useDispatch()

    const error = 'testing error'



    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
       //dispatch(setErrorApp({error:null}))
    };


    return (
            <Snackbar open={error && error.length > 1 && !null ? true : false} autoHideDuration={5000} anchorOrigin={{vertical:"bottom",horizontal: 'center'}}  onClose={handleClose}>
                <Alert onClose={handleClose}  severity="error" sx={{ width: '100%',backgroundColor:'rgba(0, 0, 0, 0.50)' }}>
                    {error}
                </Alert>
            </Snackbar>
    );
}