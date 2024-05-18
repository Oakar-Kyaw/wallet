const Cart = require("../../controllers/cart/cartController")
module.exports = (app)=>{
    const CartController = new Cart()
    app.route("/api/v1/carts")
       .post(CartController.createCart)
       .get(CartController.listAllCart)

    app.route("/api/v1/cart/:id")
       .get(CartController.getCartByUserId)
       .put(CartController.updateCartByUserId)

    app.route("/api/v1/cart/remove-items/:id")
       .put(CartController.removeItemsFromCartById)
}