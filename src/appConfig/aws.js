export const cognito = {
    "Auth": {
        "region": "eu-central-1",
        "identityPoolRegion": "eu-central-1",
        "userPoolId": "eu-central-1_N0OAB6YsD",
        "userPoolWebClientId": "1i3iqgppta75k5th9rivh5l36f",
        "mandatorySignIn": false,
        "authenticationFlowType": "USER_PASSWORD_AUTH",
        "oauth": {
            "domain": "chat-amplify.auth.eu-central-1.amazoncognito.com",
            "scope": ["phone", "email", "profile", "openid", "aws.cognito.signin.user.admin"],
            "redirectSignIn": "https://chat313.herokuapp.com/sign-in",
            "redirectSignOut": "https://chat313.herokuapp.com/sign-in",
            "responseType": "token"
        }
    }
}
