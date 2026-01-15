import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isZoomed, setIsZoomed] = useState(false);
  const [sloganPhase, setSloganPhase] = useState(0);

  useEffect(() => {
    // Election date: March 8, 2026 at 00:00:00
    const electionDate = new Date('2026-03-08T00:00:00');

    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = electionDate - now;

      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSloganPhase(prev => prev === 0 ? 1 : 0);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleImageClick = () => {
    setIsZoomed(!isZoomed);
  };

  const handleWhatsAppClick = () => {
    const phoneNumber = '573113720228';
    const message = 'Hola, me gustaría solicitar publicidad para el candidato a la Cámara C 101 Juan M. Londono J.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const sloganPhases = ["Faltan Solo", "Estamos Listos"];

  return (
    <div className="App">
      {/* Decorative elements for natural feel */}
      <div className="natural-decoration circle" style={{ top: '10%', left: '8%', width: '60px', height: '60px' }}></div>
      <div className="natural-decoration blob" style={{ bottom: '15%', right: '10%', width: '40px', height: '40px' }}></div>
      <div className="natural-decoration circle" style={{ top: '40%', right: '15%', width: '25px', height: '25px' }}></div>

      {/* Candidate Image */}
      <div className="candidate-image-container">
        <motion.div
          className="candidate-image"
          onClick={handleImageClick}
          animate={{
            scale: isZoomed ? 1.08 : 1,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
          <img
            src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/juan%20camara%202.jpeg"
            alt="Candidato Juan Camara"
          />
        </motion.div>
      </div>

      {/* Countdown Timer */}
      <div className="countdown-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={sloganPhase}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.5 }}
            className="slogan-display"
          >
            {sloganPhases[sloganPhase]}
          </motion.div>
        </AnimatePresence>
        
        <div className="countdown-grid">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <motion.div
              key={unit}
              className="countdown-item"
              whileHover={{ 
                y: -3,
                backgroundColor: 'rgba(255,255,255,0.18)'
              }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <div className="countdown-number">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="countdown-label">
                {unit === 'days' ? 'Días' : 
                 unit === 'hours' ? 'Horas' : 
                 unit === 'minutes' ? 'Min' : 'Seg'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Slogan Section */}
      <div className="slogan-section">
        <div className="main-slogan">¡Estamos Listos!</div>
        
        <div className="logo-number-container">
          <motion.div
            className="party-logo"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/conservador.avif"
              alt="Partido Conservador Colombiano"
            />
          </motion.div>
          
          <motion.div
            className="candidate-number"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            101
          </motion.div>
        </div>

        <div className="social-buttons">
          <motion.button
            className="social-button whatsapp-btn"
            onClick={handleWhatsAppClick}
            whileHover={{ y: -5, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            title="Solicitar Publicidad por WhatsApp"
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/logo%20whatsapp.jpg"
              alt="WhatsApp"
            />
          </motion.button>

          <motion.a
            href="https://web.facebook.com/juanmlondonoj"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button facebook-btn"
            whileHover={{ y: -5, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            title="Seguir en Facebook"
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/facebook.png"
              alt="Facebook"
            />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/juanmlondonoj"
            target="_blank"
            rel="noopener noreferrer"
            className="social-button instagram-btn"
            whileHover={{ y: -5, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            title="Seguir en Instagram"
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/instagram.webp"
              alt="Instagram"
            />
          </motion.a>
        </div>
      </div>
    </div>
  );
}

export default App;