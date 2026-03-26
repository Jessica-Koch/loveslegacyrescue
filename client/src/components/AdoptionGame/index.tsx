import { useState } from 'react';
import type { Dog } from '../../types';
import './AdoptionGame.scss';

// ── Types ─────────────────────────────────────────────────────

type Screen = 'title' | 'map' | 'play' | 'victory';
type Theme = 'plains' | 'underground' | 'snow' | 'castle';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  housingType: string;
  ownRent: string;
  hasYard: string;
  yardFenced: string;
  currentPets: string;
  petDetails: string;
  huskyExperience: string;
  hoursAlone: string;
  activityLevel: string;
  whyAdopt: string;
  interestedDog: string;
}

const EMPTY_FORM: FormData = {
  firstName: '', lastName: '', email: '', phone: '', city: '', state: '',
  housingType: '', ownRent: '', hasYard: '', yardFenced: '',
  currentPets: '', petDetails: '', huskyExperience: '',
  hoursAlone: '', activityLevel: '', whyAdopt: '', interestedDog: '',
};

// ── Level config ──────────────────────────────────────────────

interface Level {
  world: string;
  title: string;
  theme: Theme;
}

const LEVELS: Level[] = [
  { world: '1-1', title: 'FIND YOUR MATCH',      theme: 'plains'      },
  { world: '1-2', title: 'YOUR APPLICATION',      theme: 'plains'      },
  { world: '2-1', title: 'APPLICATION REVIEW',    theme: 'underground' },
  { world: '2-2', title: 'VIDEO INTERVIEW',        theme: 'snow'        },
  { world: '3-1', title: 'MEET YOUR DOG',          theme: 'castle'      },
];

// ── Component ─────────────────────────────────────────────────

interface Props {
  dogs: Dog[];
  onViewChange: (view: 'dogs' | 'admin' | 'adopt') => void;
}

