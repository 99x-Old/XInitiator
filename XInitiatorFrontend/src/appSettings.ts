export const getSetting = (key: string): string => {
    const value: string | null = process.env[key] || null;
    if (value === null) console.error('Missing config key', key);
    return value || '';
};


export const appSettings = {
    xinitiatorApiUrl: getSetting('REACT_APP_XINITIATOR_API_URL'),
    xinitiatorAzureADTenant: getSetting('REACT_APP_AZUREAD_XINITIATOR_TENANT'),
    azureADFrontendClientId: getSetting('REACT_APP_AZUREAD_FRONTEND_CLIENT_ID'),
    azureADAPIScopeUri: getSetting('REACT_APP_AZUREAD_API_SCOPE'),
};