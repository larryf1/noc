import * as msal from '@azure/msal-browser'

const msalConfig = {
  auth: {
    clientId: 'YOUR_AZURE_CLIENT_ID',
    authority: 'https://login.microsoftonline.com/YOUR_TENANT_ID',
    redirectUri: window.location.origin
  }
}

const msalInstance = new msal.PublicClientApplication(msalConfig)

export async function login() {
  try {
    await msalInstance.loginRedirect({
      scopes: ['openid', 'profile', 'email', 'User.Read']
    })
  } catch (e) {
    throw new Error('Azure login failed')
  }
}

export async function handleRedirect() {
  try {
    const response = await msalInstance.handleRedirectPromise()
    if (response) {
      localStorage.setItem('azure_id_token', response.idToken)
      localStorage.setItem('azure_account', JSON.stringify(response.account))
    }
  } catch (e) {
    // ...handle error...
  }
}

export function isAuthenticated() {
  return !!msalInstance.getAllAccounts().length
}

export function getUserInfo() {
  const account = msalInstance.getAllAccounts()[0]
  if (!account) return null
  // Example: extract partner IDs and roles from claims or groups
  // This is a placeholder; adapt to your Azure claims structure
  return {
    username: account.username,
    name: account.name,
    partnerIds: account.idTokenClaims?.partner_ids || [],
    roles: account.idTokenClaims?.roles || []
  }
}

export function logout() {
  msalInstance.logoutRedirect()
}
