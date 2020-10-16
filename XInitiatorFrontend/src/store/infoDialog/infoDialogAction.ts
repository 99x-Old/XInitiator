export const openErrorDialogAction = (header: string, subheader: string, onDialogClosed?: () => void) => {
    return {
        type: 'OPEN_DIALOG',
        payload: {
            dialogType: 'Error',
            header: header,
            subheader: subheader,
            onClose: onDialogClosed != null ? onDialogClosed : () => { }
        }
    }
}

export const openSuccessDialogAction = (header: string, subheader: string, onDialogClosed?: () => void) => {
    return {
        type: 'OPEN_DIALOG',
        payload: {
            dialogType: 'Success',
            header: header,
            subheader: subheader,
            onClose: onDialogClosed != null ? onDialogClosed : () => { }
        }
    }
}

export const openYesNoDialogAction = (header: string, subheader: string, onClickYes?: () => void, onClickNo?:() => void) => {
    return {
        type: 'OPEN_DIALOG',
        payload: {
            dialogType: 'YesNO',
            header: header,
            subheader: subheader,
            onClickYes: onClickYes != null ? onClickYes : () => { },
            onClickNo: onClickNo != null ? onClickNo : () => { }

        }
    }
}