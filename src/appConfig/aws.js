export const cognito = {
    "Auth": {
        "region": "eu-central-1",
        "identityPoolRegion": "eu-central-1",
        "userPoolId": "eu-central-1_KCQvBooug",
        "userPoolWebClientId": "759qmf9pb4te5k36abitl4g8qe",
        "mandatorySignIn": false,
        "authenticationFlowType": "USER_PASSWORD_AUTH",
        "oauth": {
            "domain": "https://chat-amplify.auth.eu-central-1.amazoncognito.com",
            "scope": ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
            "redirectSignIn": "http://localhost:3000/",
            "redirectSignOut": "http://localhost:3000/",
            "responseType": "token"
        }
    }
}
