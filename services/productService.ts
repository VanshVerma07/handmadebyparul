import { Product } from '../types';

let productsCache: Product[] | null = null;

// Function to fetch and cache products
const loadProducts = async (): Promise<Product[]> => {
    if (productsCache) {
        return productsCache;
    }
    try {
        // Path is relative to the index.html file
        const response = await fetch('./data/products.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        productsCache = data as Product[];
        return productsCache;
    } catch (error) {
        console.error("Could not load products:", error);
        return []; // Return empty array on error
    }
};


export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const products = await loadProducts();
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return products;
  },

  getProductBySlug: async (slug: string): Promise<Product | undefined> => {
    const products = await loadProducts();
    await new Promise(resolve => setTimeout(resolve, 300));
    return products.find(p => p.slug === slug);
  },
  
  getFeaturedProducts: async (): Promise<Product[]> => {
    const products = await loadProducts();
    await new Promise(resolve => setTimeout(resolve, 300));
    return products.slice(0, 4);
  },

  getRelatedProducts: async (currentProductSlug: string): Promise<Product[]> => {
    const products = await loadProducts();
    await new Promise(resolve => setTimeout(resolve, 300));
    const currentProduct = products.find(p => p.slug === currentProductSlug);
    if (!currentProduct) return [];
    return products.filter(p => p.category === currentProduct.category && p.slug !== currentProductSlug).slice(0, 4);
  },

  getCategories: async (): Promise<string[]> => {
    const products = await loadProducts();
    await new Promise(resolve => setTimeout(resolve, 100));
    const categories = new Set(products.map(p => p.category));
    return Array.from(categories);
  }
};