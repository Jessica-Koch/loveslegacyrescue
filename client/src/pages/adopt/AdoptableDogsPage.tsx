import { useState, useMemo } from 'react';
import './AdoptableDogsPage.scss';
import { useDogs } from '../../hooks/useDogs';
import PageHeader from '../../components/sections/PageHeader/PageHeader';
import Card from '../../components/atoms/Card/Card';
import DogModal from '../../components/atoms/DogModal/DogModal';
import type { Dog } from '../../types';

type FilterKey = 'all' | 'needs-foster' | 'in-foster' | 'male' | 'female';
type SortKey = 'name-asc' | 'name-desc' | 'age-asc' | 'age-desc';

export default function AdoptableDogsPage() {
  const { dogs, loading } = useDogs();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterKey>('all');
  const [sort, setSort] = useState<SortKey>('name-asc');
  const [selectedDog, setSelectedDog] = useState<Dog | null>(null);

  const filtered = useMemo(() => {
    let result = dogs;

    if (filter === 'needs-foster') result = result.filter((d) => !d.inFoster);
    else if (filter === 'in-foster') result = result.filter((d) => d.inFoster);
    else if (filter === 'male') result = result.filter((d) => d.sex?.toLowerCase() === 'male');
    else if (filter === 'female') result = result.filter((d) => d.sex?.toLowerCase() === 'female');

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          (d.breed?.toLowerCase().includes(q) ?? false),
      );
    }

    return [...result].sort((a, b) => {
      if (sort === 'name-asc') return a.name.localeCompare(b.name);
      if (sort === 'name-desc') return b.name.localeCompare(a.name);
      if (sort === 'age-asc') return (parseInt(a.age ?? '0') || 0) - (parseInt(b.age ?? '0') || 0);
      if (sort === 'age-desc') return (parseInt(b.age ?? '0') || 0) - (parseInt(a.age ?? '0') || 0);
      return 0;
    });
  }, [dogs, filter, search, sort]);

  const filters: { key: FilterKey; label: string }[] = [
    { key: 'all', label: 'All Dogs' },
    { key: 'needs-foster', label: 'Needs Foster' },
    { key: 'in-foster', label: 'In Foster' },
    { key: 'male', label: 'Male' },
    { key: 'female', label: 'Female' },
  ];

  if (loading) {
    return <div className="loading">Loading dogs…</div>;
  }

  return (
    <>
      <PageHeader
        heading="Adoptable Dogs"
        subheading={`${dogs.length} dogs looking for their forever home`}
      />

      <section className="dogs-section">
        <div className="section-inner">
          <div className="dog-controls">
            <div className="dog-controls__search">
              <input
                type="text"
                placeholder="Search by name or breed…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search dogs"
              />
            </div>
            <div className="dog-controls__filters">
              {filters.map(({ key, label }) => (
                <button
                  key={key}
                  className={`dog-controls__filter-btn${filter === key ? ' dog-controls__filter-btn--active' : ''}`}
                  onClick={() => setFilter(key)}
                  aria-pressed={filter === key}
                >
                  {label}
                </button>
              ))}
            </div>
            <select
              className="dog-controls__sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              aria-label="Sort dogs"
            >
              <option value="name-asc">Name (A–Z)</option>
              <option value="name-desc">Name (Z–A)</option>
              <option value="age-asc">Age (Youngest)</option>
              <option value="age-desc">Age (Oldest)</option>
            </select>
          </div>

          {filtered.length > 0 ? (
            <p className="dog-controls__count">
              Showing {filtered.length} dog{filtered.length !== 1 ? 's' : ''}
            </p>
          ) : (
            <p className="dog-controls__no-results">No dogs found matching your criteria.</p>
          )}

          <div className="dog-grid">
            {filtered.map((dog) => (
              <Card key={dog.id} dog={dog} onClick={setSelectedDog} />
            ))}
          </div>
        </div>
      </section>

      <DogModal dog={selectedDog} onClose={() => setSelectedDog(null)} />

      <section className="adopt-cost">
        <div className="section-inner">
          <h2 className="section-heading">Adoption Fees</h2>
          <p className="adopt-cost__text">
            Our adoption fees are a modest portion of the cost to rescue dogs and run our operations.
            Fees range from <strong>$400 to $650</strong> for puppies and rare breeds.
          </p>
          <div className="adopt-cost__infographic">
            <div className="adopt-cost__placeholder">Adoption fee breakdown infographic</div>
          </div>
        </div>
      </section>

      <section className="adopt-transport">
        <div className="section-inner">
          <h2 className="section-heading">Transport Available</h2>
          <p className="adopt-transport__text">
            We offer transport to <strong>Oregon, Washington, Wisconsin, Colorado, Canada</strong>, and more.
            Contact us for details on transport availability to your area.
          </p>
        </div>
      </section>

      <section className="adopt-seo">
        <div className="section-inner">
          <p className="adopt-seo__text">
            Looking for adoptable dogs in Marin County, CA? Love's Legacy Rescue has adoptable
            huskies in California, adoptable dogs in Northern California, and rescue dogs available
            in the Bay Area, CA. We also facilitate dog adoptions in Oregon, Washington, and
            Colorado. Adopt a rescue dog near you today.
          </p>
        </div>
      </section>
    </>
  );
}
