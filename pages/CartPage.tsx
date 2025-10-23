
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { CartItem as CartItemType } from '../types';

const CartItem: React.FC<{ item: CartItemType }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    
    return (
        <div className="flex items-center gap-4 py-4 border-b">
            <img src={item.images[0]} alt={item.title} className="w-24 h-24 object-cover rounded-md"/>
            <div className="flex-grow">
                <Link to={`/product/${item.slug}`} className="font-semibold hover:underline">{item.title}</Link>
                <p className="text-sm text-gray-500">{item.category}</p>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-sm hover:underline mt-1">Remove</button>
            </div>
            <div className="flex items-center border rounded-md h-10">
                <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 h-full hover:bg-gray-100">-</button>
                <span className="px-4">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 h-full hover:bg-gray-100">+</button>
            </div>
            <div className="w-24 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    )
}

const CartPage: React.FC = () => {
  const { cartItems, cartTotal, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold">Your Shopping Cart</h1>
        <p className="mt-2 text-gray-600">You have {cartCount} item(s) in your cart.</p>
      </div>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            {cartItems.map(item => <CartItem key={item.id} item={item} />)}
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
              <h2 className="text-2xl font-semibold border-b pb-4">Order Summary</h2>
              <div className="space-y-4 py-4">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className="text-gray-500">Calculated at checkout</span>
                </div>
              </div>
              <div className="border-t pt-4 flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Link to="/checkout" className="block mt-6">
                <Button size="lg" className="w-full">Proceed to Checkout</Button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-20">
          <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4"></i>
          <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-500 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link to="/shop">
            <Button size="lg">Continue Shopping</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
