require('dotenv').config();
const {logger} = require('../utils/logger');
const productModel = require('../models/DB_associations').Product;
const userModel = require('../models/DB_associations').User;
const redis = require('redis');
const client = redis.createClient(6379);
const { addProduct } = require('../validation/product');

class Product {
    create = async (req, res, next) => {
        try{
            logger.info('Start create Product ---');
            const {error, value} = addProduct(req.body);
            if(error){
                logger.error(`validation Error -- ${error}`)
                return res.status(400).json({
                    message: error
                });
            };
            const product = await productModel.create({
                ...value,
                user_id: req.user.id
            });
            await product.save()
            return res.status(201).json({
                product
            });
        } catch (e) {
            logger.error(`Product create Error: ${e.message}`);
            next(e)
        }
    };
    getOne = async (req, res, next) => {
        try{
            logger.info('Start get Product ---');
            const {id} = req.params;
            client.get("key", (err, data) => {
                const clientValue = JSON.parse(data);
                async function getPriceInCache (){
                    const currency = Object.keys(req.query).toString();
                    let rate;
                    const product = await productModel.findOne({
                        where:{
                            id
                        },
                        include: [{
                            required:true,
                            model:userModel
                        }]
                    });
                    for (let i in clientValue){
                        if (i === currency || i === currency.toUpperCase()){
                            rate = {
                                iso: i,
                                rateVal: clientValue[i]
                            };
                            break
                        };
                    };
                    if (!rate){
                        return res.status(404).json({
                            message: 'Rate not found'
                        });
                    };
                    if (rate.rateVal === 0){
                        return res.status(201).json({
                            message: 'that exchange rate has not been determined'
                        });
                    };
                    product.worth = (product.worth / rate.rateVal).toFixed(2) + ' ' + rate.iso
                    return res.status(201).json({
                        product
                    });
                };
                getPriceInCache();
            });

        } catch (e) {
            logger.error(`Product Get Error: ${e.message}`);
            next(e)
        };
    };

    delete = async (req, res, next) => {
        try{
            let {id} = req.params;
            const product = await productModel.findByPk(id);
            if(!product){
                return res.status(404).json({
                    message: 'Product not found'
                })
            };
            if(product.user_id !== req.user.id){
                return res.status(406).json({
                    message: 'not acceptable'
                })
            };
            await product.destroy({
                where: {id}
            });
            return await res.status(200).json({
                message:'product deleted'
            });

        }catch (e) {
            logger.error(e.message)
            next(e)
        }
    };

    getAllProducts = async (req, res, next) => {
        const products = await productModel.findAll()
        return res.status(200).json(products)
    };

    update = async (req, res, next) => {
        try{
            logger.info('Start edit Product - - -');
            const { id } = req.params;
            const product = await productModel.findByPk(id);
            if(!product){
                return res.status(404).json({
                    message: 'Product not found'
                })
            };
            if(product.user_id !== req.user.id){
                return res.status(406).json({
                    message: 'not acceptable'
                })
            };
            await product.update(req.body, {
                where: {id}
            });
            await product.save()
            return await res.status(200).json({
                product
            });

        }catch (e) {
            console.log(e)
            next(e)
        }
    };
};

module.exports = new Product()