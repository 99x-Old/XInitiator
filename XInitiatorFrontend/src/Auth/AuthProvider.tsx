import { MsalAuthProvider, LoginType } from 'react-aad-msal';
import {appSettings} from '../appSettings'

const config = {
    auth: {
        authority: `https://login.microsoftonline.com/${appSettings.xinitiatorAzureADTenant}`,
        clientId: `${appSettings.azureADFrontendClientId}`,
        redirectUri: window.location.origin,
        navigateToLoginRequestUrl: true
    },
    cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true
    }
};

export const authenticationParameters = {
    scopes: [
        `${appSettings.azureADAPIScopeUri}`, "user.read"
    ]
}

const options = {
    loginType: LoginType.Redirect,
    tokenRefreshUri: window.location.origin
}

export const authProvider = new MsalAuthProvider(config as any, authenticationParameters, options)