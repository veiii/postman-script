//refresh token script
pm.sendRequest({
    url: pm.environment.get('keycloakHost')+"/auth/realms/"+pm.environment.get('realm')+"/protocol/openid-connect/token",
    method: 'POST',
    header: {
       'Content-Type': "application/x-www-form-urlencoded"
    },
    body: {
        mode: 'urlencoded',
        urlencoded: [
            {key: "client_id", value: pm.environment.get('client_id'), disabled: false, description: {content:"", type:"text/plain"}},
            {key: "client_secret", value: pm.environment.get('client_secret') , disabled: false, description: {content:"", type:"text/plain"}},
            {key: "grant_type", value: "refresh_token" , disabled: false, description: {content:"", type:"text/plain"}},
            {key: "refresh_token", value: pm.environment.get('refresh_token') , disabled: false, description: {content:"", type:"text/plain"}}
        ]
    },
}, function (err, res) {
    postman.setEnvironmentVariable('access_token', res.json().access_token)
    postman.setEnvironmentVariable('refresh_token', res.json().refresh_token)
});


//save token to enviroment variable (first login)
var jsonData = JSON.parse(responseBody)
postman.setEnvironmentVariable('access_token', jsonData.access_token)
postman.setEnvironmentVariable('refresh_token', jsonData.refresh_token)
