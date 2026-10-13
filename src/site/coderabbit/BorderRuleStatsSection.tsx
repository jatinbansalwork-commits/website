import {
  BORDER_RULE_STATS_CARDS,
  BORDER_RULE_STATS_EYEBROW,
  BORDER_RULE_STATS_HEADING,
  BORDER_RULE_STATS_SUBHEADING,
  type BorderRuleStatCard,
} from './borderRuleStatsCopy';
import '../../styles/coderabbit-border-rule-stats.css';

const ExternalLinkIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path
      fillRule="evenodd"
      d="M4.22 11.78a.75.75 0 0 1 0-1.06L9.44 5.5H6.75a.75.75 0 0 1 0-1.5h4.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-1.5 0V6.56l-5.22 5.22a.75.75 0 0 1-1.06 0Z"
      clipRule="evenodd"
    />
  </svg>
);

const RulePatternGrid = ({ seed = 0 }: { seed?: number }) => (
  <div className="cr-border-stats__pattern" aria-hidden>
    {Array.from({ length: 48 }, (_, i) => (
      <span
        key={i}
        className="cr-border-stats__pattern-cell"
        data-tone={
          (i + seed * 3) % 11 === 0 ? 'accent' : (i + seed * 5) % 13 === 0 ? 'warn' : 'base'
        }
      />
    ))}
  </div>
);

const SourceLink = ({
  label,
  href,
}: {
  label: string;
  href: string;
}) => (
  <a
    className="cr-border-stats__source"
    href={href}
    {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
  >
    {label}
    <ExternalLinkIcon />
  </a>
);

const StatCard = ({ card, index }: { card: BorderRuleStatCard; index: number }) => {
  if (card.kind === 'visual') {
    return (
      <article className="cr-border-stats__card cr-border-stats__card--visual">
        <RulePatternGrid seed={index} />
        <div className="cr-border-stats__visual-copy">
          <h3 className="cr-border-stats__visual-title">{card.title}</h3>
          <p className="cr-border-stats__visual-body">{card.body}</p>
        </div>
      </article>
    );
  }

  if (card.kind === 'percent') {
    return (
      <article className="cr-border-stats__card">
        <p className="cr-border-stats__label">{card.label}</p>
        <p
          className={`cr-border-stats__stat cr-border-stats__stat--solo${
            card.stat.length > 6 ? ' cr-border-stats__stat--phrase' : ''
          }`}
        >
          {card.stat}
        </p>
        <p className="cr-border-stats__body">{card.body}</p>
        {card.sourceLabel && card.sourceHref ? (
          <SourceLink label={card.sourceLabel} href={card.sourceHref} />
        ) : null}
      </article>
    );
  }

  return (
    <article className="cr-border-stats__card">
      <p className="cr-border-stats__label">{card.label}</p>
      <p className="cr-border-stats__stat">
        {card.previousStat ? (
          <span className="cr-border-stats__stat-previous">{card.previousStat}</span>
        ) : null}
        <span className="cr-border-stats__stat-current">{card.currentStat}</span>
      </p>
      <p className="cr-border-stats__body">{card.body}</p>
      {card.sourceLabel && card.sourceHref ? (
        <SourceLink label={card.sourceLabel} href={card.sourceHref} />
      ) : null}
    </article>
  );
};

const BorderRuleStatsSection = () => (
  <section
    className="cr-border-stats-section mt-24 md:mt-32"
    aria-labelledby="border-rule-stats-title"
  >
    <div className="container cr-border-stats__container">
      <header className="cr-border-stats__header">
        <div className="cr-border-stats__intro">
          <p className="cr-border-stats__eyebrow">{BORDER_RULE_STATS_EYEBROW}</p>
          <h2 id="border-rule-stats-title" className="cr-border-stats__heading">
            {BORDER_RULE_STATS_HEADING}
          </h2>
        </div>
        <p className="cr-border-stats__subheading">{BORDER_RULE_STATS_SUBHEADING}</p>
      </header>

      <div className="cr-border-stats__grid">
        {BORDER_RULE_STATS_CARDS.map((card, index) => (
          <StatCard key={index} card={card} index={index} />
        ))}
      </div>
    </div>
  </section>
);

export default BorderRuleStatsSection;
