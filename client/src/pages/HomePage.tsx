import HeroSection from '../components/sections/HeroSection/HeroSection';
import FeaturedDog from '../components/sections/FeaturedDog/FeaturedDog';
import HowToHelp from '../components/sections/HowToHelp/HowToHelp';
import LatestUpdates from '../components/sections/LatestUpdates/LatestUpdates';
import EmailSubscribe from '../components/sections/EmailSubscribe/EmailSubscribe';
import StickyDonate from '../components/sections/StickyDonate/StickyDonate';
import ThemeSwitcher from '../components/sections/ThemeSwitcher/ThemeSwitcher';

export default function HomePage() {
  return (
    <>
      <HeroSection
        heading="Rescue. Love."
        subheading="Saving at-risk dogs from crowded Southern California shelters — and finding their forever homes."
        ctaText="Meet Our Dogs"
        ctaTo="/adopt/dogs"
      />
      <FeaturedDog />
      <HowToHelp />
      <LatestUpdates />
      <EmailSubscribe />
      <StickyDonate />
      <ThemeSwitcher />
    </>
  );
}
