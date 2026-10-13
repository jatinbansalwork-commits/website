import KlearNowHero from './coderabbit/KlearNowHero';
import KlearNowSocialProof from './coderabbit/KlearNowSocialProof';
import ChangeStackLayersSection from './coderabbit/ChangeStackLayersSection';
import ReviewsSurfacesSection from './coderabbit/ReviewsSurfacesSection';
import SharedIntelligenceSection from './coderabbit/SharedIntelligenceSection';
import SiteFooter from './SiteFooter';
import SiteHeader from './SiteHeader';

const HomePage = () => (
    <>
      <SiteHeader />

      <main id="content">
        <KlearNowHero />
        <KlearNowSocialProof />
        <ReviewsSurfacesSection />
        <ChangeStackLayersSection />
        <SharedIntelligenceSection />

      </main>

      <SiteFooter />
    </>
);

export default HomePage;
