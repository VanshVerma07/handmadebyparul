
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ProductCard, ProductCardSkeleton } from '../components/product/ProductCard';
import { productService } from '../services/productService';
import { Product } from '../types';

const Hero = () => (
  <div className="bg-brand-highlight/20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
      <h1 className="text-4xl md:text-6xl font-serif font-bold text-brand-text animate-fade-in-down">
        Handmade with Love by Parul
      </h1>
      <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto animate-fade-in-up">
        Discover unique, handcrafted pieces that tell a story. Each item is crafted with passion and meticulous attention to detail.
      </p>
      <div className="mt-8 animate-fade-in-up animation-delay-300">
        <Link to="/shop">
          <Button size="lg" variant="primary">Shop Now</Button>
        </Link>
      </div>
    </div>
  </div>
);

const FeaturedProducts = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const featured = await productService.getFeaturedProducts();
                setProducts(featured);
            } catch (error) {
                console.error("Failed to fetch featured products", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="py-16">
            <h2 className="text-3xl font-serif font-bold text-center mb-8">Featured Products</h2>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {loading ? (
                        Array.from({ length: 4 }).map((_, index) => <ProductCardSkeleton key={index} />)
                    ) : (
                        products.map(product => <ProductCard key={product.id} product={product} />)
                    )}
                </div>
            </div>
        </div>
    );
};

const CategoriesPreview = () => {
    const categories = [
        { name: 'Paintings', icon: 'fa-paint-brush', color: 'bg-brand-blue' },
        { name: 'Jewelry', icon: 'fa-gem', color: 'bg-brand-highlight' },
        { name: 'Keychains', icon: 'fa-key', color: 'bg-brand-primary' },
        { name: 'Art & Craft', icon: 'fa-palette', color: 'bg-brand-lavender' },
    ];
    return (
        <div className="bg-brand-secondary/50 py-16">
            <h2 className="text-3xl font-serif font-bold text-center mb-8">Explore Our Categories</h2>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    {categories.map(cat => (
                        <Link key={cat.name} to={`/shop?category=${cat.name}`} className="group text-center">
                            <div className={`${cat.color} rounded-full w-32 h-32 mx-auto flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}>
                                <i className={`fas ${cat.icon} text-white text-5xl`}></i>
                            </div>
                            <h3 className="mt-4 font-semibold text-lg text-brand-text">{cat.name}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

const InstagramGallery = () => {
    const images = Array.from({ length: 6 }).map((_, i) => `https://picsum.photos/id/${230 + i}/400/400`);
    return (
        <div className="py-16">
            <h2 className="text-3xl font-serif font-bold text-center mb-2">Follow Our Journey</h2>
            <div className="text-center mb-8">
                <a href="https://instagram.com/handmadebyparul" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:underline">
                    @handmadebyparul
                </a>
            </div>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-0">
                {images.map((src, i) => (
                    <a href="https://instagram.com/handmadebyparul" target="_blank" rel="noopener noreferrer" key={i} className="relative overflow-hidden aspect-square">
                        <img src={src} alt={`Instagram post ${i+1}`} className="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                             <i className="fab fa-instagram text-white text-4xl"></i>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
};

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategoriesPreview />
      <InstagramGallery />
    </div>
  );
};

export default HomePage;
