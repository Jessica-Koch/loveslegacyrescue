import { useEffect, useState } from 'react';
import { PageHeader } from '../../components/sections/PageHeader/PageHeader';
import './EventsPage.scss';

const API_KEY = import.meta.env.VITE_GIVEBUTTER_API_KEY;
const GIVEBUTTER_BASE = 'https://api.givebutter.com/v1';
const GB_HEADERS = { Authorization: `Bearer ${API_KEY}` };

// IDs to hide — templates and general donation pages
const HIDDEN_IDS = new Set([616300, 615368, 586847]);

interface GBEvent {
  title: string;
  address_formatted?: string;
  start_at: string;
  end_at: string;
  timezone: string;
  details?: string;
}

interface GBCampaign {
  id: number;
  type: 'event' | 'fundraise' | 'collect' | 'general';
  title: string;
  subtitle?: string;
  description?: string;
  url: string;
  goal?: number | null;
  raised: number;
  donors: number;
  cover?: { url: string };
  status: string;
  end_at?: string | null;
  event?: GBEvent;
}

function formatDate(isoString: string, tz: string) {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    timeZone: tz,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatTime(isoString: string, tz: string) {
  const date = new Date(isoString);
  return date.toLocaleTimeString('en-US', {
    timeZone: tz,
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

function ProgressBar({ raised, goal }: { raised: number; goal: number }) {
  const pct = Math.min(100, Math.round((raised / goal) * 100));
  return (
    <div className="gb-progress">
      <div className="gb-progress__bar">
        <div className="gb-progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="gb-progress__labels">
        <span className="gb-progress__raised">
          ${raised.toLocaleString()} raised
        </span>
        <span className="gb-progress__goal">${goal.toLocaleString()} goal</span>
      </div>
    </div>
  );
}

function EventCard({ campaign }: { campaign: GBCampaign }) {
  const ev = campaign.event!;
  const tz = ev.timezone || 'America/Los_Angeles';
  const dateStr = formatDate(ev.start_at, tz);
  const startTime = formatTime(ev.start_at, tz);
  const endTime = formatTime(ev.end_at, tz);

  return (
    <div className="gb-event-card">
      {campaign.cover?.url && (
        <div className="gb-event-card__image-wrap">
          <img
            src={campaign.cover.url}
            alt={campaign.title}
            className="gb-event-card__image"
          />
        </div>
      )}
      <div className="gb-event-card__body">
        <div className="gb-event-card__meta">
          <span className="gb-event-card__badge">Upcoming Event</span>
        </div>
        <h2 className="gb-event-card__title">{campaign.title}</h2>
        {campaign.subtitle && (
          <p className="gb-event-card__subtitle">{campaign.subtitle}</p>
        )}
        <div className="gb-event-card__details">
          <div className="gb-event-card__detail">
            <span className="gb-event-card__detail-icon" aria-hidden="true">📅</span>
            <span>{dateStr}</span>
          </div>
          <div className="gb-event-card__detail">
            <span className="gb-event-card__detail-icon" aria-hidden="true">🕔</span>
            <span>{startTime} – {endTime} PT</span>
          </div>
          {ev.address_formatted && (
            <div className="gb-event-card__detail">
              <span className="gb-event-card__detail-icon" aria-hidden="true">📍</span>
              <span>{ev.address_formatted}</span>
            </div>
          )}
        </div>
        {ev.details && (
          <div
            className="gb-event-card__description"
            dangerouslySetInnerHTML={{ __html: ev.details }}
          />
        )}
        {campaign.goal && (
          <ProgressBar raised={campaign.raised} goal={campaign.goal} />
        )}
        <a
          href={campaign.url}
          target="_blank"
          rel="noreferrer"
          className="btn btn--primary btn--lg"
        >
          Get Raffle Tickets
        </a>
      </div>
    </div>
  );
}

function FundraiserCard({ campaign }: { campaign: GBCampaign }) {
  return (
    <div className="gb-fundraiser-card">
      {campaign.cover?.url && (
        <img
          src={campaign.cover.url}
          alt={campaign.title}
          className="gb-fundraiser-card__image"
          loading="lazy"
        />
      )}
      <div className="gb-fundraiser-card__body">
        <h3 className="gb-fundraiser-card__title">{campaign.title}</h3>
        {campaign.goal ? (
          <ProgressBar raised={campaign.raised} goal={campaign.goal} />
        ) : (
          <p className="gb-fundraiser-card__raised">
            ${campaign.raised.toLocaleString()} raised · {campaign.donors} donor{campaign.donors !== 1 ? 's' : ''}
          </p>
        )}
        <a
          href={campaign.url}
          target="_blank"
          rel="noreferrer"
          className="btn btn--secondary btn--md"
        >
          Donate
        </a>
      </div>
    </div>
  );
}

export const EventsPage = () => {
  const [campaigns, setCampaigns] = useState<GBCampaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${GIVEBUTTER_BASE}/campaigns`, { headers: GB_HEADERS })
      .then((r) => r.json())
      .then((data) => {
        const active = (data.data as GBCampaign[]).filter(
          (c) => c.status === 'active' && !HIDDEN_IDS.has(c.id),
        );
        setCampaigns(active);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  const eventCampaigns = campaigns.filter((c) => c.type === 'event');
  const fundraiserCampaigns = campaigns.filter((c) => c.type !== 'event');

  return (
    <>
      <PageHeader
        heading="Events"
        subheading="Join us at upcoming adoption events, fundraisers, and community gatherings"
      />

      {loading && (
        <div className="section-inner events-state">
          <p className="events-state__msg">Loading events…</p>
        </div>
      )}

      {error && (
        <div className="section-inner events-state">
          <p className="events-state__msg">
            Couldn't load events right now. Check us out on{' '}
            <a href="https://www.instagram.com/loveslegacyrescue" target="_blank" rel="noreferrer">
              Instagram
            </a>{' '}
            for the latest.
          </p>
        </div>
      )}

      {!loading && !error && eventCampaigns.length > 0 && (
        <section className="events-section">
          <div className="section-inner">
            <h2 className="section-heading">Upcoming Events</h2>
            <div className="events-section__list">
              {eventCampaigns.map((c) => (
                <EventCard key={c.id} campaign={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && !error && fundraiserCampaigns.length > 0 && (
        <section className="events-fundraisers">
          <div className="section-inner">
            <h2 className="section-heading">Active Fundraisers</h2>
            <p className="section-sub">Help us care for dogs in need right now.</p>
            <div className="events-fundraisers__grid">
              {fundraiserCampaigns.map((c) => (
                <FundraiserCard key={c.id} campaign={c} />
              ))}
            </div>
          </div>
        </section>
      )}

      {!loading && !error && campaigns.length === 0 && (
        <div className="section-inner events-state">
          <p className="events-state__msg">
            No upcoming events right now — follow us on{' '}
            <a href="https://www.instagram.com/loveslegacyrescue" target="_blank" rel="noreferrer">
              @loveslegacyrescue
            </a>{' '}
            for announcements.
          </p>
        </div>
      )}
    </>
  );
}
