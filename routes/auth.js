const ServiceResponse = require("../classes/ServiceResponse"), jwt = require("../jwt");



async function authUser(req) {
    // console.clear()
    const response = new ServiceResponse("auth.user");
    const user = req.body.user || req.headers["x-access-user"];
    const pwd = req.body.pwd || req.headers["x-access-pwd"];

    const data = await jwt.authUser({ user, pwd });

    if (data.error) {
        response.setError(data.error);
    } else {
        console.log('data',data);
        delete data.error;
        response.setData(data);
    }

    return response;
}

async function authToken(req) {
    const response = new ServiceResponse("auth.token");

    const data = await jwt.authToken(req.headers["x-access-token"] || req.body.token);

    console.log('data', data);

    if (data.error) {
        response.setError(data.error);
    } else {
        response.setData(data);
    }

    return response;
}


module.exports = {
    user: authUser,
    token: authToken
}