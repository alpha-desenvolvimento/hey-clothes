let user = require('../database/models/User')
let ServiceResponse = require('../classes/ServiceResponse')

class UserController {
    async findAll(req,res){
        const response = new ServiceResponse("API USERS FINDALL")
        let users = await user.findAll()

        if (users == undefined) {
            response.setError("Users not Found")
            res.status(404)
            res.json(response)
        } else {
            response.setData({users: users})
            res.status(200)
            res.json(response)
        }
       
        
    }
}

module.exports = new UserController();