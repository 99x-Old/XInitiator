import { Reducer } from "redux";

const initialState = {
    isValidUser: true,
    user: {
        id: "",
        name: "",
        role: "Member",
        email: "",
        userType: ""
    }
}

const userReducer: Reducer<any, any> = (state = initialState, action: { type: any; payload: any }) => {
    switch (action.type) {
        case "GET_VALID_USER_STATE":
            return {
                ...state,
                isValidUser: action.payload
            };
        case "GET_USER":
            return {
                ...state,
                user: action.payload
            };
        case "CREATE_USER":
            return {
                ...state,
                user: action.payload,
                isValidUser: true
            };
        default:
            return state;
    }
}

export default userReducer;