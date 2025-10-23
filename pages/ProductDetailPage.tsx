
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { productService } from '../services/productService';
import { Product } from '../types';
import { Button } from '../components/ui/Button';
import { useCart } from '../context/CartContext';
import { ProductCard, ProductCardSkeleton } from '../components/product/ProductCard';
import { Skeleton } from '../components/ui/Skeleton';

const ProductDetailSkeleton: React.FC = () => (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
                <Skeleton className="w-full aspect-square rounded-lg" />
                <div className="flex gap-4 mt-4">
                    <Skeleton className="w-24 h-24 rounded" />
                    <Skeleton className="w-24 h-24 rounded" />
                    <Skeleton className="w-24 h-24 rounded" />
                </div>
            </div>
            <div className="space-y-6">
                <Skeleton className="h-12 w-3/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-6 w-1/2" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-12 w-28" />
                    <Skeleton className="h-12 w-40" />
                </div>
            </div>
        </div>
    </div>
);


const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string>('');

  useEffect(() => {
    const fetchProduct = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const fetchedProduct = await productService.getProductBySlug(slug);
        if (fetchedProduct) {
          setProduct(fetchedProduct);
          setMainImage(fetchedProduct.images[0]);
          const related = await productService.getRelatedProducts(slug);
          setRelatedProducts(related);
        }
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [slug]);

  if (loading) {
    return <ProductDetailSkeleton />;
  }

  if (!product) {
    return <div className="text-center py-20">Product not found.</div>;
  }
  
  const handleQuantityChange = (amount: number) => {
    setQuantity(prev => Math.max(1, prev + amount));
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
    // You could show a success message here
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image Gallery */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4 shadow-lg">
            <img src={mainImage} alt={product.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex gap-4">
            {product.images.map((img, index) => (
              <button
                key={index}
                onClick={() => setMainImage(img)}
                className={`w-24 h-24 rounded overflow-hidden border-2 transition ${mainImage === img ? 'border-brand-primary' : 'border-transparent'}`}
              >
                <img src={img} alt={`${product.title} thumbnail ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="py-4">
          <h1 className="text-4xl font-serif font-bold text-brand-text">{product.title}</h1>
          <p className="text-3xl font-semibold text-brand-primary mt-2">{product.currency}${product.price.toFixed(2)}</p>
          <div className="flex items-center my-4">
            <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => <i key={i} className={`fa-star ${i < Math.round(product.rating) ? 'fas' : 'far'}`}></i>)}
            </div>
            <span className="text-gray-600 ml-2">({product.rating.toFixed(1)})</span>
          </div>
          <p className="text-gray-600 leading-relaxed mt-4">{product.description}</p>
          
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Materials:</h3>
            <div className="flex flex-wrap gap-2">
                {product.materials.map(mat => <span key={mat} className="bg-brand-secondary/70 text-brand-text text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full">{mat}</span>)}
            </div>
          </div>

          <div className="mt-8 flex items-center gap-4">
            <div className="flex items-center border rounded-md">
              <button onClick={() => handleQuantityChange(-1)} className="px-4 py-2 hover:bg-gray-100">-</button>
              <span className="px-4 py-2">{quantity}</span>
              <button onClick={() => handleQuantityChange(1)} className="px-4 py-2 hover:bg-gray-100">+</button>
            </div>
            <Button onClick={handleAddToCart} size="lg">Add to Cart</Button>
          </div>
        </div>
      </div>
      
      {/* Related Products */}
      <div className="mt-20">
        <h2 className="text-3xl font-serif font-bold text-center mb-8">You Might Also Like</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.length > 0 
                ? relatedProducts.map(p => <ProductCard key={p.id} product={p} />)
                : Array.from({length: 4}).map((_, i) => <ProductCardSkeleton key={i} />)
            }
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
