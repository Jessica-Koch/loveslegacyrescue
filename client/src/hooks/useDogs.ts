import { useContext } from 'react';
import { DogsContext } from '../context/DogsContext';

export function useDogs() {
  const ctx = useContext(DogsContext);
  if (!ctx) throw new Error('useDogs must be used within DogsProvider');
  return ctx;
}
