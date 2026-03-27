import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DogsProvider } from './context/DogsContext';
import { Body as Layout } from './components/layout/Body/Body';

const wrap = <T extends Record<string, React.ComponentType>>(
  fn: () => Promise<T>,
  key: keyof T,
) => lazy(() => fn().then((m) => ({ default: m[key] as React.ComponentType })));

const HomePage = wrap(() => import('./pages/HomePage'), 'HomePage');
const AdoptableDogsPage = wrap(() => import('./pages/adopt/AdoptableDogsPage'), 'AdoptableDogsPage');
const ApplicationProcessPage = wrap(() => import('./pages/adopt/ApplicationProcessPage'), 'ApplicationProcessPage');
const HappyTailsPage = wrap(() => import('./pages/adopt/HappyTailsPage'), 'HappyTailsPage');
const FosterPage = wrap(() => import('./pages/foster/FosterPage'), 'FosterPage');
const AboutPage = wrap(() => import('./pages/about/AboutPage'), 'AboutPage');
const EventsPage = wrap(() => import('./pages/about/EventsPage'), 'EventsPage');
const NewsPage = wrap(() => import('./pages/about/NewsPage'), 'NewsPage');
const ResourcesPage = wrap(() => import('./pages/about/ResourcesPage'), 'ResourcesPage');
const PartnersPage = wrap(() => import('./pages/about/PartnersPage'), 'PartnersPage');
const ContactPage = wrap(() => import('./pages/about/ContactPage'), 'ContactPage');
const DonatePage = wrap(() => import('./pages/donate/DonatePage'), 'DonatePage');
const AdminPage = wrap(() => import('./pages/admin/AdminPage'), 'AdminPage');
const NotFoundPage = wrap(() => import('./pages/NotFoundPage'), 'NotFoundPage');

export const App = () => {
  return (
    <BrowserRouter>
      <DogsProvider>
        <Suspense fallback={<div className='loading'>Loading…</div>}>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<HomePage />} />
              <Route path='adopt/dogs' element={<AdoptableDogsPage />} />
              <Route path='adopt/apply' element={<ApplicationProcessPage />} />
              <Route path='adopt/happy-tails' element={<HappyTailsPage />} />
              <Route path='foster' element={<FosterPage />} />
              <Route path='about' element={<AboutPage />} />
              <Route path='about/events' element={<EventsPage />} />
              <Route path='about/news' element={<NewsPage />} />
              <Route path='about/resources' element={<ResourcesPage />} />
              <Route path='about/partners' element={<PartnersPage />} />
              <Route path='about/contact' element={<ContactPage />} />
              <Route path='donate' element={<DonatePage />} />
              <Route path='admin' element={<AdminPage />} />
              <Route path='*' element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </DogsProvider>
    </BrowserRouter>
  );
};
