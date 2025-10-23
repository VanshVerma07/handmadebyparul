
import React, { useState } from 'react';
import { Button } from '../components/ui/Button';

type OrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled' | null;

const OrderTrackingPage: React.FC = () => {
  const [orderId, setOrderId] = useState('');
  const [email, setEmail] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrderStatus(null);

    // Mock API call
    setTimeout(() => {
      if (orderId === '12345' && email === 'test@example.com') {
        const statuses: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];
        const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
        setOrderStatus(randomStatus);
      } else {
        setError('Order not found. Please check your details.');
      }
      setLoading(false);
    }, 1500);
  };

  const statusSteps: OrderStatus[] = ['Pending', 'Processing', 'Shipped', 'Delivered'];
  const currentStepIndex = orderStatus ? statusSteps.indexOf(orderStatus) : -1;

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-serif font-bold">Track Your Order</h1>
        <p className="mt-4 text-gray-600">Enter your order ID and email to see the status of your purchase.</p>
      </div>

      <div className="max-w-md mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
        <form onSubmit={handleTrackOrder} className="space-y-6">
          <div>
            <label htmlFor="orderId" className="block text-sm font-medium text-gray-700">Order ID</label>
            <input
              type="text"
              id="orderId"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              placeholder="e.g., 12345"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g., test@example.com"
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-brand-primary focus:border-brand-primary"
            />
          </div>
          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? 'Tracking...' : 'Track Order'}
          </Button>
        </form>
      </div>
      
      {error && <p className="text-center mt-6 text-red-500">{error}</p>}

      {orderStatus && (
        <div className="max-w-4xl mx-auto mt-12">
            <h2 className="text-2xl font-semibold text-center mb-8">Order Status: <span className="text-brand-primary">{orderStatus}</span></h2>
             <div className="flex justify-between items-center">
                {statusSteps.map((step, index) => (
                    <React.Fragment key={step}>
                         <div className="flex flex-col items-center text-center">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${index <= currentStepIndex ? 'bg-brand-primary border-brand-primary text-white' : 'bg-gray-200 border-gray-300'}`}>
                                {index < currentStepIndex ? <i className="fas fa-check"></i> : index + 1}
                            </div>
                            <p className={`mt-2 font-semibold ${index <= currentStepIndex ? 'text-brand-primary' : 'text-gray-500'}`}>{step}</p>
                        </div>
                        {index < statusSteps.length - 1 && <div className={`flex-1 h-1 mx-2 ${index < currentStepIndex ? 'bg-brand-primary' : 'bg-gray-300'}`}></div>}
                    </React.Fragment>
                ))}
            </div>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
