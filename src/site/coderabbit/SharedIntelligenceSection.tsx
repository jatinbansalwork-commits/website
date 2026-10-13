import { useCallback, useEffect, useRef, useState, type CSSProperties } from 'react';
import {
  SHARED_INTELLIGENCE_SECTION,
  SHARED_INTELLIGENCE_STEPS,
} from './sharedIntelligenceCopy';
import '../../styles/coderabbit-shared-intelligence.css';

const CR_MARKETING_CONTAINER =
  'container mx-auto w-full px-4 sm:max-w-none md:max-w-none md:px-6 lg:max-w-[80rem] lg:px-12 xl:max-w-[120rem] xl:px-30';

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const DESKTOP_SCROLL_MQ = '(min-width: 48rem)';

const readStickyTopPx = (stickyEl: HTMLElement | null) => {
  if (!stickyEl) return 80;
  const top = window.getComputedStyle(stickyEl).top;
  const parsed = Number.parseFloat(top);
  return Number.isFinite(parsed) ? parsed : 80;
};

const getScrollSegmentMetrics = (scrollEl: HTMLElement, stickyTopPx: number) => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const rect = scrollEl.getBoundingClientRect();
  const sectionTop = scrollTop + rect.top;
  const scrollRange = scrollEl.offsetHeight - window.innerHeight;
  if (scrollRange <= 0) return null;
  const segmentStart = sectionTop - stickyTopPx;
  const scrolled = clamp(scrollTop - segmentStart, 0, scrollRange);
  const progress = scrolled / scrollRange;
  return { scrollRange, segmentStart, progress, scrolled };
};

/** Matches CodeRabbit shared-intelligence canvas layout (797×608 CSS px at desktop). */
const SHARED_INTELLIGENCE_VISUAL_PLACEHOLDER_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='797' height='608' viewBox='0 0 797 608'%3E%3Crect width='797' height='608' fill='%23151318'/%3E%3C/svg%3E";

const SharedIntelligenceSection = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeIndexRef = useRef(0);
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [indicatorHeight, setIndicatorHeight] = useState(0);

  const stepCount = SHARED_INTELLIGENCE_STEPS.length;

  activeIndexRef.current = activeIndex;

  const syncIndicator = useCallback((index: number) => {
    const tab = tabRefs.current[index];
    const menu = tab?.closest('[data-shared-intelligence-menu]');
    if (!tab || !menu) return;
    const menuRect = menu.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    setIndicatorTop(tabRect.top - menuRect.top);
    setIndicatorHeight(tabRect.height);
  }, []);

  const selectIndex = useCallback(
    (index: number) => {
      const next = clamp(index, 0, stepCount - 1);
      setActiveIndex(next);
      syncIndicator(next);
    },
    [stepCount, syncIndicator],
  );

  useEffect(() => {
    syncIndicator(activeIndex);
    const onResize = () => syncIndicator(activeIndexRef.current);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [activeIndex, syncIndicator]);

  const scrollToStep = useCallback(
    (index: number, behavior: ScrollBehavior = 'smooth') => {
      const scrollEl = scrollRef.current;
      const mq = window.matchMedia(DESKTOP_SCROLL_MQ);
      if (!scrollEl || !mq.matches) {
        selectIndex(index);
        return;
      }

      const metrics = getScrollSegmentMetrics(scrollEl, readStickyTopPx(stickyRef.current));
      if (!metrics) {
        selectIndex(index);
        return;
      }

      const next = clamp(index, 0, stepCount - 1);
      const targetProgress = stepCount <= 1 ? 0 : next / stepCount;
      const targetY = metrics.segmentStart + metrics.scrollRange * targetProgress;

      selectIndex(next);
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      window.scrollTo({ top: targetY, behavior: reducedMotion ? 'auto' : behavior });
    },
    [selectIndex, stepCount],
  );

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    const mq = window.matchMedia(DESKTOP_SCROLL_MQ);
    let frame = 0;

    const syncFromScroll = () => {
      frame = 0;
      if (!mq.matches) return;

      const metrics = getScrollSegmentMetrics(scrollEl, readStickyTopPx(stickyRef.current));
      if (!metrics) return;

      const index = Math.min(stepCount - 1, Math.floor(metrics.progress * stepCount));
      if (index !== activeIndexRef.current) selectIndex(index);
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(syncFromScroll);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    mq.addEventListener('change', onScroll);
    syncFromScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      mq.removeEventListener('change', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [selectIndex, stepCount]);

  return (
    <section
      id="shared-intelligence"
      className="cr-shared-intelligence-section"
      aria-labelledby="shared-intelligence-title"
    >
      <div className={CR_MARKETING_CONTAINER}>
        <div
          ref={scrollRef}
          className="cr-shared-intelligence__scroll"
          style={
            {
              '--cr-shared-intelligence-step-count': stepCount,
            } as CSSProperties
          }
        >
          <div ref={stickyRef} className="cr-shared-intelligence__sticky">
            <header className="cr-shared-intelligence__header">
              <p className="cr-shared-intelligence__eyebrow">{SHARED_INTELLIGENCE_SECTION.eyebrow}</p>
              <h2 id="shared-intelligence-title" className="cr-shared-intelligence__heading">
                {SHARED_INTELLIGENCE_SECTION.heading}
              </h2>
            </header>

            <div className="cr-shared-intelligence__panel">
              <div className="cr-shared-intelligence__menu-wrap">
                <span
                  className="cr-shared-intelligence__indicator"
                  aria-hidden
                  style={{ height: indicatorHeight, transform: `translateY(${indicatorTop}px)` }}
                />
                <div
                  className="cr-shared-intelligence__menu"
                  data-shared-intelligence-menu
                  role="tablist"
                  aria-orientation="vertical"
                  aria-label="Context capabilities"
                >
                  {SHARED_INTELLIGENCE_STEPS.map((step, index) => {
                    const isActive = index === activeIndex;
                    return (
                      <button
                        key={step.id}
                        ref={(el) => {
                          tabRefs.current[index] = el;
                        }}
                        type="button"
                        role="tab"
                        id={`shared-intelligence-tab-${step.id}`}
                        aria-selected={isActive}
                        aria-controls="shared-intelligence-visual"
                        tabIndex={isActive ? 0 : -1}
                        className={`cr-shared-intelligence__tab${isActive ? ' is-active' : ''}`}
                        onClick={() => scrollToStep(index)}
                      >
                        <span className="cr-shared-intelligence__tab-label">{step.label}</span>
                        {isActive ? (
                          <p className="cr-shared-intelligence__tab-desc">{step.description}</p>
                        ) : null}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div
                id="shared-intelligence-visual"
                className="cr-shared-intelligence__visual"
                role="tabpanel"
                aria-labelledby={`shared-intelligence-tab-${SHARED_INTELLIGENCE_STEPS[activeIndex]?.id}`}
                data-shared-intelligence-stage={SHARED_INTELLIGENCE_STEPS[activeIndex]?.id}
              >
                <img
                  className="cr-shared-intelligence__visual-placeholder"
                  src={SHARED_INTELLIGENCE_VISUAL_PLACEHOLDER_SRC}
                  alt=""
                  aria-hidden
                  width={797}
                  height={608}
                  decoding="async"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SharedIntelligenceSection;
