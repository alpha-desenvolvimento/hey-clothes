let Product = require('../database/models/Product')
let ProductCategory = require('../database/models/ProductCategory');
let ServiceResponse = require('../classes/ServiceResponse');
const { Sequelize } = require('sequelize');



class ProductController {

    async findAll(req, res) {

        const response = new ServiceResponse("API PRODUCTS FINDALL")
        let page = req.params.num
        let offset = 0

        if (isNaN(page) || page == 1) {
            offset = 0;
          } else {
            offset = (parseInt(page) - 1) * 10;
          }

        let products = await ProductListed.findAndCountAll({
            limit: 10,
            offset: offset,
            order: [["id", "ASC"]],
        })

        let next;
        if (offset + 5 >= products.count) {
            next = false;
        } else {
            next = true;
        }

        let result = {
            page: parseInt(page),
            next: next,
            products: products
        }

        let categories = await ProductCategory.findAll()


        if (products == undefined) {
            response.setError("Products not Found")
            res.status(404)
            res.json(response)
        } else {

            response.setData({result: result})
            res.status(200)
            res.json(response)
        }

    }
}

module.exports = new ProductController;