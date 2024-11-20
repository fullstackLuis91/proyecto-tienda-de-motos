const { User } = require("../models/index")
const bcrypt = require("bcryptjs") //importar bcrypt




const UserController = {
    async create(req,res){
        try{
            req.body.password = await bcrypt.hash (req.body.password,10)//para modificar la password e incriptarla

            const user = await User.create(req.body)
            res.status(201).send({message:"user created successfully",user})

        }catch (error) {
            console.error(error)
            res.status(500).send({message:"there was a problem",error})

        }
    },

    async login (req,res){       //para crear el login
        
        const user = await User.findOne({     //para comprobar que el usuario existe mediante la comprobacion de su correo, es decir "user".
            where:{
                email:req.body.email // si el correo esta bien pasa al codigo de password
            }
        })
        if(!user){
            return res.status(400).send({message:"incorrect email or password"}) //esto lanza si no es correcto el correo
        } 
        const itsMatch = await bcrypt.compare(req.body.password,user.password)  // aqui compara que la contraseña introducida sea igual que la contraseña encriptada
        
        if (!itsMatch) {

            return res.status(400).send({message:"incorrect email or password"}) // si no es correcta lanza este error
        }

        res.send({message:"succesfully logged", user}) // si es correcta lanza eso

    }

}

module.exports = UserController