import { useEffect, useRef, useState, type CSSProperties } from 'react';

export const HERO_PHRASES = ['evolved.', 'structured.', 'compliant.', 'in motion.'] as const;

export type HeroPhrase = (typeof HERO_PHRASES)[number];

const PHRASE_HOLD_MS = 2500;
const CHARACTER_STAGGER_S = 0.045;

type Accent = 'positive' | 'negative';

type HeroPhraseCycleProps = {
  onPhraseChange?: (phrase: HeroPhrase) => void;
};

const accentForIndex = (index: number): Accent => (index % 2 === 0 ? 'positive' : 'negative');

const slidesForAccent = (accent: Accent) =>
  accent === 'positive'
    ? { slideIn: '115%', slideOut: '-115%' }
    : { slideIn: '-115%', slideOut: '115%' };

type PhraseCharacterProps = {
  character: string;
  index: number;
};

const PhraseCharacter = ({ character, index }: PhraseCharacterProps) => {
  const accent = accentForIndex(index);
  const { slideIn, slideOut } = slidesForAccent(accent);
  const hasColor = character !== ' ' && character !== '.';

  return (
    <span
      className="cr-cr-hero__phrase-character"
      data-accent={accent}
      style={
        {
          '--character-delay': `${CHARACTER_STAGGER_S * index}s`,
          '--slide-in': slideIn,
          '--slide-out': slideOut,
        } as CSSProperties
      }
    >
      <span
        className="cr-cr-hero__phrase-character-motion"
        data-character={character}
        data-has-color={hasColor ? 'true' : 'false'}
      >
        {character}
      </span>
    </span>
  );
};

const HeroPhraseCycle = ({ onPhraseChange }: HeroPhraseCycleProps) => {
  const rootRef = useRef<HTMLSpanElement>(null);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [motionEnabled, setMotionEnabled] = useState(false);

  const phrase = HERO_PHRASES[phraseIndex];

  useEffect(() => {
    onPhraseChange?.(phrase);
  }, [phrase, onPhraseChange]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const active = entry.isIntersecting;
        setMotionEnabled(active);
        root.dataset.animationActive = active ? 'true' : 'false';
      },
      { threshold: 0.35 },
    );

    observer.observe(root);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!motionEnabled) return;

    const interval = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % HERO_PHRASES.length);
    }, PHRASE_HOLD_MS);

    return () => window.clearInterval(interval);
  }, [motionEnabled]);

  return (
    <span ref={rootRef} className="cr-cr-hero__phrase-cycle" data-animation-active="false">
      <span aria-hidden="true" className="cr-cr-hero__phrase-cycle-visual">
        {motionEnabled ? (
          <span key={phrase} className="cr-cr-hero__phrase-cycle-item">
            {[...phrase].map((character, index) => (
              <PhraseCharacter key={`${phrase}-${index}`} character={character} index={index} />
            ))}
          </span>
        ) : (
          <span className="cr-cr-hero__phrase-cycle-item cr-cr-hero__phrase-cycle-item--static">{phrase}</span>
        )}
      </span>
    </span>
  );
};

export default HeroPhraseCycle;
