'use client'

import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import BookCatalog from '../components/BookCatalog'
import LoginModal from '../components/LoginModal'
import RegisterModal from '../components/RegisterModal'

export default function Home() {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onLogin={() => setShowLogin(true)}
        onRegister={() => setShowRegister(true)}
        isLoggedIn={isLoggedIn}
      />
      
      <main>
        <Hero />
        <BookCatalog />
      </main>

      {showLogin && (
        <LoginModal 
          onClose={() => setShowLogin(false)}
          onSwitchToRegister={() => {
            setShowLogin(false)
            setShowRegister(true)
          }}
          onLoginSuccess={() => {
            setIsLoggedIn(true)
            setShowLogin(false)
          }}
        />
      )}

      {showRegister && (
        <RegisterModal 
          onClose={() => setShowRegister(false)}
          onSwitchToLogin={() => {
            setShowRegister(false)
            setShowLogin(true)
          }}
          onRegisterSuccess={() => {
            setIsLoggedIn(true)
            setShowRegister(false)
          }}
        />
      )}
    </div>
  )
} 