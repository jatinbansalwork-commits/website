/** Grata case study — solution card 4: cross-check sources + duty stacking tables. */
export const KLEAR_GRATA_SOLUTION_SOURCE_COMPARE_HTML = `
<div class="kn-sol-sources">
  <div class="kn-source-block">
    <h4 class="kn-source-block__label">Commercial invoice and supporting records</h4>
    <p class="kn-source-block__text">Documents that state what was shipped, country of origin, country of export and terms of sale. The commercial invoice is where valuation usually starts, but it will not always reflect every payment that should be added to the entered value.</p>
  </div>
  <div class="kn-source-block">
    <h4 class="kn-source-block__label">CBP Form 7501 (extracted)</h4>
    <p class="kn-source-block__text">Line-level duty treatment as reported on the entry summary. The 7501 is what the broker filed; it should match the entry on file in ACE.</p>
  </div>
  <div class="kn-source-block">
    <h4 class="kn-source-block__label">Custom entry data on file with CBP (ES-003)</h4>
    <p class="kn-source-block__text">CBP’s own extraction of the filed entry: HTS, origin, quantities and duty lines as the agency received them. The stacking mismatch only shows up when these three representations are read against each other.</p>
  </div>
  <h4 class="kn-source-block__label kn-source-block__label--spaced">The stacking error, line by line</h4>
  <div class="kn-duty-compare">
    <figure class="kn-duty-table-wrap">
      <table class="kn-duty-table">
        <caption>Correct filing — 15% total</caption>
        <tbody>
          <tr><th scope="row">Primary HTS (Ch 1–97)</th><td>$0</td></tr>
          <tr><th scope="row">Reciprocal · 9903.02.20</th><td>15%</td></tr>
          <tr class="kn-duty-table__total"><th scope="row">Total duty</th><td>15%</td></tr>
        </tbody>
      </table>
      <p class="kn-duty-table__note">Base rate absorbed into the 15% cap.</p>
    </figure>
    <figure class="kn-duty-table-wrap kn-duty-table-wrap--filed">
      <table class="kn-duty-table">
        <caption>What was filed — 20% total</caption>
        <tbody>
          <tr><th scope="row">Primary HTS (Ch 1–97)</th><td>5%</td></tr>
          <tr><th scope="row">Reciprocal · 9903.02.20</th><td>15%</td></tr>
          <tr class="kn-duty-table__total"><th scope="row">Total duty</th><td>20%</td></tr>
        </tbody>
      </table>
      <p class="kn-duty-table__note">Base rate stacked on top: a 5-point overcharge.</p>
    </figure>
  </div>
  <dl class="kn-duty-stats">
    <div class="kn-duty-stats__item">
      <dt>10,246 entries audited</dt>
      <dd>100% coverage, so no sampling methodology was required.</dd>
    </div>
    <div class="kn-duty-stats__item">
      <dt>128 stacking overcharges flagged</dt>
      <dd>From invisible overpayment to filing-ready correction.</dd>
    </div>
  </dl>
</div>`.trim();
