const { User,Sequelize,Product,Order, Token } = require("../models/index") //linea de codigo para importar los modelos
const bcrypt = require("bcryptjs") //importar bcrypt
const jwt = require("jsonwebtoken") //importar jwebtoken
const {jwt_secret} = require("../config/config.json")["development"] //nos importamos la clave secreta




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

        let token = jwt.sign({id:user.id}, jwt_secret) //creamos el token justo despues de que las credenciales sean correctas, el token se guarada en la variable token
        await Token.create({token, UserId: user.id}) //guarda el token en la tabla token de workbench y vinculamos ese token al usuario que se este logenado


        res.send({token, message: "succesfully logged", user}) // si es correcta lanza ese mensaje y tambien nos devuelve el token

    },

    async logout (req,res) {
        try {
            await Token.destroy({
                where: {
                    [Op.and]: [
                        { UserId: req.user.id },
                        { token: req.headers.authorization }
                    ]
                }
            });
            res.send({ message: 'Desconectado con éxito' })
        } catch (error) {
            console.log(error)
            res.status(500).send({ message: 'hubo un problema al tratar de desconectarte' })
    }

},
async getUserInfoLogged(req,res){
    const user= await User.getByPk(req.user.id,{
        include: [{
            model:Order,
            include:[{
                model:Product
            }]
        }]

    })
    res.send(user)
}
}

module.exports = UserController