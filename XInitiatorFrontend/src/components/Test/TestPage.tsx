import { Button } from '@material-ui/core'
import React from 'react'
import { useDispatch } from 'react-redux';
import { openErrorDialogAction } from '../../store/infoDialog/infoDialogAction';

export default function TestPage() {

    const dispatch = useDispatch();
    
    const getYesNoFunction = () => {
        dispatch(openErrorDialogAction("Hello", "World"));
    }

    return (
        <div style={{marginTop: 100}}>
            <Button onClick={getYesNoFunction}>Click Me</Button>
        </div>
    )
}
