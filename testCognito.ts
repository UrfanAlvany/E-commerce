import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
})

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const AWS = require('aws-sdk');

// Set AWS region
AWS.config.update({ region: 'us-east-1' });

// Cognito Pool Data
const poolData = {
  UserPoolId: 'us-east-1_ZlgAHNcUT', // From your provided details
  ClientId: '41g336qas28e09l2t4aem4g8a4' // From your provided details
};

// Create User Pool
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);

// Assuming you have confirmed this username exists in your Cognito user pool
const username = '6636733ace3ad909894a3d86';  // The Cognito Username you provided
console.log("Using Password:", process.env.PAYLOAD_CLOUD_COGNITO_PASSWORD);  // Remove after testing


// User data and authentication details
const userData = {
  Username: username,
  Pool: userPool
};
const authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
  Username: username,
  Password: process.env.PAYLOAD_CLOUD_COGNITO_PASSWORD // Make sure this is correctly set in your .env file
});
const cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);

// Attempt to authenticate
cognitoUser.authenticateUser(authenticationDetails, {
  onSuccess: function (result) {
    console.log('Authentication successful:', result.getAccessToken().getJwtToken());

  },
  onFailure: function (err) {
    console.error('Authentication failed:', err);
    console.log('Error details:', err.message, '| Code:', err.code);
  }
});
