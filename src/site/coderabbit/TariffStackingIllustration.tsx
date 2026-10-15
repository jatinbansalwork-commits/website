const TariffStackingIllustration = () => (
  <div className="cr-merge-tariff-stack" aria-hidden>
    <div className="cr-merge-tariff-stack__head">
      <span>Entry line 1</span>
      <span className="cr-merge-tariff-stack__hts">HTS 8708.29</span>
    </div>

    <p className="cr-merge-tariff-stack__desc">Motor vehicle parts — brake caliper assemblies</p>

    <div className="cr-merge-tariff-stack__stack">
      <div className="cr-merge-tariff-stack__rate">
        <span className="cr-merge-tariff-stack__rate-label">Section 232</span>
        <span className="cr-merge-tariff-stack__rate-value">25%</span>
      </div>
      <span className="cr-merge-tariff-stack__plus" aria-hidden>
        +
      </span>
      <div className="cr-merge-tariff-stack__rate">
        <span className="cr-merge-tariff-stack__rate-label">Section 301</span>
        <span className="cr-merge-tariff-stack__rate-value">25%</span>
      </div>
    </div>

    <div className="cr-merge-tariff-stack__compare">
      <div className="cr-merge-tariff-stack__compare-row">
        <span>Static rule table</span>
        <span className="cr-merge-tariff-stack__compare-bad">Single rate only</span>
      </div>
      <div className="cr-merge-tariff-stack__compare-row cr-merge-tariff-stack__compare-row--accent">
        <span>Structured entry data</span>
        <span className="cr-merge-tariff-stack__compare-good">Both duties applied</span>
      </div>
    </div>

    <div className="cr-merge-tariff-stack__cbp">
      <span className="cr-merge-tariff-stack__cbp-dot" aria-hidden />
      <span className="cr-merge-tariff-stack__cbp-text">CBP rejected entry on submit — duty mismatch</span>
    </div>
  </div>
);

export default TariffStackingIllustration;
