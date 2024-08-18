import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  userId: {
    type: String, 
    required: true,
  },
  items: [{
    productID: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
  }],
});

const Cart = mongoose.models?.Cart||mongoose.model('Cart', cartSchema);
export default Cart;