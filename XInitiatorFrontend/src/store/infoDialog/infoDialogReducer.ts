import { Reducer } from "redux";

export type DialogState = {
    isOpen: boolean;
    dialogType: 'YesNO' | 'Error' | 'Success';
    header: string;
    subheader: string;
    onClickYes?: any,
    onClickNo?: any,
    onClose?: any,
}

const initialState: DialogState = {
    isOpen: false,
    dialogType: 'YesNO',
    header: '',
    subheader: '',
    onClickYes: () => { },
    onClickNo: () => { },
    onClose: () => { },
}

export const infoDialogReducer: Reducer<DialogState, any> = (state = initialState, action: { type: any; payload: any }) => {
    switch (action.type) {
        case 'OPEN_DIALOG':
            return {
                isOpen: true,
                dialogType: action.payload.dialogType,
                header: action.payload.header,
                subheader: action.payload.subheader,
                onClickYes: action.payload.onClickYes != null ? action.payload.onClickYes : () => { },
                onClickNo: action.payload.onClickNo != null ? action.payload.onClickNo : () => { },
                onClose: action.payload.onClose != null ? action.payload.onClickNo : () => { },
            }
        case 'CLOSE_DIALOG':
            return {...state, isOpen: false}
        default:
            return state;
    }
}