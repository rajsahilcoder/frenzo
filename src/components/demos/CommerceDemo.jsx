import React, { useState } from 'react';
import { ShoppingBag, Search, Star, Plus, Minus, X, Filter, ChevronDown, Heart } from 'lucide-react';

const CommerceDemo = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState([
      { id: 1, name: 'Minimalist Watch', price: 149, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80', qty: 1 }
  ]);
  const [category, setCategory] = useState({ id: 'All', name: 'All' });

  const products = [
    { id: 1, name: 'Minimalist Watch', price: 149, category: 'Accessories', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80' },
    { id: 2, name: 'Leather Wallet', price: 89, category: 'Accessories', image: 'https://images.unsplash.com/photo-1627123424574-18bd75f31923?auto=format&fit=crop&w=500&q=80' },
    { id: 3, name: 'Travel Backpack', price: 220, category: 'Bags', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80' },
    { id: 4, name: 'Steel Bottle', price: 45, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1602143407151-11115cd4e69b?auto=format&fit=crop&w=500&q=80' },
    { id: 5, name: 'Analog Camera', price: 450, category: 'Electronics', image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80' },
    { id: 6, name: 'Notebook Set', price: 25, category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1531346878377-a513bc957372?auto=format&fit=crop&w=500&q=80' }
  ];

  const addToCart = (product) => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
          setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
      } else {
          setCart([...cart, { ...product, qty: 1 }]);
      }
      setCartOpen(true);
  };

  const updateQty = (id, delta) => {
      setCart(cart.map(item => {
          if (item.id === id) {
              const newQty = item.qty + delta;
              return newQty > 0 ? { ...item, qty: newQty } : item;
          }
          return item;
      }));
  };

  const filteredProducts = category.id === 'All' ? products : products.filter(p => p.category === category.id);
  const cartTotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: '#fff', color: '#111', position: 'relative', overflow: 'hidden' }}>
      
      {/* Nav */}
      <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#fff', zIndex: 10 }}>
         <div style={{ fontWeight: '900', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>ESSENTIALS.</div>
         <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
            <div className="desktop-only" style={{ display: 'flex', gap: '1rem', fontSize: '0.9rem', fontWeight: '500', color: '#555' }}>
                <span style={{ color: '#000', cursor: 'pointer' }}>Shop</span>
                <span style={{ cursor: 'pointer' }}>About</span>
                <span style={{ cursor: 'pointer' }}>Journal</span>
            </div>
            <Search size={20} color="#333" />
            <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setCartOpen(true)}>
               <ShoppingBag size={20} color="#333" />
               {cartCount > 0 && (
                   <span style={{ 
                     position: 'absolute', 
                     top: -6, 
                     right: -6, 
                     background: '#000', 
                     color: '#fff', 
                     fontSize: '0.6rem', 
                     width: '16px', 
                     height: '16px', 
                     borderRadius: '50%', 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center',
                     fontWeight: 'bold'
                   }}>{cartCount}</span>
               )}
            </div>
         </div>
      </div>

      {/* Main Layout */}
      <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          
          {/* Sidebar Filters */}
          <div style={{ width: '200px', padding: '2rem 1.5rem', borderRight: '1px solid #f0f0f0' }} className="desktop-only">
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', fontWeight: '700' }}>Categories</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {['All', 'Accessories', 'Bags', 'Electronics', 'Lifestyle'].map(cat => (
                      <div 
                        key={cat} 
                        onClick={() => setCategory({ id: cat, name: cat })}
                        style={{ 
                            cursor: 'pointer', 
                            color: category.id === cat ? '#000' : '#888',
                            fontWeight: category.id === cat ? '600' : '400',
                            fontSize: '0.9rem'
                        }}
                      >
                          {cat}
                      </div>
                  ))}
              </div>
          </div>

          {/* Product Grid */}
          <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', background: '#f9f9f9' }}>
               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                   <h2 style={{ fontSize: '1.5rem', margin: 0, fontWeight: '700' }}>{category.name}</h2>
                   <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', color: '#666' }}>
                       Sort by: Featured <ChevronDown size={14} />
                   </div>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
                   {filteredProducts.map(p => (
                       <div key={p.id} style={{ background: '#fff', borderRadius: '8px', overflow: 'hidden', transition: 'transform 0.2s', boxShadow: '0 2px 10px rgba(0,0,0,0.02)' }} className="hover-lift">
                           <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
                               <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                               <button 
                                 onClick={() => addToCart(p)}
                                 style={{ 
                                   position: 'absolute', 
                                   bottom: '10px', 
                                   right: '10px', 
                                   background: '#fff', 
                                   width: '36px', 
                                   height: '36px', 
                                   borderRadius: '50%', 
                                   display: 'flex', 
                                   alignItems: 'center', 
                                   justifyContent: 'center',
                                   border: 'none',
                                   boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                   cursor: 'pointer',
                                   transition: 'transform 0.1s active'
                                 }}
                               >
                                   <Plus size={18} color="#000" />
                               </button>
                           </div>
                           <div style={{ padding: '1rem' }}>
                               <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                                   <h3 style={{ fontSize: '1rem', fontWeight: '600', margin: 0 }}>{p.name}</h3>
                                   <span style={{ fontWeight: '600' }}>${p.price}</span>
                               </div>
                               <p style={{ color: '#888', fontSize: '0.8rem', margin: 0 }}>{p.category}</p>
                           </div>
                       </div>
                   ))}
               </div>
          </div>
      </div>

      {/* Cart Drawer */}
      {cartOpen && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 100 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.5)' }} onClick={() => setCartOpen(false)}></div>
              <div style={{ position: 'absolute', top: 0, right: 0, width: '350px', maxWidth: '85%', height: '100%', background: '#fff', display: 'flex', flexDirection: 'column', boxShadow: '-10px 0 30px rgba(0,0,0,0.1)' }}>
                  <div style={{ padding: '1.5rem', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h3 style={{ margin: 0 }}>Your Cart ({cartCount})</h3>
                      <button onClick={() => setCartOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={24} /></button>
                  </div>
                  
                  <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
                      {cart.length === 0 ? (
                          <p style={{ color: '#888', textAlign: 'center', marginTop: '3rem' }}>Your cart is empty.</p>
                      ) : (
                          cart.map((item) => (
                              <div key={item.id} style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
                                  <img src={item.image} style={{ width: '70px', height: '70px', borderRadius: '8px', objectFit: 'cover', background: '#f5f5f5' }} />
                                  <div style={{ flex: 1 }}>
                                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                                          <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{item.name}</h4>
                                          <span style={{ fontWeight: '600' }}>${item.price * item.qty}</span>
                                      </div>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: '0.5rem' }}>
                                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '4px' }}>
                                              <button onClick={() => updateQty(item.id, -1)} style={{ padding: '2px 8px', background: 'none', border: 'none', cursor: 'pointer' }}><Minus size={14} /></button>
                                              <span style={{ fontSize: '0.9rem', padding: '0 4px' }}>{item.qty}</span>
                                              <button onClick={() => updateQty(item.id, 1)} style={{ padding: '2px 8px', background: 'none', border: 'none', cursor: 'pointer' }}><Plus size={14} /></button>
                                          </div>
                                          <span style={{ fontSize: '0.8rem', color: '#888', cursor: 'pointer', textDecoration: 'underline' }}>Remove</span>
                                      </div>
                                  </div>
                              </div>
                          ))
                      )}
                  </div>

                  <div style={{ padding: '1.5rem', borderTop: '1px solid #eee', background: '#f9f9f9' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontWeight: 'bold', fontSize: '1.1rem' }}>
                          <span>Total</span>
                          <span>${cartTotal}</span>
                      </div>
                      <button style={{ width: '100%', background: '#000', color: '#fff', padding: '1rem', borderRadius: '8px', border: 'none', fontWeight: 'bold', fontSize: '1rem', cursor: 'pointer' }}>Checkout</button>
                  </div>
              </div>
          </div>
      )}

    </div>
  );
};

export default CommerceDemo;
