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
      {/* Candidate Image */}
      <div className="candidate-section">
        <motion.img
          src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/juan%203.jpg"
          alt="Candidato Juan Camara"
          className="candidate-image"
          onClick={handleImageClick}
          animate={{
            scale: isZoomed ? 1.05 : 1,
          }}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 15px 30px rgba(0,0,0,0.4), 0 0 0 3px rgba(29,78,216,0.6)"
          }}
          transition={{ 
            type: "spring", 
            stiffness: 400, 
            damping: 25,
            duration: 0.3 
          }}
        />
      </div>

      {/* Countdown Timer */}
      <div className="countdown-section">
        <AnimatePresence mode="wait">
          <motion.div
            key={sloganPhase}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="slogan-text"
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
                {unit === 'days' ? 'DÍAS' : 
                 unit === 'hours' ? 'HORAS' : 
                 unit === 'minutes' ? 'MIN' : 'SEG'}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bottom-section">
        <div className="main-slogan">¡Estamos Listos!</div>
        
        <div className="logo-number-row">
          <motion.div
            className="party-logo"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="https://raw.githubusercontent.com/appyem/imagenesappy/refs/heads/main/conservador.avif"
              alt="Partido Conservador"
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
            className="social-button"
            style={{ background: 'linear-gradient(135deg, #25D366, #128C7E)' }}
            onClick={handleWhatsAppClick}
            whileHover={{ y: -4, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
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
            className="social-button"
            style={{ background: 'linear-gradient(135deg, #1877F2, #0d5cb6)' }}
            whileHover={{ y: -4, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
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
            className="social-button"
            style={{ background: 'linear-gradient(45deg, #833AB4, #FD1D1D, #FCB045)' }}
            whileHover={{ y: -4, scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
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
