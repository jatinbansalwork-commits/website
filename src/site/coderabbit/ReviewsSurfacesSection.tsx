import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import reviewsSurfacesHtml from './reviews-surfaces.snapshot.html?raw';
import SurfacesVisualCanvas from './SurfacesVisualCanvas';
import {
  REVIEWS_SURFACE_KIND_TO_CARD,
  TRIAGE_CARD_COPY,
  prepareReviewsSurfaceCtaMounts,
  type ReviewsSurfaceCtaMount,
} from './klearTriageCardCopy';
import {
  mountReviewsSurfacesClone,
  prepareReviewsSurfacesCanvasMounts,
  type SurfaceCanvasMount,
} from './reviewsSurfacesClone';
import SurfaceExploreLink from './SurfaceExploreLink';
import '../../styles/coderabbit-hero-bundle.css';
import '../../styles/coderabbit-triage-bundle.css';
import '../../styles/coderabbit-reviews-surfaces.css';

const ReviewsSurfacesSection = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [canvasMounts, setCanvasMounts] = useState<SurfaceCanvasMount[]>([]);
  const [ctaMounts, setCtaMounts] = useState<ReviewsSurfaceCtaMount[]>([]);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    // Seed snapshot once — re-applying innerHTML on state updates would wipe portal mount nodes.
    if (!host.dataset.surfacesSeeded) {
      host.innerHTML = reviewsSurfacesHtml;
      host.dataset.surfacesSeeded = 'true';
    }

    setCanvasMounts(prepareReviewsSurfacesCanvasMounts(host));
    mountReviewsSurfacesClone(host);
    setCtaMounts(prepareReviewsSurfaceCtaMounts(host));
    setIsReady(true);

    return () => {
      setCanvasMounts([]);
      setCtaMounts([]);
      setIsReady(false);
    };
  }, []);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host || !isReady) return;
    setCtaMounts(prepareReviewsSurfaceCtaMounts(host));
  }, [isReady, canvasMounts]);

  return (
    <div className="cr-reviews-surfaces-section">
      <div
        ref={hostRef}
        className={`cr-reviews-surfaces-clone${isReady ? ' cr-reviews-surfaces-clone--ready' : ''}`}
      />
      {isReady
        ? canvasMounts.map(({ kind, node }) =>
            createPortal(<SurfacesVisualCanvas kind={kind} />, node),
          )
        : null}
      {isReady
        ? ctaMounts.map(({ kind, node }) => {
            const cardKey = REVIEWS_SURFACE_KIND_TO_CARD[kind];
            const href = TRIAGE_CARD_COPY[cardKey]?.ctaHref ?? '#talk-to-klear';
            return createPortal(<SurfaceExploreLink href={href} />, node, kind);
          })
        : null}
    </div>
  );
};

export default ReviewsSurfacesSection;
