import { useEffect, useState } from 'react';
import type { Dog } from './types';
import Header from './components/Header';
import DogsPage from './components/DogsPage';
import AdminPage from './components/AdminPage';
import AdoptionGame from './components/AdoptionGame';
import './App.scss';

const API = 'http://localhost:3001';

export default function App() {
  const [view, setView] = useState<'dogs' | 'admin' | 'adopt'>('dogs');
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchDogs() {
    const res = await fetch(`${API}/dogs`);
    const data = await res.json();
    setDogs(data);
    setLoading(false);
  }

  useEffect(() => {
    fetchDogs();
  }, []);

  return (
    <>
      <Header view={view} onViewChange={setView} />
      {view === 'dogs' && <DogsPage dogs={dogs} loading={loading} onAdopt={() => setView('adopt')} />}
      {view === 'admin' && <AdminPage dogs={dogs} onUpdated={fetchDogs} />}
      {view === 'adopt' && <AdoptionGame dogs={dogs} onViewChange={setView} />}
      <footer className="footer">
        <p>Love's Legacy Rescue &copy; {new Date().getFullYear()}</p>
        <p>
          <a href="https://www.loveslegacyrescue.com" target="_blank" rel="noreferrer">
            loveslegacyrescue.com
          </a>
        </p>
      </footer>
    </>
  );
}
