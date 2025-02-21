import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom'
import Button from '../components/Button'
import {useCart} from "../context/CartContext"
import { useState } from 'react'


const products = [
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
  {
    id: 1,
    name: 'Executive Office Set',
    price: 1999.99,
    image: '/assets/executiveofficeset.jpg',
    description: 'Includes an executive desk, ergonomic chair, and a filing cabinet.'
  },
  {
    id: 2,
    name: 'Collaborative Workspace Set',
    price: 1499.99,
    image: '/assets/collaborativeworkspaceset.jpg',
    description: 'Features a large shared table, four ergonomic chairs, and storage units.'
  },
  {
    id: 3,
    name: 'Home Office Set',
    price: 999.99,
    image: '/assets/Homeofficeset.jpg',
    description: 'Includes a compact desk, a comfortable chair, and a bookshelf.'
  },
  {
    id: 4,
    name: 'Meeting Room Set',
    price: 2999.99,
    image: '/assets/meetingroomset.jpg',
    description: 'Consists of a conference table, eight chairs, and a presentation board.'
  },
  {
    id: 5,
    name: 'Reception Area Set',
    price: 2499.99,
    image: '/assets/receptionset.jpg',
    description: 'Includes a reception desk, two lounge chairs, and a coffee table.'
  }
]

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find((item) => item.id === Number(id))

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Product Not Found</h1>
      </div>
    )
  }
  const addItemToCart = () => {
     setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If the item already exists, update the quantity
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += product.quantity;
        return updatedItems;
      } else {
        // If the item does not exist, add it to the cart
        return [...prevItems, product];
      }
    });

    // Show an alert that the item has been added
    alert(`${newProduct.name} has been added to your cart.`);
  };
  return (
    <div className="min-h-screen bg-secondary-50">
      <div className="container py-8">
        <div className="flex gap-8">
          <div className="w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-lg text-secondary-600 mb-4">
              {product.description}
            </p>
            <p className="text-lg font-bold mb-2">${product.price}</p>
            <p className="text-sm text-secondary-600 mb-4">
              Rating: {product.rating} ⭐
            </p>
            <p className="text-sm text-secondary-600 mb-4">
              Material: {product.material}
            </p>
            <Button variant="primary" className="w-full mb-4" onClick={addItemToCart}>
              Add to Cart
            </Button>
            <Link to="/">
              <Button variant="outline" className="w-full">
                Back to Listing
              </Button>
            </Link>
          </div>
       
        </div>
      </div>
      
    </div>
  )
}