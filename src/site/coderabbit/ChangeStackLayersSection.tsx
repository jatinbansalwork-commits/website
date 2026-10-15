import { useLayoutEffect, useRef, useState } from 'react';
import changeStackLayersHtml from './change-stack-layers.snapshot.html?raw';
import { mountChangeStackLayersClone } from './changeStackLayersClone';
import '../../styles/coderabbit-hero-bundle.css';
import '../../styles/coderabbit-change-stack-sync-chunk.css';
import '../../styles/coderabbit-change-stack-layers.css';
import '../../styles/stage-collect-scoped.css';
import '../../styles/workflow-editor-scoped.css';

const ChangeStackLayersSection = () => {
  const hostRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    if (!host.dataset.changeStackLayersSeeded) {
      host.innerHTML = changeStackLayersHtml;
      host.dataset.changeStackLayersSeeded = 'true';
    }

    const teardown = mountChangeStackLayersClone(host);
    setIsReady(true);
    return teardown;
  }, []);

  return (
    <div
      className="cr-change-stack-layers-section"
      id="change-stack-layers"
      aria-labelledby="change-stack-layers-title"
    >
      <div
        ref={hostRef}
        className={`cr-change-stack-layers-clone${isReady ? ' cr-change-stack-layers-clone--ready' : ''}`}
      />
    </div>
  );
};

export default ChangeStackLayersSection;
