const CartModel = require("../../models/cart/cartModel")

class CartController {
    async createCart(req,res){
        try{
           let createCart = await CartModel.create(req.body)
           res.status(200).send({
             success: true,
             message: "Created Cart Successfully",
             data: createCart
           })
        }catch(error){
            res.status(500).send({
                error: true,
                message: error.message
            })
        }
    }
    async listAllCart(req,res){
        try{
            let query = {isDeleted:false}
            let queryCart = await CartModel.find(query)
            res.status(200).send({
              success: true,
              data: queryCart
            })
         }catch(error){
             res.status(500).send({
                 error: true,
                 message: error.message
             })
         }
    }
    async getCartByUserId(req,res){
        try{
            let query = {isDeleted:false}
            query["relatedUser"] = req.params.id
            let queryCartById = await CartModel.findOne(query)
            res.status(200).send({
              success: true,
              data: queryCartById
            })
         }catch(error){
             res.status(500).send({
                 error: true,
                 message: error.message
             })
         }
    }
    async updateCartByUserId(req,res){
        try{
            let query = {isDeleted:false}
            query["relatedUser"] = req.params.id
            let updateCartById = await CartModel.findOneAndUpdate(query,req.body,{new: true})
            res.status(200).send({
              success: true,
              message: "Updated Successfully",
              data: updateCartById
            })
         }catch(error){
             res.status(500).send({
                 error: true,
                 message: error.message
             })
         }
    }
    async removeItemsFromCartById(req,res){
        try{
            let {removeItems} = req.body
            let updateAndRemoveItemsFromCartById = await CartModel.findByIdAndUpdate(req.params.id,
                {
                    $pull:{
                        "treatments":{
                            "_id": {
                                $in: removeItems
                            }
                        }
                    }
            },{new: true}
            )
            res.status(200).send({
              success: true,
              message: "Removed Items Successfully",
              data: updateAndRemoveItemsFromCartById
            })
         }catch(error){
             res.status(500).send({
                 error: true,
                 message: error.message
             })
         }
    }

}

module.exports = CartController