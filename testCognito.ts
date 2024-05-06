import dotenv from 'dotenv'
import path from 'path'
import AWS from 'aws-sdk'
import { CognitoUserPool, CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js'

dotenv.config({
  path: path.resolve(__dirname, '.env'),
})

AWS.config.update({ region: 'us-east-1' })

const poolData = {
  UserPoolId: process.env.PAYLOAD_CLOUD_COGNITO_USER_POOL_ID,
  ClientId: process.env.PAYLOAD_CLOUD_COGNITO_USER_POOL_CLIENT_ID,
}

const userPool = new CognitoUserPool(poolData)

const userData = {
  Username: process.env.PAYLOAD_CLOUD_PROJECT_ID,
  Pool: userPool,
}

const authenticationDetails = new AuthenticationDetails({
  Username: process.env.PAYLOAD_CLOUD_PROJECT_ID,
  Password: process.env.PAYLOAD_CLOUD_COGNITO_PASSWORD,
})

const cognitoUser = new CognitoUser(userData)

function authenticateUser() {
  return new Promise((resolve, reject) => {
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: result => {
        console.log('Authentication successful:', result.getAccessToken().getJwtToken())
        resolve(result)
      },
      onFailure: err => {
        console.error('Authentication failed:', err)
        reject(err)
      },
    })
  })
}

export default authenticateUser
