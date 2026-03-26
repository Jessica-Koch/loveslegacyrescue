import './Footer.scss';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__inner'>
        <div className='footer__col'>
          <div className='footer__brand'>
            <span className='footer__paw'>🐾</span>
            <span className='footer__name'>Love's Legacy Rescue</span>
          </div>
          <p className='footer__tagline'>
            Saving at-risk dogs from crowded Southern California shelters and
            finding their forever homes.
          </p>
        </div>

        <div className='footer__col'>
          <h4 className='footer__heading'>Quick Links</h4>
          <nav className='footer__links' aria-label='Footer navigation'>
            <Link to='/adopt/dogs'>Adoptable Dogs</Link>
            <Link to='/foster'>Foster</Link>
            <Link to='/donate'>Donate</Link>
            <Link to='/about'>About Us</Link>
            <Link to='/about/partners'>Partners</Link>
          </nav>
        </div>

        <div className='footer__col'>
          <h4 className='footer__heading'>Contact</h4>
          <div className='footer__contact'>
            <a href='mailto:info@loveslegacyrescue.com'>
              info@loveslegacyrescue.com
            </a>
            <p>
              PO Box 195
              <br />
              Mill Valley, CA 94942
            </p>
            <p>EIN: 99-0445232</p>
          </div>
        </div>

        <div className='footer__col'>
          <h4 className='footer__heading'>Follow Us</h4>
          <div className='footer__social'>
            <a
              href='https://www.instagram.com/loveslegacyrescue'
              target='_blank'
              rel='noreferrer'
            >
              Instagram
            </a>
            <a
              href='https://www.facebook.com/loveslegacyrescue'
              target='_blank'
              rel='noreferrer'
            >
              Facebook
            </a>
          </div>
        </div>
      </div>

      <div className='footer__bottom'>
        <p>Love's Legacy Rescue &copy; {new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};
