import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { useSelector } from 'react-redux';

type Props = {
    header: string;
    subheader: string;
    onClickYes: () => void;
    onClickNo: () => void;
    open: boolean;
}
export default function YesNoDialog(props: Props) {

    const [open, setOpen] = useState(props.open);
    const infoDialog = useSelector((state: any) => state.dialog)

    useEffect(() => setOpen(props.open), [props.open]);

    useEffect(() => {
        console.log(infoDialog)
    })
    return (
        <Dialog
            open={open}
            aria-labelledby="responsive-dialog-title"
        >
            <DialogTitle id="responsive-dialog-title">{props.header}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {props.subheader}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.onClickYes} variant="contained" color="primary" autoFocus>
                    Yes
                </Button>
                <Button onClick={props.onClickNo} variant="contained" color="secondary" autoFocus>
                    No
                </Button>
            </DialogActions>
        </Dialog>
    )
}