export default function AdoptionGame({ dogs, onViewChange }: Props) {
  const [screen, setScreen]       = useState<Screen>('title');
  const [step, setStep]           = useState(0);
  const [formPage, setFormPage]   = useState(0);
  const [formData, setFormData]   = useState<FormData>(EMPTY_FORM);
  const [completed, setCompleted] = useState<Set<number>>(new Set());

  function startGame() {
    setScreen('map');
  }

  function playLevel(i: number) {
    setStep(i);
    setFormPage(0);
    setScreen('play');
  }

  function completeLevel() {
    const next = step + 1;
    setCompleted(prev => new Set([...prev, step]));
    if (next >= LEVELS.length) {
      setScreen('victory');
    } else {
      setStep(next);
      setFormPage(0);
      setScreen('map');
    }
  }

  function set(field: keyof FormData, value: string) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  const level = LEVELS[step];

  // ── Title screen ─────────────────────────────────────────────

  if (screen === 'title') {
    return (
      <div className="ag ag--title">
        <div className="ag__scene">
          <div className="ag__cloud ag__cloud--a" />
          <div className="ag__cloud ag__cloud--b" />
          <div className="ag__cloud ag__cloud--c" />
          <div className="ag__title-content">
            <p className="ag__brand-label">LOVE'S LEGACY RESCUE PRESENTS</p>
            <h1 className="ag__game-title">
              <span>SUPER</span>
              <span>HUSKY</span>
              <span>BROS.</span>
            </h1>
            <div className="ag__title-sub">ADOPTION QUEST</div>
            <div className="ag__husky ag__husky--bounce" aria-hidden="true">🐺</div>
            <button className="ag__press-start" onClick={startGame}>
              ▶ PRESS START
            </button>
            <div className="ag__coin-row" aria-hidden="true">
              <span className="ag__coin">🪙</span>
              <span className="ag__coin">🪙</span>
              <span className="ag__coin">🪙</span>
              <span className="ag__coin">🪙</span>
              <span className="ag__coin">🪙</span>
            </div>
            <p className="ag__copyright">© 2026 LOVE'S LEGACY RESCUE · MARIN COUNTY, CA</p>
          </div>
          <div className="ag__ground-row ag__ground-row--title">
            <div className="ag__pipe" />
            <div className="ag__brick ag__brick--q">?</div>
            <div className="ag__brick" />
            <div className="ag__brick ag__brick--q">?</div>
            <div className="ag__brick" />
            <div className="ag__brick ag__brick--q">?</div>
            <div className="ag__pipe" />
          </div>
        </div>
      </div>
    );
  }

  // ── World map ─────────────────────────────────────────────────

  if (screen === 'map') {
    return (
      <div className="ag ag--map">
        <div className="ag__hud">
          <div className="ag__hud-stat">
            <div className="ag__hud-label">HUSKY</div>
            <div className="ag__hud-val">🐺 × 3</div>
          </div>
          <div className="ag__hud-stat ag__hud-stat--center">
            <div className="ag__hud-label">WORLD MAP</div>
            <div className="ag__hud-val">SELECT QUEST</div>
          </div>
          <div className="ag__hud-stat">
            <div className="ag__hud-label">COINS</div>
            <div className="ag__hud-val">{completed.size} / 5</div>
          </div>
        </div>
        <div className="ag__scene">
          <div className="ag__cloud ag__cloud--a" />
          <div className="ag__cloud ag__cloud--b" />
          <h2 className="ag__map-heading">SELECT YOUR QUEST</h2>
          <div className="ag__map-levels">
            {LEVELS.map((lvl, i) => {
              const isDone   = completed.has(i);
              const isActive = i === step;
              const isLocked = !isDone && i > step;
              return (
                <button
                  key={lvl.world}
                  className={`ag__map-level${isDone ? ' is-done' : ''}${isActive ? ' is-active' : ''}${isLocked ? ' is-locked' : ''}`}
                  onClick={() => !isLocked && playLevel(i)}
                  disabled={isLocked}
                >
                  <span className="ag__map-world">WORLD {lvl.world}</span>
                  <span className="ag__map-icon">
                    {isDone ? '⭐' : isActive ? '🐺' : isLocked ? '🔒' : '?'}
                  </span>
                  <span className="ag__map-title">{lvl.title}</span>
                </button>
              );
            })}
          </div>
          <div className="ag__ground-row ag__ground-row--map" />
        </div>
      </div>
    );
  }

  // ── Victory screen ────────────────────────────────────────────

  if (screen === 'victory') {
    const starPositions = [
      [5,10],[15,60],[25,20],[35,75],[45,5],[55,50],[65,30],[75,80],[85,15],[10,45],[50,90],[90,35],
    ];
    return (
      <div className="ag ag--victory">
        <div className="ag__victory-bg" aria-hidden="true">
          {starPositions.map(([left, top], i) => (
            <span
              key={i}
              className="ag__vstar"
              style={{ left: `${left}%`, top: `${top}%`, animationDelay: `${i * 0.18}s` }}
            >★</span>
          ))}
        </div>
        <div className="ag__victory-content">
          <h1 className="ag__victory-title">YOU WIN!</h1>
          <div className="ag__husky ag__husky--celebrate" aria-hidden="true">🐺</div>
          <p className="ag__victory-sub">APPLICATION SUBMITTED!</p>
          <div className="ag__victory-msg">
            THANK YOU FOR YOUR INTEREST IN<br />
            ADOPTING FROM LOVE'S LEGACY RESCUE.<br />
            OUR TEAM WILL CONTACT YOU<br />
            WITHIN 2–3 BUSINESS DAYS.
          </div>
          <div className="ag__victory-score">
            <div><span>WORLDS CLEARED</span><span>5 / 5</span></div>
            <div><span>COINS EARNED</span><span>⭐⭐⭐⭐⭐</span></div>
          </div>
          <button className="ag__btn ag__btn--primary" onClick={() => { setScreen('title'); onViewChange('dogs'); }}>
            ← BACK TO DOGS
          </button>
        </div>
      </div>
    );
  }

  // ── Play screen ───────────────────────────────────────────────

  return (
    <div className={`ag ag--play ag--${level.theme}`}>
      <div className="ag__hud">
        <div className="ag__hud-stat">
          <div className="ag__hud-label">HUSKY</div>
          <div className="ag__hud-val">🐺 × 3</div>
        </div>
        <div className="ag__hud-stat ag__hud-stat--center">
          <div className="ag__hud-label">WORLD</div>
          <div className="ag__hud-val">{level.world}</div>
        </div>
        <div className="ag__hud-stat">
          <div className="ag__hud-label">COINS</div>
          <div className="ag__hud-val">{completed.size} / 5</div>
        </div>
      </div>
      <div className="ag__scene">
        <div className="ag__cloud ag__cloud--a" />
        <div className="ag__cloud ag__cloud--b" />
        <div className="ag__cloud ag__cloud--c" />
        <div className="ag__level-banner">
          <span className="ag__level-banner-world">WORLD {level.world}</span>
          <span className="ag__level-banner-title">{level.title}</span>
        </div>
        <div className="ag__dialog">
          {step === 0 && (
            <Step11
              dogs={dogs}
              formData={formData}
              set={set}
              onComplete={completeLevel}
            />
          )}
          {step === 1 && (
            <Step12
              formData={formData}
              set={set}
              page={formPage}
              setPage={setFormPage}
              onComplete={completeLevel}
            />
          )}
          {step === 2 && <Step21 onComplete={completeLevel} />}
          {step === 3 && <Step22 onComplete={completeLevel} />}
          {step === 4 && <Step31 onComplete={completeLevel} />}
        </div>
        <div className="ag__ground-row">
          <div className="ag__brick ag__brick--q">?</div>
          <div className="ag__brick" />
          <div className="ag__brick" />
          <div className="ag__brick ag__brick--q">?</div>
          <div className="ag__brick" />
          <div className="ag__husky ag__husky--bounce" aria-hidden="true">🐺</div>
          <div className="ag__pipe" />
        </div>
      </div>
    </div>
  );
}

