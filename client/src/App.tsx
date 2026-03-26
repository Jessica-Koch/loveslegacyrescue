import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DogsProvider } from './context/DogsContext';
import { Body as Layout } from './components/layout/Body/Body';

const HomePage = lazy(() => import('./pages/HomePage'));
const AdoptableDogsPage = lazy(() => import('./pages/adopt/AdoptableDogsPage'));
const ApplicationProcessPage = lazy(
  () => import('./pages/adopt/ApplicationProcessPage'),
);
const HappyTailsPage = lazy(() => import('./pages/adopt/HappyTailsPage'));
const FosterPage = lazy(() => import('./pages/foster/FosterPage'));
const AboutPage = lazy(() => import('./pages/about/AboutPage'));
const EventsPage = lazy(() => import('./pages/about/EventsPage'));
const NewsPage = lazy(() => import('./pages/about/NewsPage'));
const ResourcesPage = lazy(() => import('./pages/about/ResourcesPage'));
const PartnersPage = lazy(() => import('./pages/about/PartnersPage'));
const ContactPage = lazy(() => import('./pages/about/ContactPage'));
const DonatePage = lazy(() => import('./pages/donate/DonatePage'));
const AdminPage = lazy(() => import('./pages/admin/AdminPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

export default function App() {
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
}
