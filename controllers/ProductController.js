const { Product, Sequelize, Category, User } = require("../models/index");
const { Op } = Sequelize;

const ProductController = {
  async create(req, res) {
    try {
      const product = await Product.create(req.body);
      res.status(201).send({ message: "Product created", product });
    } catch (error) {
      res.status(500).send({ message: "There has been an error", error });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const { name, price } = req.body;
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      await product.update({ name, price });
      res.status(200).send({ message: "Product updated", product });
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error updating product", error });
    }
  },

  async delete(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findByPk(id)
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      await product.destroy();
      res.status(200).send({ message: "Product deleted" });
    } catch (error) {
      res.status(500).send({ message: "Error deleting product", error });
    }
  },

  async getById(req, res) {
    try {
      const product = await Product.findByPk(req.params.id);
      if (!product) {
        return res.status(404).send({ message: "Product not found" });
      }
      res.status(200).send(product);
    } catch (error) {
      res.status(500).send({ message: "Error retrieving product", error });
    }
  },

  async getByName(req, res) {
    try {
      const products = await Product.findAll({
        where: {
          title: {
            [Op.like]: `%${req.params.name}%`, // Filtra por nombre (title)
          },
        },
      });
      if (products.length === 0) {
        return res.status(404).send({ message: "No products found with this name" });
      }
      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "There has been an error", error });
    }
  },

  async getByPrice(req, res) {
    try {
      const { minPrice, maxPrice } = req.query; // Parámetros de precio en la URL

      if (!minPrice || !maxPrice) {
        return res.status(400).send({ message: "Both minPrice and maxPrice are required" });
      }

      const products = await Product.findAll({
        where: {
          price: {
            [Op.between]: [parseFloat(minPrice), parseFloat(maxPrice)], // Filtro entre precios
          },
        },
        order: [['price', 'DESC']], // Ordenar de mayor a menor precio
      });

      if (products.length === 0) {
        return res.status(404).send({ message: "No products found in this price range" });
      }

      res.status(200).send(products);
    } catch (error) {
      console.error(error);
      res.status(500).send({ message: "Error retrieving products by price", error });
    }
  },
};

module.exports = ProductController;

