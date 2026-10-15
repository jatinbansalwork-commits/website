import { useMemo, useState } from 'react';
import { Globe } from '../../components/ui/cobe-globe';
import HeroFeatureCards from './HeroFeatureCards';
import HeroPhraseCycle, { type HeroPhrase } from './HeroPhraseCycle';

const HERO_GLOBE_ARCS = [
  { id: 'la-shanghai', from: [34.0522, -118.2437] as [number, number], to: [31.2304, 121.4737] as [number, number] },
  { id: 'rotterdam-nyc', from: [51.9244, 4.4777] as [number, number], to: [40.7128, -74.006] as [number, number] },
  { id: 'dubai-singapore', from: [25.2048, 55.2708] as [number, number], to: [1.3521, 103.8198] as [number, number] },
];

const KlearNowHero = () => {
  const [activePhrase, setActivePhrase] = useState<HeroPhrase>('evolved.');

  const heroGlobe = useMemo(
    () => (
      <Globe
        arcs={HERO_GLOBE_ARCS}
        interactive={false}
        speed={0.004}
        mapBrightness={5}
        opacity={0.9}
      />
    ),
    [],
  );

  return (
    <section className="cr-cr-hero" aria-labelledby="cr-cr-hero-title">
      <div className="container cr-cr-hero__inner">
        <div className="cr-cr-hero__root" data-workflow-active-card="review">
          <div className="cr-cr-hero__intro">
            <div className="cr-cr-hero__story">
              <p className="cr-cr-hero__kicker">AI-powered global trade</p>
              <h1
                id="cr-cr-hero-title"
                className="cr-cr-hero__title"
                aria-label={`Your shipment partner. It's ${activePhrase}`}
              >
                <span className="cr-cr-hero__title-line cr-cr-hero__title-line--lead">
                  Your shipment partner.
                </span>{' '}
                <span className="cr-cr-hero__title-line cr-cr-hero__title-line--cycle">
                  <span className="cr-cr-hero__title-it">It&apos;s </span>
                  <HeroPhraseCycle onPhraseChange={setActivePhrase} />
                </span>
              </h1>
            </div>
            <div className="cr-cr-hero__aside">
              <p className="cr-cr-hero__lede">
                KlearNow leverages AI to structure data from trade documents, track inventory in motion,
                enable exception management, facilitate customs filings and complete compliance audits,
                globally, all in one platform.
              </p>
              <a className="cr-trial cr-cr-hero__cta" href="#talk-to-klear">
                Talk to Klear&nbsp;→
              </a>
            </div>
          </div>
          <div className="cr-cr-hero__feature-mount">
            <span className="cr-cr-hero__workflow-key-light" aria-hidden="true" />
            <span className="cr-cr-hero__workflow-floor-light" aria-hidden="true" />
            <HeroFeatureCards globeLayer={heroGlobe} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default KlearNowHero;
