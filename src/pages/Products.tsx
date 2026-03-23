import { motion, useInView } from 'framer-motion';
import React, { useRef, useEffect, useState } from 'react';
import ProductSpecs from '../components/ProductSpecs';
import ProductSlideshow from '../components/ProductSlideshow';
import OrderForm from '../components/OrderForm';

const products = [
  {
    id: 'shin-ramyun',
    name: 'Shin Ramyun',
    subtitle: 'Pikante Gourmet',
    desc: 'Supa ikonike pikante me petë që nisi gjithçka. Një lëng i pasur që mishëron mjeshtërinë e shijes koreane.',
    cert: 'Vegan / Halal',
    images: ['/shin_ramuyn/shin_ramuyn(2).jpeg', '/shin_ramuyn/shin_ramuyn(3).jpeg'],
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
    images: ['/Shin_Ramun_tomba/Shin_Ramun_tomba.jpeg', '/Shin_Ramun_tomba/Shin_Ramun_tomba(2).jpeg'],
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
    images: ['/Sgin_Crackers/Sgin_Crackers.jpeg', '/Sgin_Crackers/resized_Sgin_Crackers(3).png'],
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

function ProductCard({ product, index, key, onOrderClick }: { product: typeof products[0], index: number, key?: string, onOrderClick: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={hasAnimated ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: index * 0.15 }}
      className="flex flex-col lg:flex-row items-center gap-10 py-16 md:py-24 border-b border-[#1a2b4b]/5 last:border-0"
    >
      {/* Product Image - Portrait Aspect Ratio */}
      <div className="w-full lg:w-1/2 flex justify-center">
        <div className="relative w-full max-w-md aspect-[4/5] bg-white flex items-center justify-center p-6 md:p-8 shadow-[0_30px_60px_-15px_rgba(26,43,75,0.1)] rounded-sm overflow-hidden">
          <div className="absolute top-4 right-4 text-[#1a2b4b]/5 font-serif text-4xl md:text-6xl pointer-events-none">
            辛
          </div>
          <ProductSlideshow 
            images={product.images} 
            productName={product.name}
          />
        </div>
      </div>

      {/* Product Content - Vertically Centered */}
      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="space-y-6 md:space-y-8 max-w-lg">
          <div className="flex items-center gap-3 md:gap-4">
            <span className="h-[1px] w-8 md:w-12 bg-red-600" />
            <span className="font-sans text-[10px] md:text-xs uppercase tracking-[0.3em] text-red-600 font-bold">
              {product.cert}
            </span>
          </div>
          
          <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl tracking-tighter text-[#1a2b4b]">{product.name}</h2>
          <h3 className="font-sans text-sm md:text-base uppercase tracking-widest opacity-60 italic">{product.subtitle}</h3>
          
          <p className="font-sans text-sm md:text-lg opacity-80 leading-relaxed">
            {product.desc}
          </p>

          <div className="pt-4">
            <ProductSpecs tech={product.tech} onOrderClick={onOrderClick} />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Products() {
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const handleOrderClick = (product: typeof products[0]) => {
    setSelectedProduct(product);
    setIsOrderFormOpen(true);
  };

  return (
    <div className="relative bg-[#fdfaf5] text-[#1a2b4b] min-h-screen">
      
      {/* Hero Section - Clean Style */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6 overflow-hidden bg-[#fdfaf5]">
        <div className="relative z-10 max-w-7xl w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-left space-y-8"
            >
              <div className="inline-flex items-center gap-4">
                <div className="h-[2px] w-16 bg-red-600" />
                <span className="text-red-600 font-sans font-bold tracking-[0.3em] uppercase text-sm">
                  Koleksioni Zyrtar
                </span>
              </div>
              
              <div className="space-y-4">
                <h1 className="font-serif text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] leading-none tracking-tighter text-[#1a2b4b]">
                  Koleksioni <br /> 
                  <span className="text-red-600 italic font-extralight">Premium</span>
                </h1>
              </div>
              
              <div className="space-y-6 max-w-lg">
                <div className="h-[1px] w-32 bg-gradient-to-r from-[#1a2b4b] to-transparent" />
                <p className="font-sans text-xl md:text-2xl opacity-80 leading-relaxed font-light">
                  Përsosmëri në çdo paketim - shijet e mira të Kores së bashku me cilësinë e papërkrueshme.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              className="flex justify-center lg:justify-end relative"
            >
              <div className="relative">
                <img 
                  src="/hero.png" 
                  alt="Produktet HaNeul" 
                  className="relative w-full max-w-lg lg:max-w-xl h-auto object-contain drop-shadow-xl"
                  fetchPriority="high"
                  loading="eager"
                  width="576"
                  height="576"
                />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-60">
          <span className="text-xs uppercase tracking-[0.4em] font-light">Produktet</span>
          <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 2.5, repeat: Infinity }} className="w-[2px] h-20 bg-gradient-to-b from-[#1a2b4b] to-transparent" />
        </div>
      </section>

      {/* Product List Section */}
      <div className="pt-20 md:pt-40 pb-20 md:pb-40">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          {products.map((product, idx) => (
            <ProductCard product={product} index={idx} key={product.id} onOrderClick={() => handleOrderClick(product)} />
          ))}
        </div>
      </div>
    {/* Order Form Modal */}
      {selectedProduct && (
        <OrderForm 
          isOpen={isOrderFormOpen}
          onClose={() => setIsOrderFormOpen(false)}
          productName={selectedProduct.name}
          productId={selectedProduct.id}
        />
      )}
    </div>
  );
}