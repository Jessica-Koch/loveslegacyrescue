import { useState, useEffect } from 'react';
import { useDogs } from '../../hooks/useDogs';
import type { Dog } from '../../types';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export default function AdminPage() {
  const { dogs, fetchDogs } = useDogs();
  const [slackValues, setSlackValues] = useState<Record<string, string>>({});

  useEffect(() => {
    setSlackValues((prev) => {
      const next = { ...prev };
      for (const dog of dogs) {
        if (!(dog.id in next)) {
          next[dog.id] = dog.slackChannelId ?? '';
        }
      }
      return next;
    });
  }, [dogs]);

  const [saving, setSaving] = useState<string | null>(null);
  const [saved, setSaved] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  async function saveSlack(dog: Dog) {
    setSaving(dog.id);
    await fetch(`${API}/dogs/${dog.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slackChannelId: slackValues[dog.id] || null }),
    });
    setSaving(null);
    setSaved(dog.id);
    setTimeout(() => setSaved(null), 2000);
    fetchDogs();
  }

  async function sync() {
    setSyncing(true);
    setSyncResult(null);
    const res = await fetch(`${API}/sync`, { method: 'POST' });
    const data = await res.json();
    setSyncResult(`Synced ${data.synced} dogs, removed ${data.removed}`);
    setSyncing(false);
    fetchDogs();
  }

  async function rotateFeatured() {
    const res = await fetch(`${API}/feature/rotate`, { method: 'POST' });
    const data = await res.json();
    setSyncResult(data.message ?? `Now featuring: ${data.featured}`);
    fetchDogs();
  }

  const filtered = dogs.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.breed ?? '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="admin-page">
      <div className="section-inner">
        <h2 className="section-heading">Admin</h2>

        <div className="admin-actions">
          <button className="action-btn" onClick={sync} disabled={syncing}>
            {syncing ? 'Syncing…' : 'Sync from Shelterluv'}
          </button>
          <button className="action-btn secondary" onClick={rotateFeatured}>
            Rotate Featured Dog
          </button>
          {syncResult && <span className="sync-result">{syncResult}</span>}
        </div>

        <div className="admin-search">
          <input
            type="text"
            placeholder="Search by name or breed…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Breed</th>
              <th>Slack ID</th>
              <th>Featured</th>
              <th>New Slack Channel ID</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((dog) => (
              <tr key={dog.id}>
                <td className="dog-name-cell">{dog.name}</td>
                <td>{dog.breed ?? '—'}</td>
                <td>{dog.slackChannelId ?? '—'}</td>
                <td className="center">
                  {dog.featured ? '⭐' : ''}
                </td>
                <td>
                  <input
                    type="text"
                    className="slack-input"
                    placeholder="e.g. C12345678"
                    value={slackValues[dog.id] ?? ''}
                    onChange={(e) =>
                      setSlackValues((prev) => ({ ...prev, [dog.id]: e.target.value }))
                    }
                    onKeyDown={(e) => e.key === 'Enter' && saveSlack(dog)}
                  />
                </td>
                <td>
                  <button
                    className="save-btn"
                    onClick={() => saveSlack(dog)}
                    disabled={saving === dog.id}
                  >
                    {saved === dog.id ? '✓ Saved' : saving === dog.id ? '…' : 'Save'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
