
import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { Button } from '../ui/Button';
import { Skeleton } from '../ui/Skeleton';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    // You could add a toast notification here
  };

  return (
    <Link to={`/product/${product.slug}`} className="group block bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:-translate-y-1 hover:shadow-xl duration-300">
      <div className="relative pt-[100%] overflow-hidden">
        <img 
          src={product.images[0]} 
          alt={product.title} 
          className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-serif font-semibold text-brand-text truncate">{product.title}</h3>
        <p className="text-sm text-gray-500 mt-1 h-10">{product.shortDescription}</p>
        <div className="flex justify-between items-center mt-4">
          <p className="text-xl font-bold text-brand-primary">{product.currency}${product.price.toFixed(2)}</p>
          <Button onClick={handleAddToCart} size="sm" variant="secondary">
            <i className="fas fa-shopping-cart mr-2"></i> Add
          </Button>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton: React.FC = () => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <Skeleton className="pt-[100%]" />
            <div className="p-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-10 w-full mb-4" />
                <div className="flex justify-between items-center">
                    <Skeleton className="h-8 w-1/4" />
                    <Skeleton className="h-10 w-1/3" />
                </div>
            </div>
        </div>
    );
};
