import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import triageValueBentoHtml from './triage-value-bento.snapshot.html?raw';
import KleardataIllustration from './KleardataIllustration';
import KlearhubIllustration from './KlearhubIllustration';
import {
  mountTriageValueBentoClone,
  prepareKleardataMount,
  prepareKlearhubMount,
  prepareReviewerMatchMount,
} from './triageValueBentoClone';
import TriageReviewerMatchAnimation from './TriageReviewerMatchAnimation';
import '../../styles/coderabbit-hero-bundle.css';
import '../../styles/coderabbit-triage-bundle.css';
import '../../styles/coderabbit-triage-clone.css';
import '../../styles/coderabbit-klearhub-illust.css';

const TriageValueSection = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);
  const [kleardataMount, setKleardataMount] = useState<HTMLElement | null>(null);
  const [klearhubMount, setKlearhubMount] = useState<HTMLElement | null>(null);
  const [reviewerMount, setReviewerMount] = useState<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    setKleardataMount(prepareKleardataMount(host));
    setKlearhubMount(prepareKlearhubMount(host));
    setReviewerMount(prepareReviewerMatchMount(host));

    const cleanup = mountTriageValueBentoClone(host);
    setIsReady(true);

    return () => {
      cleanup();
      setKleardataMount(null);
      setKlearhubMount(null);
      setReviewerMount(null);
    };
  }, []);

  return (
    <div className="cr-triage-value-section">
      <div className="container">
        <div
          ref={hostRef}
          className={`cr-triage-value-clone${isReady ? ' cr-triage-value-clone--ready' : ''}`}
          dangerouslySetInnerHTML={{ __html: triageValueBentoHtml }}
        />
        {kleardataMount && isReady
          ? createPortal(<KleardataIllustration />, kleardataMount)
          : null}
        {klearhubMount && isReady
          ? createPortal(<KlearhubIllustration />, klearhubMount)
          : null}
        {reviewerMount && isReady
          ? createPortal(<TriageReviewerMatchAnimation />, reviewerMount)
          : null}
      </div>
    </div>
  );
};

export default TriageValueSection;
