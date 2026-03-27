import { useState, useEffect } from 'react';
import { useDogs } from '../../hooks/useDogs';
import type { Dog } from '../../types';
import './AdminPage.scss';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface GBCampaign {
  id: number;
  title: string;
  status: string;
  goal: number | null;
  raised: number;
  donors: number;
  currency: string;
  url: string;
}

interface GBTransaction {
  id: string;
  campaign_id: number;
  campaign_title: string;
  amount: number;
  currency: string;
  first_name: string;
  last_name: string;
  email: string;
  transacted_at: string;
  status: string;
}

export const AdminPage = () => {
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
  const [featuring, setFeaturing] = useState<string | null>(null);
  const [syncing, setSyncing] = useState(false);
  const [syncResult, setSyncResult] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const [campaigns, setCampaigns] = useState<GBCampaign[]>([]);
  const [allTransactions, setAllTransactions] = useState<GBTransaction[]>([]);
  const [gbLoading, setGbLoading] = useState(true);
  const [gbError, setGbError] = useState<string | null>(null);
  const [selectedCampaignId, setSelectedCampaignId] = useState<number | null>(null);

  useEffect(() => {
    async function loadGiveButter() {
      try {
        const [cRes, tRes] = await Promise.all([
          fetch(`${API}/givebutter/campaigns`),
          fetch(`${API}/givebutter/transactions`),
        ]);
        if (!cRes.ok || !tRes.ok) throw new Error('Failed to load GiveButter data');
        const cData = await cRes.json();
        const tData = await tRes.json();
        // only show published/active campaigns with activity or an active status
        const allCampaigns: GBCampaign[] = cData.data ?? [];
        setCampaigns(allCampaigns.filter((c) => c.status === 'active' || c.raised > 0));
        setAllTransactions(tData.data ?? []);
      } catch (e: any) {
        setGbError(e.message);
      } finally {
        setGbLoading(false);
      }
    }
    loadGiveButter();
  }, []);

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

  async function setFeatured(dog: Dog) {
    setFeaturing(dog.id);
    await fetch(`${API}/feature/set/${dog.id}`, { method: 'POST' });
    setFeaturing(null);
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

  const transactions = selectedCampaignId
    ? allTransactions.filter((t) => t.campaign_id === selectedCampaignId)
    : allTransactions;

  const fmtCurrency = (amount: number, currency = 'USD') =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(amount);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <main className="admin-page">
      <div className="section-inner">
        <h2 className="section-heading">Admin</h2>

        {/* ── GiveButter ─────────────────────────────────────────────── */}
        <section className="admin-section">
          <h3 className="admin-section-title">GiveButter</h3>

          {gbLoading && <p className="admin-loading">Loading GiveButter data…</p>}
          {gbError && <p className="admin-error">{gbError}</p>}

          {!gbLoading && !gbError && (
            <>
              <div className="gb-campaigns">
                {campaigns.map((c) => {
                  const pct = c.goal ? Math.min(100, (c.raised / c.goal) * 100) : null;
                  const isSelected = selectedCampaignId === c.id;
                  return (
                    <button
                      key={c.id}
                      className={`gb-campaign-card ${isSelected ? 'is-selected' : ''}`}
                      onClick={() => setSelectedCampaignId(isSelected ? null : c.id)}
                    >
                      <span className="gb-campaign-status" data-status={c.status}>
                        {c.status}
                      </span>
                      <span className="gb-campaign-title">{c.title}</span>
                      <span className="gb-campaign-raised">
                        {fmtCurrency(c.raised, c.currency)}
                        {c.goal ? ` / ${fmtCurrency(c.goal, c.currency)}` : ''}
                        {' '}· {c.donors} donor{c.donors !== 1 ? 's' : ''}
                      </span>
                      {pct !== null && (
                        <span className="gb-campaign-bar">
                          <span className="gb-campaign-bar-fill" style={{ width: `${pct}%` }} />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              <h4 className="admin-subsection-title">
                {selectedCampaignId
                  ? `Recent Donations — ${campaigns.find((c) => c.id === selectedCampaignId)?.title}`
                  : 'Recent Donations (all campaigns)'}
              </h4>

              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Amount</th>
                    {!selectedCampaignId && <th>Campaign</th>}
                  </tr>
                </thead>
                <tbody>
                  {transactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="center">No transactions found.</td>
                    </tr>
                  )}
                  {transactions.map((t) => (
                    <tr key={t.id}>
                      <td>{fmtDate(t.transacted_at)}</td>
                      <td>{t.first_name} {t.last_name}</td>
                      <td>{t.email}</td>
                      <td>{fmtCurrency(t.amount, t.currency)}</td>
                      {!selectedCampaignId && <td>{t.campaign_title ?? '—'}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </section>

        {/* ── Dogs ───────────────────────────────────────────────────── */}
        <section className="admin-section">
          <h3 className="admin-section-title">Dogs</h3>

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
                <th>Status</th>
                <th>Featured</th>
                <th>Slack Channel ID</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((dog) => (
                <tr key={dog.id} className={dog.featured ? 'is-featured-row' : ''}>
                  <td className="dog-name-cell">{dog.name}</td>
                  <td>{dog.breed ?? '—'}</td>
                  <td>{dog.status ?? '—'}</td>
                  <td className="center">
                    <button
                      className={`feature-btn ${dog.featured ? 'is-featured' : ''}`}
                      onClick={() => setFeatured(dog)}
                      disabled={dog.featured || featuring === dog.id}
                      title={dog.featured ? 'Currently featured' : `Set ${dog.name} as featured`}
                    >
                      {featuring === dog.id ? '…' : dog.featured ? '⭐ Featured' : 'Set Featured'}
                    </button>
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
        </section>
      </div>
    </main>
  );
};
