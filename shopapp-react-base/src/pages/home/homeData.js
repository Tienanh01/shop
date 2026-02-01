// mock/homeData.js
export const categories = [
  { id: 1, title: "Get your game on", items: ["Gaming Headp...", "Keyboard"] },
  { id: 2, title: "Shop deals in Fashion", items: ["Blue Shirt", "Smart Watch"] },
  { id: 3, title: "Gaming accessories", items: ["Pro Headsets", "Wireless Earbu..."] },
  { id: 4, title: "Home essentials", items: ["Kitchen", "Decor"] },
];

export const featured = [
  { id: "f1", name: "Base Cotton T-shirt", price: 8.97, rating: 5, image: "/p1.png" },
  { id: "f2", name: "Headphones", price: 79, rating: 5, image: "/p2.png" },
  { id: "f3", name: "Refrigerator", price: 1299, rating: 5, image: "/p3.png" },
  { id: "f4", name: "Air Jordens New Ones", price: 399, rating: 5, image: "/p4.png" },
];

// tương tự:
export const trending = [...featured].map((x, i) => ({ ...x, id: "t" + i }));
export const newArrivals = [...featured].map((x, i) => ({ ...x, id: "n" + i }));
export const bestSellers = [...featured].map((x, i) => ({ ...x, id: "b" + i }));
