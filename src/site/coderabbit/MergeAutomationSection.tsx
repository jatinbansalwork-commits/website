import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import mergeAutomationHtml from './merge-automation.snapshot.html?raw';
import {
  mountMergeAutomationClone,
  prepareMergeAutomationIllustrationMounts,
  type MergeAutomationIllustrationMount,
} from './mergeAutomationClone';
import ClassificationDriftIllustration from './ClassificationDriftIllustration';
import IeepaRefundsIllustration from './IeepaRefundsIllustration';
import TariffStackingIllustration from './TariffStackingIllustration';
import '../../styles/coderabbit-hero-bundle.css';
import '../../styles/coderabbit-triage-bundle.css';
import '../../styles/coderabbit-merge-automation.css';

const renderMergeIllustration = (kind: MergeAutomationIllustrationMount['kind']) => {
  switch (kind) {
    case 'tariff-stacking':
      return <TariffStackingIllustration />;
    case 'ieepa-refunds':
      return <IeepaRefundsIllustration />;
    case 'classification-drift':
      return <ClassificationDriftIllustration />;
    default:
      return null;
  }
};

const MergeAutomationSection = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [illustrationMounts, setIllustrationMounts] = useState<MergeAutomationIllustrationMount[]>(
    [],
  );

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (!host.dataset.mergeAutomationSeeded) {
      host.innerHTML = mergeAutomationHtml;
      host.dataset.mergeAutomationSeeded = 'true';
    }

    mountMergeAutomationClone(host);
    setIllustrationMounts(prepareMergeAutomationIllustrationMounts(host));

    return () => setIllustrationMounts([]);
  }, []);

  return (
    <div className="cr-merge-automation-section">
      <div ref={hostRef} className="cr-merge-automation-clone" />
      {illustrationMounts.map(({ kind, node }) =>
        createPortal(renderMergeIllustration(kind), node, kind),
      )}
    </div>
  );
};

export default MergeAutomationSection;
