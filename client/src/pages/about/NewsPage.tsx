import { useState, useEffect } from 'react';
import { PageHeader } from '../../components/sections/PageHeader/PageHeader';
import './NewsPage.scss';

const API = import.meta.env.VITE_API_URL || 'http://localhost:3001';

interface FBPost {
  id: string;
  message?: string;
  story?: string;
  created_time: string;
  full_picture?: string;
  permalink_url?: string;
}

export const NewsPage = () => {
  const [posts, setPosts] = useState<FBPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API}/facebook/posts?limit=20`)
      .then((r) => r.json())
      .then((d) => setPosts(d.data ?? []))
      .catch(() => setError('Could not load posts.'))
      .finally(() => setLoading(false));
  }, []);

  const fmtDate = (iso: string) =>
    new Date(iso).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });

  return (
    <>
      <PageHeader
        heading="News"
        subheading="Updates, stories, and insights from Love's Legacy Rescue"
      />

      <section className="news-feed">
        <div className="section-inner">
          {loading && <p className="news-feed__status">Loading posts…</p>}
          {error && <p className="news-feed__status news-feed__status--error">{error}</p>}

          <div className="news-feed__grid">
            {posts.map((post) => {
              const text = post.message || post.story || '';
              return (
                <a
                  key={post.id}
                  className="news-card"
                  href={post.permalink_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {post.full_picture && (
                    <div className="news-card__photo">
                      <img src={post.full_picture} alt="" loading="lazy" />
                    </div>
                  )}
                  <div className="news-card__body">
                    <time className="news-card__date">{fmtDate(post.created_time)}</time>
                    <p className="news-card__text">{text}</p>
                    <span className="news-card__link">View on Facebook →</span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
