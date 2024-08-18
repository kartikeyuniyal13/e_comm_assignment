"use server";
import Cart from '@/app/models/Cart';
import { connectToDb } from '@/app/helper/db';

// Helper function to format cart items
const formatCartItems = (items) => items.map(item => ({
  productID: item.productID,
  name: item.name,
  imageUrl: item.imageUrl,
  price: item.price,
  quantity: item.quantity
}));

export async function createCart({ userId, items }) {
  try {
    await connectToDb();
    const newCart = await Cart.create({ userId, items });
    return { items: formatCartItems(newCart.items) };
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
}

export async function getCart(userId) {
  try {
    await connectToDb();
    const cart = await Cart.findOne({ userId }).lean();
    return cart ? { items: formatCartItems(cart.items) } : null;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw new Error('Could not fetch cart');
  }
}

export async function updateCart(userId, items) {
  try {
    await connectToDb();
    const updatedCart = await Cart.findOneAndUpdate(
      { userId },
      { $set: { items } },
      { new: true, upsert: true, lean: true }
    );
    return { items: formatCartItems(updatedCart.items) };
  } catch (error) {
    console.error("Error updating cart:", error);
    throw error;
  }
}

export async function getCartItems(userId) {
  try {
    await connectToDb();
    const cart = await Cart.findOne({ userId }).lean();
    if (!cart) {
      return { items: [] };
    }
    return { items: formatCartItems(cart.items) };
  } catch (error) {
    console.error("Error fetching cart item quantities:", error);
    throw new Error('Could not fetch cart item quantities');
  }
}

export async function increaseQuantity(userId, productID) {
  try {
    await connectToDb();
    const result = await Cart.findOneAndUpdate(
      { userId, 'items.productID': productID },
      { $inc: { 'items.$.quantity': 1 } },
      { new: true, lean: true }
    ).exec();

    if (result && result.items) {
      return { items: formatCartItems(result.items) };
    }
    return null;
  } catch (error) {
    console.error("Error increasing quantity:", error);
    throw error;
  }
}

export async function decreaseQuantity(userId, productID) {
  try {
    await connectToDb();
    const cart = await Cart.findOne({ userId }).lean();
    if (!cart) {
      throw new Error('Cart not found');
    }
    const item = cart.items.find(item => item.productID === productID);
    if (!item) {
      throw new Error('Item not found in cart');
    }

    const result = await Cart.findOneAndUpdate(
      { userId, 'items.productID': productID },
      { $inc: { 'items.$.quantity': -1 } },
      { new: true, lean: true }
    ).exec();
    if (result && result.items) {
      return { items: formatCartItems(result.items) };
    }

    return null;
  } catch (error) {
    console.error("Error decreasing quantity:", error);
    throw error;
  }
}

export async function removeFromCart(userId, productID) {
  try {
    await connectToDb();
    const result = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productID } } },
      { new: true, lean: true }
    ).exec();
    if (!result) {
      throw new Error('Product not found in cart or already removed');
    }
    return { items: formatCartItems(result.items) };
  } catch (error) {
    console.error('Failed to remove product from cart:', error);
    throw error;
  }
}

export async function clearCart(userId) {
  try {
    await connectToDb();
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } }
    );
    return { success: true };
  } catch (error) {
    console.error('Error clearing cart:', error);
    throw new Error('Failed to clear cart');
  }
};