import { CustomAuthorizerEvent, CustomAuthorizerResult } from 'aws-lambda'
import 'source-map-support/register'

import { verify } from 'jsonwebtoken'
import { JwtToken } from '../../auth/JwtToken'

const cert = `-----BEGIN CERTIFICATE-----
MIIDDTCCAfWgAwIBAgIJV7T4iOT8egP2MA0GCSqGSIb3DQEBCwUAMCQxIjAgBgNV
BAMTGWRldi16Zm4xbXR4My5ldS5hdXRoMC5jb20wHhcNMjAwNDEwMTMyMjI1WhcN
MzMxMjE4MTMyMjI1WjAkMSIwIAYDVQQDExlkZXYtemZuMW10eDMuZXUuYXV0aDAu
Y29tMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAyavJjyaOq4jDGgGW
M+RGddOT6dT7C8fiUMtPxCdjCl6Y5bCpKVe0o4sXood6DAtYIjBiJ3OLOWeU/6Kz
X2uoiYLhNeK8WFd4OYTv1htwdGDRGpZaiaRuIl3H6xnxNeNGlCec5t47maJA45gI
Pry/wcmDiTiACYX2kf6xOjK2FVw4TlhRigKyJpkJbnG3iEi6rUQQ3RYOQrhlM8am
f5o0yd+6Tg2AZKadgiKcYnyfPShi/IcWIorVJyW66onjFg73nWf+AYpHHh9P/LhV
+gyL74mUiQAUXHU4T6B7IVi+6FTaQJXTxJ8+uZ4sM9FKSenUcnV78kz0tiZSCHsX
sAGWgwIDAQABo0IwQDAPBgNVHRMBAf8EBTADAQH/MB0GA1UdDgQWBBTZwnHjtreL
cFXv4yxB4LqRARfH1DAOBgNVHQ8BAf8EBAMCAoQwDQYJKoZIhvcNAQELBQADggEB
ABxhEzrcBptm0K1Sa8DaXRv26Gm3GnsRxRyMFZTY63qUnoCs4pUSTgc0+FlXJ4ee
j0dGacCvTOXl0Inhw8xxahLLcCCfuTNa7txHYLKb0neAtuQliv2kAQeRCa8Yolbq
HCBjHoyhNP/vuYFZwb+SgSrX28IvVg6DvHZtnoAhYmUqk3r2mvdTewkuRapz8f5f
/VA3xBJrowWNWIEP+8G9Wkw7zTyolCQUS4V+fy05HAYBU3J7xJVzUxa99xEfFOCm
WHAngILdjb6ULwPGzvHLxCEXciGXMQk90caf1Ycn5GEHlWVnSqn1CYbruBdYVLsO
7P2BGQSFWEhgsS0V3E+E79M=
-----END CERTIFICATE-----`

export const handler = async (
  event: CustomAuthorizerEvent
): Promise<CustomAuthorizerResult> => {
  try {
    const jwtToken = verifyToken(event.authorizationToken)
    console.log('User was authorized', jwtToken)

    return {
      principalId: jwtToken.sub,
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Allow',
            Resource: '*',
          },
        ],
      },
    }
  } catch (e) {
    console.log('User authorized', e.message)

    return {
      principalId: 'user',
      policyDocument: {
        Version: '2012-10-17',
        Statement: [
          {
            Action: 'execute-api:Invoke',
            Effect: 'Deny',
            Resource: '*',
          },
        ],
      },
    }
  }
}

function verifyToken(authHeader: string): JwtToken {
  if (!authHeader) throw new Error('No authentication header')

  if (!authHeader.toLowerCase().startsWith('bearer '))
    throw new Error('Invalid authentication header')

  const split = authHeader.split(' ')
  const token = split[1]

  return verify(token, cert, { algorithms: ['RS256'] }) as JwtToken
}
