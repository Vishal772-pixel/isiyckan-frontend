import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Sliders, X } from 'lucide-react';
import Button from '../components/Button';

const products = [
  // Chairs
  {
    id: 1,
    name: 'Modern Wooden Armchair',
    price: 299.99,
    rating: 4.5,
    image: '/assets/ModernwoodenChair.png',
    material: 'wood',
    category: 'chairs',
    inStock: true,
    description: 'Elegant wooden armchair with premium finish and comfort.',
  },
  {
    id: 2,
    name: 'Leather Office Chair',
    price: 399.99,
    rating: 4.0,
    image: '/assets/LeatherChair.png',
    material: 'leather',
    category: 'chairs',
    inStock: true,
    description: 'Professional leather chair with ergonomic design.',
  },
  // Tables
  {
    id: 3,
    name: 'Glass Coffee Table',
    price: 199.99,
    rating: 4.2,
    image: '/assets/GlassCoffeeTable.png',
    material: 'glass',
    category: 'tables',
    inStock: false,
    description: 'Modern glass coffee table with sleek design.',
  },
  {
    id: 4,
    name: 'Metal Book shelf',
    price: 599.99,
    rating: 4.3,
    image: '/assets/MetalBookshelf.jpg',
    material: 'metal',
    category:  'storage',
    inStock: true,
    description: 'Durable metal dining table for stylish dining areas.',
  },
  // Storage
  {
    id: 5,
    name: 'Metal Dining Table',
    price: 149.99,
    rating: 3.8,
    image: '/assets/Metaldinningtable.jpg',
    material: 'metal',
    category: 'tables',
    inStock: true,
    description: 'Industrial style metal bookshelf.',
  },
  {
    id: 6,
    name: 'Wooden Cabinet',
    price: 499.99,
    rating: 4.7,
    image: '/assets/Woodencabinet.jpg',
    material: 'wood',
    category: 'storage',
    inStock: true,
    description: 'Classic wooden cabinet with ample storage space.',
  },
  // Lighting
  {
    id: 7,
    name: 'Modern Floor Lamp',
    price: 199.99,
    rating: 4.1,
    image: '/assets/ModernFloorlamp.jpg',
    material: 'metal',
    category: 'lighting',
    inStock: true,
    description: 'Sleek modern floor lamp with adjustable brightness.',
  },
  {
    id: 8,
    name: 'Glass Pendant Light',
    price: 299.99,
    rating: 4.6,
    image: '/assets/GlassPendentlight.png',
    material: 'glass',
    category: 'lighting',
    inStock: true,
    description: 'Elegant glass pendant light for dining spaces.',
  },
  //  we can add more items as needed
];

const categories = ['All', 'Chairs', 'Tables', 'Storage', 'Lighting'];
const materials = ['Wood', 'Metal', 'Leather', 'Glass', 'Fabric'];

export default function ProductListing() {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState(5000);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const toggleMaterial = (material) => {
    setSelectedMaterials((prev) =>
      prev.includes(material) ? prev.filter((m) => m !== material) : [...prev, material]
    );
  };

  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .filter(
      (product) =>
        product.price <= priceRange &&
        (selectedMaterials.length === 0 || selectedMaterials.includes(product.material)) &&
        (selectedCategory === 'All' || product.category === selectedCategory.toLowerCase())
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

              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={priceRange}
                  onChange={(e) => setPriceRange(Number(e.target.value))}
                  className="w-full accent-primary-600"
                />
                <div className="flex justify-between text-sm text-secondary-600 mt-2">
                  <span>$0</span>
                  <span>${priceRange}</span>
                </div>
              </div>

              {/* Materials */}
              <div>
                <h3 className="font-semibold mb-4">Materials</h3>
                <div className="space-y-2">
                  {materials.map((material) => (
                    <label key={material} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedMaterials.includes(material.toLowerCase())}
                        onChange={() => toggleMaterial(material.toLowerCase())}
                        className="rounded border-secondary-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="ml-2">{material}</span>
                    </label>
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
                      alt={product.name}
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

      {/* Filters - Mobile */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            className="fixed inset-0 bg-white z-50 overflow-auto"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Filters</h3>
              <button
                onClick={() => setShowFilters(false)}
                className="text-secondary-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="p-6">
              {/* Mobile filter content here */}
              {/* Duplicate desktop filters or adjust as needed */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
