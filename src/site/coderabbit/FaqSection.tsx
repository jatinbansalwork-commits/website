import { useLayoutEffect, useRef } from 'react';
import faqSectionHtml from './faq-section.snapshot.html?raw';
import { mountFaqSectionClone } from './faqSectionClone';
import '../../styles/coderabbit-hero-bundle.css';
import '../../styles/coderabbit-triage-bundle.css';
import '../../styles/coderabbit-faq-section.css';

const FaqSection = () => {
  const hostRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (!host.dataset.faqSeeded) {
      host.innerHTML = faqSectionHtml;
      host.dataset.faqSeeded = 'true';
    }

    mountFaqSectionClone(host);
  }, []);

  return (
    <div className="cr-faq-section" aria-labelledby="faq-heading">
      <div ref={hostRef} className="cr-faq-section-clone" />
    </div>
  );
};

export default FaqSection;
