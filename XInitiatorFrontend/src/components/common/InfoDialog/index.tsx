import React from 'react'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DoneIcon from './done_icon.svg';
import FailedIcon from './undone_icon.svg';
import { useDispatch, useSelector } from 'react-redux';

export default function InfoDialog() {

    const dispatch = useDispatch();
    const infoDialog = useSelector((state: any) => state.dialog);

    const onClickOkay = () => dispatch({ type: 'CLOSE_DIALOG' });

    if (infoDialog.dialogType === "YesNO") {
        return (
            <Dialog
                open={infoDialog.isOpen}
                aria-labelledby="responsive-dialog-title"
                onClose={infoDialog.onClose}
            >
                <DialogTitle id="responsive-dialog-title">{infoDialog.header}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {infoDialog.subheader}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={infoDialog.onClickYes} variant="contained" color="primary" autoFocus>
                        Yes
                    </Button>
                    <Button onClick={infoDialog.onClickNo} variant="contained" color="secondary" autoFocus>
                        No
                    </Button>
                </DialogActions>
            </Dialog>
        )
    } else {
        return (
            <Dialog
                open={infoDialog.isOpen}
                aria-labelledby="responsive-dialog-title"
                fullWidth={true}
                maxWidth={'xs'}
                style={{textAlign: "center"}}
            >
                
                <DialogTitle id="responsive-dialog-title">{infoDialog.header}</DialogTitle>
                {infoDialog.dialogType === "Success" && (<img src={DoneIcon} alt="Done" />)}
                {infoDialog.dialogType === "Error" && (<img src={FailedIcon} alt="Failed" />)}
                <DialogContent>
                    <DialogContentText>
                        {infoDialog.subheader}
                    </DialogContentText>
                </DialogContent>
                <DialogActions style={{display:'flex',justifyContent: "center", alignContent: "center"}}>
                    <Button onClick={onClickOkay} variant="outlined" color="default" autoFocus>
                        Okay
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }

}
