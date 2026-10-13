import { useLayoutEffect, useRef, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import heroFeatureCardsHtml from './hero-feature-cards.snapshot.html?raw';
import { mountHeroFeatureCardsClone } from './heroFeatureCardsClone';
import '../../styles/coderabbit-hero-bundle.css';
import '../../styles/coderabbit-hero-clone.css';

type HeroFeatureCardsProps = {
  /** Rendered inside the feature root, above the navy backdrop and under the cards */
  globeLayer?: ReactNode;
};

const HeroFeatureCards = ({ globeLayer }: HeroFeatureCardsProps) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [globeMount, setGlobeMount] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const cleanup = mountHeroFeatureCardsClone(host);
    setIsReady(true);
    return cleanup;
  }, []);

  // Mount once — do not depend on `globeLayer` (hero re-renders would remount Cobe and reset spin)
  useLayoutEffect(() => {
    if (!isReady || globeLayer == null) return;

    const host = hostRef.current;
    const featureRoot = host?.querySelector<HTMLElement>('.HeroFeatureCards-module__QnOXea__root');
    const cards = featureRoot?.querySelector('.HeroFeatureCards-module__QnOXea__cards');
    if (!featureRoot || !cards) return;

    const slot = document.createElement('div');
    slot.className = 'cr-cr-hero__globe-seam';
    slot.setAttribute('aria-hidden', 'true');
    featureRoot.insertBefore(slot, cards);
    setGlobeMount(slot);

    return () => {
      slot.remove();
      setGlobeMount(null);
    };
  }, [isReady, globeLayer != null]);

  return (
    <>
      <div
        ref={hostRef}
        className={`cr-coderabbit-feature-clone${isReady ? ' cr-coderabbit-feature-clone--ready' : ''}`}
        dangerouslySetInnerHTML={{ __html: heroFeatureCardsHtml }}
      />
      {globeMount && globeLayer ? createPortal(globeLayer, globeMount) : null}
    </>
  );
};

export default HeroFeatureCards;
