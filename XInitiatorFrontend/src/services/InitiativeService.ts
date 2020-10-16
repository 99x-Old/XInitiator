import { sendRequest } from '../Api/api'
import { appSettings } from '../appSettings'

export type Initiative = {
    id: string,
    name: string,
    description: string
}

export const getAllInitiatives = () => new Promise<Initiative[]>((resolve, reject) => {

    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/Initiatives`).then(response => {
        var initiativeList: Initiative[] = [];

        response.forEach((element: any) => {
            var initiative: Initiative = {
                id: element.id,
                name: element.name,
                description: element.description
            };

            initiativeList.push(initiative);
        });

        resolve(initiativeList);
    }).catch((error) => reject(error));
})

export const saveNewInitiative = (data: any) =>
    sendRequest('POST', `${appSettings.xinitiatorApiUrl}/Initiatives`, data);

export const getInitiativeById = (id: string) => new Promise<Initiative>((resolve, reject) => {

    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/Initiatives/${id}`).then(response => {
        var initiative: Initiative = {
            id: response.id,
            name: response.name,
            description: response.description
        };
        resolve(initiative);
    }).catch((error) => reject(error));
})

export const editInitiative = (id: string, data: any) =>
    sendRequest('PUT', `${appSettings.xinitiatorApiUrl}/Initiatives/${id}`, data)

export const deleteInitiativeById = (id: string) =>
    sendRequest('DELETE', `${appSettings.xinitiatorApiUrl}/Initiatives/${id}`);

export const addNewInitiativeYear = (data: any) =>
    sendRequest('POST', `${appSettings.xinitiatorApiUrl}/InitiativeYear`, data);

export const getAllInitiativeYears = () =>
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/InitiativeYear`);

export const addNewInitiativeForYear = (data: any) =>
    sendRequest('POST', `${appSettings.xinitiatorApiUrl}/InitiativeByYear`, data);

export const getAllInitiativesForYear = (year: string) =>
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/InitiativeByYear/year/${year}`);

export const getInitiativeForYearById = (id: string) =>
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/InitiativeByYear/${id}`);

export const editLeadForInitiative = (data: any, id: string) =>
    sendRequest('PUT', `${appSettings.xinitiatorApiUrl}/InitiativeByYear/${id}`, data);

export const deleteInitiativeForYear = (id: string) =>
    sendRequest('DELETE', `${appSettings.xinitiatorApiUrl}/InitiativeByYear/${id}`);

export const getMembersInInitiative = (id: string) =>
    sendRequest('GET', `${appSettings.xinitiatorApiUrl}/Membership/initiative/${id}`); 

export const addMembersListToInitiative = (initiativeId: string, memberList: any[]) => new Promise<Initiative>((resolve, reject) => {

    var members: string[] = [];
    memberList.forEach((member) => {
        members.push(member.value);
    });

    var body = {
        initiativeId: initiativeId,
        members: members
    };

    sendRequest('POST', `${appSettings.xinitiatorApiUrl}/Membership`, JSON.stringify(body))
        .then(response => resolve(response))
        .catch(error => reject(error));
});

export const removeMemberFromInitiative = (initiativeId: string, userId: string) => 
    sendRequest('DELETE', `${appSettings.xinitiatorApiUrl}/Membership/initiative/${initiativeId}/user/${userId}`);