
import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductCard, ProductCardSkeleton } from '../components/product/ProductCard';
import { productService } from '../services/productService';
import { Product } from '../types';
import { useDebounce } from '../hooks/useDebounce';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);
  
  const query = useQuery();
  const [selectedCategory, setSelectedCategory] = useState<string>(query.get('category') || 'All');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('newest');

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [allProducts, allCategories] = await Promise.all([
          productService.getProducts(),
          productService.getCategories(),
        ]);
        setProducts(allProducts);
        setCategories(['All', ...allCategories]);
      } catch (error) {
        console.error("Failed to fetch shop data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Filter by category
    if (selectedCategory !== 'All') {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (debouncedSearchTerm) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        p.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
      );
    }

    // Sort
    switch (sortOption) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        result.sort((a, b) => new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime());
        break;
      case 'popularity':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    return result;
  }, [products, selectedCategory, debouncedSearchTerm, sortOption]);

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif font-bold">Our Collection</h1>
        <p className="mt-2 text-gray-600">Browse through our curated collection of handmade treasures.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="w-full md:w-1/4">
          <div className="sticky top-24">
            <h3 className="text-xl font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              {categories.map(category => (
                <li key={category}>
                  <button
                    onClick={() => setSelectedCategory(category)}
                    className={`w-full text-left px-2 py-1 rounded ${selectedCategory === category ? 'bg-brand-primary/20 text-brand-primary font-bold' : 'hover:bg-gray-100'}`}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="w-full md:w-3/4">
          {/* Search and Sort */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between items-center mb-8 p-4 bg-white rounded-lg shadow-sm">
            <div className="relative w-full sm:w-auto flex-grow">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-brand-primary focus:border-brand-primary"
              />
              <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
            </div>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="w-full sm:w-auto border rounded-md py-2 px-3 focus:ring-brand-primary focus:border-brand-primary"
            >
              <option value="newest">Newest</option>
              <option value="popularity">Popularity</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {Array.from({ length: 6 }).map((_, index) => <ProductCardSkeleton key={index} />)}
             </div>
          ) : (
            filteredAndSortedProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <p className="text-xl text-gray-500">No products found. Try adjusting your filters!</p>
                </div>
            )
          )}
        </main>
      </div>
    </div>
  );
};

export default ShopPage;
