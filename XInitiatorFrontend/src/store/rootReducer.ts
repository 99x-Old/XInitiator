import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import { infoDialogReducer } from './infoDialog/infoDialogReducer';
import userReducer from './user/userReducer';

export default combineReducers({
    auth: authReducer,
    user: userReducer,
    dialog: infoDialogReducer
});