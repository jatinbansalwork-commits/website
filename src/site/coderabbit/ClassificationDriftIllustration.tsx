const WEEKS = [
  { id: 'w1', label: 'Week 1', hts: '8708.29.00', status: 'Aligned' },
  { id: 'w2', label: 'Week 2', hts: '8708.29.00', status: 'Rule update' },
  { id: 'w3', label: 'Week 3', hts: '8708.29.51', status: 'Drift' },
] as const;

const ClassificationDriftIllustration = () => (
  <div className="cr-merge-class-drift" aria-hidden>
    <div className="cr-merge-class-drift__head">
      <span>Same SKU · manual class</span>
      <span className="cr-merge-class-drift__tag">Weekly rules</span>
    </div>

    <ul className="cr-merge-class-drift__timeline">
      {WEEKS.map((week) => (
        <li
          key={week.id}
          className={`cr-merge-class-drift__week${week.status === 'Drift' ? ' cr-merge-class-drift__week--drift' : ''}`}
        >
          <span className="cr-merge-class-drift__week-label">{week.label}</span>
          <span className="cr-merge-class-drift__hts">{week.hts}</span>
          <span
            className={`cr-merge-class-drift__status cr-merge-class-drift__status--${week.status === 'Aligned' ? 'ok' : week.status === 'Rule update' ? 'warn' : 'bad'}`}
          >
            {week.status}
          </span>
        </li>
      ))}
    </ul>

    <div className="cr-merge-class-drift__compare">
      <div className="cr-merge-class-drift__compare-row">
        <span>Broker file · “handled”</span>
        <span className="cr-merge-class-drift__compare-muted">Static HTS on file</span>
      </div>
      <div className="cr-merge-class-drift__compare-row cr-merge-class-drift__compare-row--accent">
        <span>Filing-ready entry data</span>
        <span className="cr-merge-class-drift__compare-good">Re-classed before submit</span>
      </div>
    </div>

    <div className="cr-merge-class-drift__note">
      <span className="cr-merge-class-drift__note-dot" aria-hidden />
      <span className="cr-merge-class-drift__note-text">
        Classification drift surfaced after tariff rules changed
      </span>
    </div>
  </div>
);

export default ClassificationDriftIllustration;
