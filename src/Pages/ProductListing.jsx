import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Sliders, X } from 'lucide-react';
import Button from '../components/Button';

const categories = ['All', 'Chairs', 'Tables', 'Storage', 'Lighting'];
const materials = ['Wood', 'Metal', 'Leather', 'Glass', 'Fabric'];

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/products');
        const data = await res.json();
        
        // Ensure correct data format
        if (Array.isArray(data)) {
          setProducts(data);  // If API returns an array directly
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);  // If API wraps data inside `products`
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);
  

  // Filtering logic remains unchanged
  const filteredProducts = products
    .filter((product) =>
      (product.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (product.description?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    )
    .filter(
      (product) =>
        product.price <= priceRange &&
        (selectedMaterials.length === 0 || selectedMaterials.includes(product.material?.toLowerCase())) &&
        (selectedCategory === 'All' || product.category?.toLowerCase() === selectedCategory.toLowerCase())
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Our Products</h1>
            <p className="text-secondary-600">
              Showing {filteredProducts.length} products
            </p>
          </div>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="p-2 border rounded-md"
            />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-md border-secondary-200 focus:ring-primary-500 focus:border-primary-500 p-2"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>

            <Button
              variant="outline"
              size="sm"
              className="md:hidden"
              onClick={() => setShowFilters(true)}
            >
              <Sliders className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters - Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              {/* Categories */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedCategory === category
                          ? 'bg-primary-50 text-primary-700'
                          : 'hover:bg-secondary-50'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link to={`/product/${product.id}`} className="block">
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={product.image}
                      // alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{product.name}</h3>
                    <p className="text-secondary-600">{product.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-primary-600 font-bold">${product.price}</span>
                      <span className="flex items-center text-secondary-600 text-sm">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        {product.rating}
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
