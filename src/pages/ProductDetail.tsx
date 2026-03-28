import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductSlideshow from '../components/ProductSlideshow';
import ProductSpecs from '../components/ProductSpecs';
import OrderForm from '../components/OrderForm';

const products = [
  {
    id: 'shin-ramyun',
    name: 'Shin Ramyun',
    subtitle: 'Pikante Gourmet',
    desc: 'Supa ikonike pikante me petë që nisi gjithçka. Një lëng i pasur që mishëron mjeshtërinë e shijes koreane.',
    cert: 'Vegan / Halal',
    images: ['/shin_ramuyn/shin_ramuyn.png', '/shin_ramuyn/shin_ramuyn(2).jpeg', '/shin_ramuyn/shin_ramuyn(3).jpeg'],
    tech: {
      'Category': 'Packet Noodles',
      'Type': 'Soup',
      'CBM': '0.01564',
      'Dimensions': '27.2 x 38.6 x 14.9',
      'Spec/CTN': '120G x 5 x 8',
      'Shelf Life': '12 Month'
    }
  },
  {
    id: 'shin-toomba',
    name: 'Shin Toomba',
    subtitle: 'Premium Pikante & Kremoze',
    desc: 'Fuzion i guximshëm i kremit dhe djegësisë. Një eksperiencë stir-fry për ata që kërkojnë teksturë kadifeje.',
    cert: 'Vegan / Halal',
    images: ['/Shin_Ramun_tomba/Shin_Ramun_tomba.png', '/Shin_Ramun_tomba/Shin_Ramun_tomba.jpeg', '/Shin_Ramun_tomba/Shin_Ramun_tomba(2).jpeg'],
    tech: {
      'Category': 'Packet Noodles',
      'Type': 'Stir Fry',
      'CBM': '0.01588',
      'Dimensions': '40 x 33 x 27',
      'Spec/CTN': '137G x 20 x 1',
      'Shelf Life': '12 Month'
    }
  },
  {
    id: 'shrimp-crackers',
    name: 'Shrimp Crackers',
    subtitle: 'Shije Oqeani dhe Pikante',
    desc: 'Snack-u legjendar me karkaleca të vërtetë. Krokante, e lehtë dhe e krijuar për të qenë e parezistueshme.',
    cert: 'Premium Snack',
    images: ['/Sgin_Crackers/Sgin_Crackers.png', '/Sgin_Crackers/Sgin_Crackers(2).jpeg', '/Sgin_Crackers/Sgin_Crackers(3).png'],
    tech: {
      'Category': 'Snack',
      'Type': 'Crackers',
      'CBM': '0.03441',
      'Dimensions': '41 x 36.5 x 23',
      'Spec/CTN': '75G x 20 x 1',
      'Shelf Life': '12 Month'
    }
  }
];

export default function ProductDetail() {
  const { productId } = useParams();
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="relative bg-[#fdfaf5] text-[#1a2b4b] min-h-screen pt-40 pb-40">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="font-serif text-6xl mb-8">Produkti nuk u gjet</h1>
          <Link 
            to="/products" 
            className="inline-block bg-[#1a2b4b] text-white px-12 py-5 rounded-full font-bold hover:bg-red-600 transition-all duration-500 uppercase text-xs tracking-widest"
          >
            Kthehu te Produktet
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative bg-[#fdfaf5] text-[#1a2b4b] min-h-screen pt-20 md:pt-40 pb-20 md:pb-40">
      
      {/* Breadcrumb Navigation */}
      {!['shrimp-crackers', 'shin-toomba', 'shin-ramyun'].includes(product.id) && (
        <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
          <nav className="flex items-center gap-2 md:gap-4 text-xs md:text-sm opacity-60">
            <Link to="/" className="hover:text-red-600 transition-colors">Faqja Kryesore</Link>
            <span>/</span>
            <Link to="/products" className="hover:text-red-600 transition-colors">Produktet</Link>
            <span>/</span>
            <span className="text-red-600">{product.name}</span>
          </nav>
        </div>
      )}

      {/* Product Detail Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center gap-8 md:gap-24 py-12 md:py-20"
        >
          {/* Product Images */}
          <div className="w-full md:w-1/2 aspect-square bg-white flex items-center justify-center p-6 md:p-12 shadow-[0_30px_60px_-15px_rgba(26,43,75,0.1)] rounded-sm">
            <div className="absolute top-4 md:top-8 right-4 md:right-8 text-[#1a2b4b]/5 font-serif text-[6rem] md:text-[10rem] pointer-events-none">
              辛
            </div>
            <ProductSlideshow 
              images={product.images} 
              productName={product.name}
            />
          </div>

          {/* Product Content */}
          <div className="w-full md:w-1/2 space-y-4 md:space-y-6">
            <div className="flex items-center gap-4">
              <span className="h-[1px] w-8 md:w-12 bg-red-600" />
              <span className="font-sans text-[8px] md:text-[10px] uppercase tracking-[0.3em] text-red-600 font-bold">
                {product.cert}
              </span>
            </div>
            
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl tracking-tighter text-[#1a2b4b]">{product.name}</h1>
            <p className="font-sans text-sm md:text-lg uppercase tracking-widest opacity-60 italic">{product.subtitle}</p>
            
            <p className="font-sans text-base md:text-xl opacity-70 leading-relaxed max-w-lg">
              {product.desc}
            </p>

            {!['shrimp-crackers', 'shin-toomba', 'shin-ramyun'].includes(product.id) && (
              <>
                <div className="pt-4 md:pt-8">
                  <ProductSpecs tech={product.tech} onOrderClick={() => setIsOrderFormOpen(true)} />
                </div>

                <div className="pt-4 md:pt-8 flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setIsOrderFormOpen(true)}
                    className="bg-[#1a2b4b] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold shadow-2xl hover:bg-red-600 transition-all duration-500 uppercase text-xs tracking-widest"
                  >
                    Porosit Tani
                  </button>
                  <Link 
                    to="/products"
                    className="border-2 border-[#1a2b4b] text-[#1a2b4b] px-8 md:px-12 py-4 md:py-5 rounded-full font-bold hover:bg-[#1a2b4b] hover:text-white transition-all duration-500 uppercase text-xs tracking-widest text-center"
                  >
                    Shiko të tjera
                  </Link>
                </div>
              </>
            )}

            {['shrimp-crackers', 'shin-toomba', 'shin-ramyun'].includes(product.id) && (
              <div className="pt-4 md:pt-8 flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => setIsOrderFormOpen(true)}
                  className="bg-[#1a2b4b] text-white px-8 md:px-12 py-4 md:py-5 rounded-full font-bold shadow-2xl hover:bg-red-600 transition-all duration-500 uppercase text-xs tracking-widest"
                >
                  Porosit Tani
                </button>
                <Link 
                  to="/products"
                  className="border-2 border-[#1a2b4b] text-[#1a2b4b] px-8 md:px-12 py-4 md:py-5 rounded-full font-bold hover:bg-[#1a2b4b] hover:text-white transition-all duration-500 uppercase text-xs tracking-widest text-center"
                >
                  Shiko të tjera
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Order Form Modal */}
      <OrderForm 
        isOpen={isOrderFormOpen}
        onClose={() => setIsOrderFormOpen(false)}
        productName={product.name}
        productId={product.id}
      />
    </div>
  );
}
