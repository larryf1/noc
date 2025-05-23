import * as msal from '@azure/msal-browser'

const isLocal = window.location.hostname === 'localhost'

const msalConfig = {
  auth: {
    clientId: isLocal ? 'local-dev-client-id' : 'YOUR_AZURE_CLIENT_ID',
    authority: isLocal
      ? 'http://localhost'
      : 'https://login.microsoftonline.com/YOUR_TENANT_ID',
    redirectUri: window.location.origin
  }
}

const msalInstance = isLocal ? null : new msal.PublicClientApplication(msalConfig)

const MOCK_USER = {
  username: localStorage.getItem('mock_sso_username') || 'localuser@example.com',
  name: 'Local Dev User',
  partnerIds: ['partner1', 'partner2'],
  roles: ['admin', 'user'],
  scopes: ['openid', 'profile', 'email', 'User.Read']
}

export async function login() {
  if (isLocal) {
    // Prompt handled in LoginPage.vue, just return
    return
  }
  try {
    await msalInstance.loginRedirect({
      scopes: ['openid', 'profile', 'email', 'User.Read']
    })
  } catch (e) {
    throw new Error('Azure login failed')
  }
}

export async function handleRedirect() {
  if (isLocal) return
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
  if (isLocal) {
    return !!localStorage.getItem('mock_sso')
  }
  return !!msalInstance.getAllAccounts().length
}

export function getUserInfo() {
  if (isLocal) {
    // Always get the latest username from localStorage if present
    return {
      ...MOCK_USER,
      username: localStorage.getItem('mock_sso_username') || MOCK_USER.username
    }
  }
  const account = msalInstance.getAllAccounts()[0]
  if (!account) return null
  // TODO: Example: extract partner IDs and roles from claims or groups
  // This is a placeholder; adapt to your Azure claims structure
  return {
    username: account.username,
    name: account.name,
    partnerIds: account.idTokenClaims?.partner_ids || [],
    roles: account.idTokenClaims?.roles || [],
    scopes: ['openid', 'profile', 'email', 'User.Read']
  }
}

export function logout() {
  if (isLocal) {
    localStorage.removeItem('mock_sso')
    localStorage.removeItem('mock_sso_username')
    return
  }
  msalInstance.logoutRedirect()
}
