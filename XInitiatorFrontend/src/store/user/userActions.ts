import { addNewUserFromAuth, getUser, isValidUser, User } from "../../services/userService"

export const checkUserValid = (email: string) => (dispatch: any) => {
    isValidUser(email).then(isValid => 
        dispatch({
            type: "GET_VALID_USER_STATE",
            payload: isValid
        }))
}

export const addNewUser = (userObj: any) => (dispatch: any) => {
    addNewUserFromAuth(userObj).then((response: any) => {
        var user: User = {
            id: response.id,
            name: response.name,
            role: response.role,
            email: response.email,
            userType: response.userType,
            status: response.isActive
        }
        dispatch({
            type: "CREATE_USER",
            payload: user
        });
    })
}

export const getUserByEmail = (email: string) => (dispatch: any) => {
    getUser(email).then((response: any) => {
        var user: User = {
            id: response.id,
            name: response.name,
            role: response.role,
            email: response.email,
            userType: response.userType,
            status: response.isActive
        }
        dispatch({
            type: "GET_USER",
            payload: user,
        });
    })
}