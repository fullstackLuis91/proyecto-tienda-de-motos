const { Order,Product } = require("../models/index")

const OrderController = {
async create(req,res){
    try {
        const order = await Order.create(req.body)
        res.status(201).send({message: "Order created",category})
    } catch (error) {
        res.status(500).send({ message: "there has been an error", error });
  
    }
},
async getAll(req, res) {
    try {
      const orders = await Order.findAll({
        include: {
          model: Product,
          attributes: ["name", "price"],
          through: {attributes: [] }
        },
      });
      res.status(200).send(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Ha habido un error", error });
    }
  }
}
module.exports = OrderController