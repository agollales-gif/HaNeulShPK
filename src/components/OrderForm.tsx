import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OrderFormProps {
  isOpen: boolean;
  onClose: () => void;
  productName: string;
  productId: string;
}

interface FormData {
  name: string;
  phone: string;
  address: string;
  city: string;
  quantity: number;
  notes: string;
}

export default function OrderForm({ isOpen, onClose, productName, productId }: OrderFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    city: '',
    quantity: 1,
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 100) {
      setFormData(prev => ({
        ...prev,
        quantity: newQuantity
      }));
    }
  };

  const formatWhatsAppMessage = () => {
    const message = `Përshëndetje! Jam i interesuar për këtë produktin: ${productName}`;

    return message;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    const whatsappUrl = `https://wa.me/447464729114?text=${formatWhatsAppMessage()}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
    
    // Close form after a short delay
    setTimeout(() => {
      onClose();
      setIsSubmitting(false);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="bg-[#1a2b4b] text-white p-6 rounded-t-2xl">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="font-serif text-2xl mb-2">Porosit {productName}</h2>
                <p className="text-white/80 text-sm">Plotësoni formularin më poshtë për të porositur produktin</p>
              </div>
              <button
                onClick={onClose}
                className="text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Simple Button */}
          <div className="p-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-[#1a2b4b] text-white py-4 px-6 rounded-lg font-sans text-lg uppercase tracking-[0.2em] hover:bg-red-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Duke dërguar...' : 'Dergo Mesazhin'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