// ── Step 1-1: Find Your Match ─────────────────────────────────

interface Step11Props {
  dogs: Dog[];
  formData: FormData;
  set: (f: keyof FormData, v: string) => void;
  onComplete: () => void;
}

function Step11({ dogs, formData, set, onComplete }: Step11Props) {
  return (
    <div className="ag__step">
      <h2 className="ag__step-title">🐾 FIND YOUR MATCH</h2>
      <p className="ag__step-desc">
        BROWSE OUR PACK! TAP A DOG YOU'RE<br />
        INTERESTED IN, OR CONTINUE IF YOU'RE<br />
        OPEN TO MEETING ANY OF OUR RESCUES.
      </p>
      {dogs.length > 0 ? (
        <div className="ag__dog-grid">
          {dogs.slice(0, 8).map(dog => (
            <button
              key={dog.id}
              className={`ag__dog-card${formData.interestedDog === dog.id ? ' is-selected' : ''}`}
              onClick={() => set('interestedDog', formData.interestedDog === dog.id ? '' : dog.id)}
            >
              <div className="ag__dog-photo">
                {dog.photoUrls[0]
                  ? <img src={dog.photoUrls[0]} alt={dog.name} />
                  : <span>🐾</span>
                }
              </div>
              <div className="ag__dog-name">{dog.name.toUpperCase()}</div>
              {formData.interestedDog === dog.id && (
                <div className="ag__dog-check">✓ CHOSEN!</div>
              )}
            </button>
          ))}
        </div>
      ) : (
        <div className="ag__info-box">
          🐺 LOADING THE PACK...<br />
          CONTINUE TO BEGIN YOUR QUEST!
        </div>
      )}
      {formData.interestedDog && (
        <p className="ag__blink-msg">
          ★ {dogs.find(d => d.id === formData.interestedDog)?.name.toUpperCase()} SELECTED!
        </p>
      )}
      <button className="ag__btn ag__btn--primary" onClick={onComplete}>
        CONTINUE QUEST →
      </button>
    </div>
  );
}

// ── Step 1-2: Application form ────────────────────────────────

interface Step12Props {
  formData: FormData;
  set: (f: keyof FormData, v: string) => void;
  page: number;
  setPage: (p: number) => void;
  onComplete: () => void;
}

function Step12({ formData, set, page, setPage, onComplete }: Step12Props) {
  const totalPages = 4;

  function next() {
    if (page < totalPages - 1) setPage(page + 1);
    else onComplete();
  }

  function back() {
    if (page > 0) setPage(page - 1);
  }

  return (
    <div className="ag__step">
      <div className="ag__form-header">
        <div className="ag__form-pips">
          {Array.from({ length: totalPages }, (_, i) => (
            <div key={i} className={`ag__pip${i <= page ? ' is-active' : ''}`} />
          ))}
        </div>
        <span className="ag__form-stage">STAGE {page + 1} / {totalPages}</span>
      </div>

      {page === 0 && <FormAboutYou formData={formData} set={set} />}
      {page === 1 && <FormYourHome formData={formData} set={set} />}
      {page === 2 && <FormYourPack formData={formData} set={set} />}
      {page === 3 && <FormYourWhy  formData={formData} set={set} />}

      <div className="ag__form-nav">
        {page > 0 && (
          <button className="ag__btn ag__btn--secondary" onClick={back}>← BACK</button>
        )}
        <button className="ag__btn ag__btn--primary" onClick={next}>
          {page < totalPages - 1 ? 'NEXT STAGE →' : 'SUBMIT APPLICATION →'}
        </button>
      </div>
    </div>
  );
}

