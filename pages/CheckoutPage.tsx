
import React from 'react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { Link, useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger payment processing (e.g., Razorpay)
    // and then on success, save the order to a database.
    console.log("Placing order...");
    alert("Order placed successfully! (This is a mock action)");
    clearCart();
    navigate('/order-tracking'); // Redirect to a success/tracking page
  };

  if (cartItems.length === 0) {
    return (
        <div className="container mx-auto text-center py-20">
             <h1 className="text-2xl font-semibold mb-4">Your cart is empty.</h1>
             <Link to="/shop"><Button>Go Shopping</Button></Link>
        </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-center mb-12">Checkout</h1>
      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Shipping & Billing Info */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Shipping Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
              <input type="text" id="firstName" name="firstName" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input type="text" id="lastName" name="lastName" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input type="text" id="address" name="address" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <input type="text" id="city" name="city" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal Code</label>
              <input type="text" id="zip" name="zip" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
             <div className="sm:col-span-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary" />
            </div>
          </div>
          {/* Payment Method section would go here */}
           <h2 className="text-2xl font-semibold mt-10 mb-6">Payment Method</h2>
           <p className="text-gray-600">Razorpay integration would be here. Clicking "Place Order" simulates the process.</p>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm sticky top-24">
            <h2 className="text-2xl font-semibold border-b pb-4 mb-4">Your Order</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex justify-between items-start gap-3">
                    <img src={item.images[0]} alt={item.title} className="w-16 h-16 object-cover rounded"/>
                    <div className="flex-grow">
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4 space-y-2">
                <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                </div>
                 <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$5.00</span>
                </div>
                 <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                    <span>Total</span>
                    <span>${(cartTotal + 5.00).toFixed(2)}</span>
                </div>
            </div>
            <Button size="lg" className="w-full mt-6" type="submit">Place Order</Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;
