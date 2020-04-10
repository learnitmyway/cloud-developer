export const apiEndpoint = `https://${process.env.apiKey}.execute-api.us-east-1.amazonaws.com/dev`

export const authConfig = {
  domain: process.env.domain,
  clientId: process.env.clientId,
  callbackUrl: 'http://localhost:3000/callback',
}