interface FormProps {
  formData: FormData;
  set: (f: keyof FormData, v: string) => void;
}

function FormAboutYou({ formData, set }: FormProps) {
  return (
    <div className="ag__form-page">
      <h3 className="ag__form-heading">👤 ABOUT YOU</h3>
      <div className="ag__fields-2col">
        <Field label="FIRST NAME *">
          <input className="ag__input" value={formData.firstName} onChange={e => set('firstName', e.target.value)} placeholder="LINK" />
        </Field>
        <Field label="LAST NAME *">
          <input className="ag__input" value={formData.lastName} onChange={e => set('lastName', e.target.value)} placeholder="HERO" />
        </Field>
      </div>
      <Field label="EMAIL *">
        <input className="ag__input" type="email" value={formData.email} onChange={e => set('email', e.target.value)} placeholder="HERO@HYRULE.COM" />
      </Field>
      <Field label="PHONE *">
        <input className="ag__input" type="tel" value={formData.phone} onChange={e => set('phone', e.target.value)} placeholder="(555) 000-0000" />
      </Field>
      <div className="ag__fields-2col">
        <Field label="CITY *">
          <input className="ag__input" value={formData.city} onChange={e => set('city', e.target.value)} placeholder="MARIN COUNTY" />
        </Field>
        <Field label="STATE *">
          <input className="ag__input" value={formData.state} onChange={e => set('state', e.target.value)} placeholder="CA" maxLength={2} />
        </Field>
      </div>
    </div>
  );
}

function FormYourHome({ formData, set }: FormProps) {
  return (
    <div className="ag__form-page">
      <h3 className="ag__form-heading">🏠 YOUR HOME BASE</h3>
      <Field label="HOUSING TYPE *">
        <RadioGroup
          name="housingType"
          options={['HOUSE', 'APARTMENT', 'CONDO', 'TOWNHOUSE', 'OTHER']}
          value={formData.housingType}
          onChange={v => set('housingType', v)}
        />
      </Field>
      <Field label="OWN OR RENT? *">
        <RadioGroup
          name="ownRent"
          options={['OWN', 'RENT']}
          value={formData.ownRent}
          onChange={v => set('ownRent', v)}
        />
      </Field>
      <Field label="DO YOU HAVE A YARD? *">
        <RadioGroup
          name="hasYard"
          options={['YES', 'NO']}
          value={formData.hasYard}
          onChange={v => set('hasYard', v)}
        />
      </Field>
      {formData.hasYard === 'YES' && (
        <Field label="IS THE YARD FENCED? *">
          <RadioGroup
            name="yardFenced"
            options={['YES — FULLY', 'YES — PARTIALLY', 'NO']}
            value={formData.yardFenced}
            onChange={v => set('yardFenced', v)}
          />
        </Field>
      )}
    </div>
  );
}

function FormYourPack({ formData, set }: FormProps) {
  return (
    <div className="ag__form-page">
      <h3 className="ag__form-heading">🐾 YOUR PACK</h3>
      <Field label="DO YOU CURRENTLY HAVE PETS? *">
        <RadioGroup
          name="currentPets"
          options={['YES', 'NO']}
          value={formData.currentPets}
          onChange={v => set('currentPets', v)}
        />
      </Field>
      {formData.currentPets === 'YES' && (
        <Field label="TELL US ABOUT YOUR PETS">
          <textarea
            className="ag__input ag__textarea"
            value={formData.petDetails}
            onChange={e => set('petDetails', e.target.value)}
            placeholder="SPECIES, BREED, AGE, SPAYED/NEUTERED..."
            rows={3}
          />
        </Field>
      )}
      <Field label="HUSKY / SLED DOG EXPERIENCE? *">
        <RadioGroup
          name="huskyExperience"
          options={['NONE', 'SOME', 'VERY EXPERIENCED']}
          value={formData.huskyExperience}
          onChange={v => set('huskyExperience', v)}
        />
      </Field>
      <Field label="HOURS ALONE PER DAY *">
        <RadioGroup
          name="hoursAlone"
          options={['0–2 HRS', '2–4 HRS', '4–6 HRS', '6–8 HRS', '8+ HRS']}
          value={formData.hoursAlone}
          onChange={v => set('hoursAlone', v)}
        />
      </Field>
    </div>
  );
}

