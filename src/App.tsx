import React, { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';

export default function App() {
  const [view, setView] = useState<'landing' | 'app'>('landing');

  if (view === 'landing') {
    return <LandingPage onLaunch={() => setView('app')} />;
  }

  return <Dashboard onBack={() => setView('landing')} />;
}
