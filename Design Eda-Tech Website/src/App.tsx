import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Portfolio } from './components/Portfolio';
import { History } from './components/History';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { OrderForm } from './components/OrderForm';
import { LanguageProvider } from './hooks/useLanguage';

export default function App() {
  const [showOrderForm, setShowOrderForm] = useState(false);

  if (showOrderForm) {
    return (
      <LanguageProvider>
        <OrderForm onBack={() => setShowOrderForm(false)} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-black text-white overflow-x-hidden">
        <Header />
        <main>
          <Hero onStartProject={() => setShowOrderForm(true)} />
          <Services />
          <Portfolio />
          <History />
          <Contact />
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}