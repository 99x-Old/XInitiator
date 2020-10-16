import { sendRequest } from '../Api/api'
import { appSettings } from '../appSettings'

export type User = {
    id: string;
    name: string;
    email: string;
    role: string;
    userType: string;
    status: boolean;
}

export const getAllUsers = () => new Promise<User[]>((resolve, reject) => {
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/User`).then(users => {
        var userList: User[] = [];
        users.forEach((element: any) => {
            var user: User = {
                id: element.id,
                name: element.name,
                email: element.email,
                role: element.role,
                userType: element.userType,
                status: element.isActive
            }

            userList.push(user);
        })

        resolve(userList);
    }).catch(err => reject(err))
});

export const getUser = (username: string) => new Promise((resolve, reject) => {
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/User/${username}`).then(u => {
        var user: User = {
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            userType: u.userType,
            status: u.isActive
        };
        resolve(user);
    }).catch(err => reject(err))
})

export const getUserById = (userId: string) => new Promise((resolve, reject) => {
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/User/userById/${userId}`).then(u => {
        var user: User = {
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            userType: u.userType,
            status: u.isActive
        };
        resolve(user);
    }).catch(err => reject(err))
})

export const isValidUser = (username: string) => new Promise((resolve, reject) => {
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/User/isUser/${username}`).then(isValid => {
        resolve(isValid);
    }).catch(err => reject(err))
})

export const addNewUserFromAuth = (body: any) => new Promise((resolve, reject) => {
    sendRequest('POST', `${appSettings.xinitiatorApiUrl}/User`, body).then(user => {
        resolve(user)
    }).catch(err => reject(err))
})

export const getAllUsersWithInactives = () => new Promise((resolve, reject) => {
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/User/get`).then(users => {
        var userList: User[] = [];
        users.forEach((element: any) => {
            var user: User = {
                id: element.id,
                name: element.name,
                email: element.email,
                role: element.role,
                userType: element.userType,
                status: element.isActive
            }

            userList.push(user);
        })

        resolve(userList);
    }).catch(err => reject(err))
})

export const changeUserStatus = (email: string) => new Promise((resolve, reject) => {
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/User/changeStatus/${email}`).then(status => {
        resolve(status);
    }).catch(err => reject(err))
})

export const saveUserChanges = (userId: string, body: any) => new Promise((resolve, reject) => {
    sendRequest('PUT', `${appSettings.xinitiatorApiUrl}/User/${userId}`, body).then(user => {
        resolve(user);
    }).catch(err => reject(err))
})

export const getFullUserById = (userId: string) => new Promise((resolve, reject) => {
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/User/userById/${userId}`).then(user => {
        resolve(user);
    }).catch(err => reject(err))
})
