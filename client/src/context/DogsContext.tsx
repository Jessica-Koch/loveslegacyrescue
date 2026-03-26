import { createContext, useEffect, useState } from 'react';
import type { Dog } from '../types';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export interface DogsContextValue {
  dogs: Dog[];
  loading: boolean;
  featuredDog: Dog | undefined;
  fosterNeededDogs: Dog[];
  fetchDogs: () => Promise<void>;
}

export const DogsContext = createContext<DogsContextValue | null>(null);

export function DogsProvider({ children }: { children: React.ReactNode }) {
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

  const featuredDog = dogs.find((d) => d.featured);
  const fosterNeededDogs = dogs.filter((d) => d.inFoster);

  return (
    <DogsContext.Provider value={{ dogs, loading, featuredDog, fosterNeededDogs, fetchDogs }}>
      {children}
    </DogsContext.Provider>
  );
}