function FormYourWhy({ formData, set }: FormProps) {
  return (
    <div className="ag__form-page">
      <h3 className="ag__form-heading">⭐ YOUR MISSION</h3>
      <Field label="ACTIVITY LEVEL *">
        <RadioGroup
          name="activityLevel"
          options={['COUCH HERO', 'CASUAL WALKER', 'ACTIVE ADVENTURER', 'ULTRA ATHLETE']}
          value={formData.activityLevel}
          onChange={v => set('activityLevel', v)}
        />
      </Field>
      <Field label="WHY DO YOU WANT TO ADOPT? *">
        <textarea
          className="ag__input ag__textarea"
          value={formData.whyAdopt}
          onChange={e => set('whyAdopt', e.target.value)}
          placeholder="TELL US YOUR STORY AND WHY YOU'D BE A GREAT MATCH..."
          rows={4}
        />
      </Field>
    </div>
  );
}

// ── Step 2-1: Application Review ──────────────────────────────

function Step21({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="ag__step">
      <h2 className="ag__step-title">📋 APPLICATION REVIEW</h2>
      <div className="ag__info-box">
        <div className="ag__loading-bar"><div className="ag__loading-fill" /></div>
        <p className="ag__step-desc">
          OUR ADOPTION TEAM CAREFULLY REVIEWS<br />
          EVERY APPLICATION.<br />
          <br />
          ⏱ RESPONSE TIME: 2–3 BUSINESS DAYS<br />
          <br />
          IF WE NEED MORE INFORMATION, WE'LL<br />
          REACH OUT VIA EMAIL OR PHONE.
        </p>
      </div>
      <button className="ag__btn ag__btn--primary" onClick={onComplete}>
        UNDERSTOOD! NEXT LEVEL →
      </button>
    </div>
  );
}

// ── Step 2-2: Video Interview ─────────────────────────────────

function Step22({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="ag__step">
      <h2 className="ag__step-title">🎥 VIDEO INTERVIEW</h2>
      <div className="ag__info-box">
        <p className="ag__step-desc">
          ONCE YOUR APPLICATION IS APPROVED,<br />
          WE'LL SCHEDULE A VIRTUAL HOME TOUR!<br />
          <br />
          THIS ALLOWS US TO:<br />
          ★ GET TO KNOW YOU & YOUR HOUSEHOLD<br />
          ★ SEE YOUR HOME ENVIRONMENT<br />
          ★ ANSWER ALL YOUR QUESTIONS<br />
          ★ PLAN THE TRANSITION TOGETHER<br />
          <br />
          IT'S THE BOSS LEVEL BEFORE YOU MEET<br />
          YOUR NEW BEST FRIEND! 🐺
        </p>
      </div>
      <button className="ag__btn ag__btn--primary" onClick={onComplete}>
        READY FOR THE BOSS! →
      </button>
    </div>
  );
}

// ── Step 3-1: Meet Your Dog ───────────────────────────────────

function Step31({ onComplete }: { onComplete: () => void }) {
  return (
    <div className="ag__step">
      <h2 className="ag__step-title">🐾 MEET YOUR DOG!</h2>
      <div className="ag__info-box">
        <p className="ag__step-desc">
          OUR DOGS LIVE IN LOVING FOSTER<br />
          HOMES — NOT A SHELTER!<br />
          <br />
          ONCE APPROVED, WE'LL COORDINATE<br />
          A MEET & GREET WITH YOUR FUTURE<br />
          COMPANION.<br />
          <br />
          ★ FOSTER FAMILIES KNOW EACH DOG'S<br />
          {'  '}PERSONALITY INSIDE AND OUT<br />
          ★ MEET IN A COMFORTABLE HOME SETTING<br />
          ★ TAKE YOUR TIME — NO PRESSURE!<br />
          <br />
          YOUR FOREVER FRIEND IS WAITING! 🏡
        </p>
      </div>
      <button className="ag__btn ag__btn--primary ag__btn--gold" onClick={onComplete}>
        🎉 COMPLETE QUEST!
      </button>
    </div>
  );
}

// ── Shared sub-components ─────────────────────────────────────

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="ag__field">
      <span className="ag__field-label">{label}</span>
      {children}
    </div>
  );
}

interface RadioGroupProps {
  name: string;
  options: string[];
  value: string;
  onChange: (v: string) => void;
}

function RadioGroup({ name, options, value, onChange }: RadioGroupProps) {
  return (
    <div className="ag__radio-group">
      {options.map(opt => (
        <label key={opt} className={`ag__radio${value === opt ? ' is-active' : ''}`}>
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={() => onChange(opt)}
          />
          {opt}
        </label>
      ))}
    </div>
  );
}
