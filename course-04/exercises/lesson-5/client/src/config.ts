export const apiEndpoint = process.env.endpoint

export const authConfig = {
  domain: process.env.domain,
  clientId: process.env.clientId,
  callbackUrl: 'http://localhost:3000/callback',
}
