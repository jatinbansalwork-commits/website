const LINES = [
  { id: '1', label: 'Line 1 · aluminum parts', owed: '$2,140' },
  { id: '2', label: 'Line 2 · finished goods', owed: '$1,920' },
  { id: '3', label: 'Line 3 · packaging', owed: '$0' },
] as const;

const IeepaRefundsIllustration = () => (
  <div className="cr-merge-ieepa-refund" aria-hidden>
    <div className="cr-merge-ieepa-refund__head">
      <span>IEEPA refund reconciliation</span>
      <span className="cr-merge-ieepa-refund__tag">Entry data</span>
    </div>

    <ul className="cr-merge-ieepa-refund__lines">
      {LINES.map((line) => (
        <li key={line.id} className="cr-merge-ieepa-refund__line">
          <span className="cr-merge-ieepa-refund__line-label">{line.label}</span>
          <span className="cr-merge-ieepa-refund__line-owed">
            {line.owed === '$0' ? '—' : `${line.owed} owed`}
          </span>
        </li>
      ))}
    </ul>

    <div className="cr-merge-ieepa-refund__compare">
      <div className="cr-merge-ieepa-refund__compare-row">
        <span>Manual spreadsheet</span>
        <span className="cr-merge-ieepa-refund__compare-bad">$3,885 claimed</span>
      </div>
      <div className="cr-merge-ieepa-refund__compare-row cr-merge-ieepa-refund__compare-row--accent">
        <span>Structured entry lines</span>
        <span className="cr-merge-ieepa-refund__compare-good">$4,060 owed</span>
      </div>
    </div>

    <div className="cr-merge-ieepa-refund__note">
      <span className="cr-merge-ieepa-refund__note-dot" aria-hidden />
      <span className="cr-merge-ieepa-refund__note-text">
        $175 left on the table when reconciled by hand
      </span>
    </div>
  </div>
);

export default IeepaRefundsIllustration;
