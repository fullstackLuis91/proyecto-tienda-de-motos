const { Category,Sequelize } = require("../models/index")
const {Op} = Sequelize
const CategoryController = {

async create(req,res){
    try {
        const category = await Category.create(req.body)
        res.status(201).send({message: "category created",category})
    } catch (error) {
        res.status(500).send({ message: "there has been an error", error });
  
    }
},

async getAll(req, res) {
    try {
      const categories = await Category.findAll();
      res.status(200).send(categories);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving categories", error });
    }
  },
  async getById(req, res) {
    try {
      const category = await Category.findByPk(req.params.id);
      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }
      res.status(200).send(category);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving category", error });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, description } = req.body;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }
      await category.update({ name, description });
      res.status(200).send({ message: "Category updated", category });
    } catch (error) {
        console.error(error)
      res.status(500).send({ message: "Error updating category", error });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).send({ message: "Category not found" });
      }
      await category.destroy();
      res.status(200).send({ message: "Category deleted" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting category", error });
    }
  },
  async filterByName(req, res) {
    try {
      const { name } = req.query;
      const categories = await Category.findAll({
        where: {
            name: { 
                [Op.like]: `%${name}%`
            }
        }
      });
      res.status(200).send(categories);
    } catch (error) {
        console.error(error)
 
      res.status(500).send({ message: "Error filtering categories", error });
    }
  },
}







module.exports = CategoryController