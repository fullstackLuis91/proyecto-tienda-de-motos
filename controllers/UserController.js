const { User } = require("../models/index")

const UserController = {
    async create(req,res){
        try{
            const user = await User.create(req.body)
            res.status(201).send({message:"user created successfully",user})

        }catch (error) {
            console.error(error)
            res.status(500).send({message:"there was a problem",error})

        }
    }

}

module.exports = UserController