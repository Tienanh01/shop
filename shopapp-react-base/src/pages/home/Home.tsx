import React from 'react';
import HeroBanner from './HeroBanner';
import CategoryGrid from './CategoryGrid';
import ProductSection from './ProductSection';
    
const dummyProducts = [
  { id: 1, name: "Gaming Headset", price: 59, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IuYKWLZcswxChZ1aA6nI9z9mrV7iwYAIeQ&s", rating: 4 },
  { id: 2, name: "Mechanical Keyboard", price: 89, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IuYKWLZcswxChZ1aA6nI9z9mrV7iwYAIeQ&s", rating: 5 },
  { id: 3, name: "Wireless Mouse", price: 45, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IuYKWLZcswxChZ1aA6nI9z9mrV7iwYAIeQ&s", rating: 4 },
  { id: 4, name: "Smart Watch", price: 129, image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7IuYKWLZcswxChZ1aA6nI9z9mrV7iwYAIeQ&s", rating: 4 },
];

const Home = () => {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      <HeroBanner />
      <CategoryGrid />

      <ProductSection title="Featured" products={dummyProducts} />
      <ProductSection title="Trending" products={dummyProducts} />
      <ProductSection title="New Arrivals" products={dummyProducts} />
      <ProductSection title="Best Sellers" products={dummyProducts} />
    </div>
    );
};

export default Home;
