import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Sliders, X } from 'lucide-react';
import Button from '../components/Button';

const categories = ['All', 'Chairs', 'Tables', 'Storage', 'Lighting'];
const itemsPerPage = 10; // Only 10 products per page

export default function ProductListing() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [currentPage, setCurrentPage] = useState(1); // Pagination State

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/products');
        const data = await res.json();

        if (Array.isArray(data)) {
          setProducts(data);
        } else if (Array.isArray(data.products)) {
          setProducts(data.products);
        } else {
          console.error("Unexpected API response format:", data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  // 🔍 Filtering logic
  const filteredProducts = products
    .filter((product) =>
      (product.Prima?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (product.Seconda?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    )
    .filter(
      (product) => selectedCategory === 'All' || product.Forni === selectedCategory
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

  // 🏷 Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Our Products</h1>
            <p className="text-secondary-600">
              Showing {paginatedProducts.length} of {filteredProducts.length} products
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

          {/* Products Grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedProducts.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <Link to={`/product/${product._id}`} className="block">
                  <div className="aspect-w-4 aspect-h-3">
                    <img
                      src={product.image}
                      alt={product.Prima} // Corrected Product Name
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{product.Prima}</h3>
                    <p className="text-secondary-600">{product.Seconda}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-primary-600 font-bold">
                        {product.Netto} KG
                      </span>
                      <span className="flex items-center text-secondary-600 text-sm">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        4.5
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border rounded-md mx-2 disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-2 text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border rounded-md mx-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
