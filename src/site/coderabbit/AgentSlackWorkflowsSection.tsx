import AgentAnalyzeIllustration from './AgentAnalyzeIllustration';
import AgentCollectIllustration from './AgentCollectIllustration';
import AgentVerifyIllustration from './AgentVerifyIllustration';
import {
  AGENT_SLACK_PANELS,
  AGENT_SLACK_SECTION_COPY,
  type AgentSlackPanelCopy,
} from './agentSlackWorkflowsCopy';
import '../../styles/coderabbit-triage-bundle.css';
import '../../styles/stage-collect-scoped.css';
import '../../styles/coderabbit-agent-slack-workflows.css';

/** Same width/padding as reviews-surfaces + merge-automation snapshots */
const CR_MARKETING_CONTAINER =
  'container mx-auto w-full px-4 sm:max-w-none md:max-w-none md:px-6 lg:max-w-[80rem] lg:px-12 xl:max-w-[120rem] xl:px-30';

const AgentSlackPanel = ({ panel }: { panel: AgentSlackPanelCopy }) => (
  <article
    className={`cr-agent-slack-panel${panel.mirrored ? ' cr-agent-slack-panel--mirrored' : ''}`}
    aria-labelledby={`agent-slack-${panel.id}-title`}
  >
    <div className="cr-agent-slack-panel__copy">
      <p className="cr-agent-slack-panel__label">{panel.label}</p>
      <h3 id={`agent-slack-${panel.id}-title`} className="cr-agent-slack-panel__title">
        {panel.title}
      </h3>
      <p className="cr-agent-slack-panel__description">{panel.description}</p>
      {panel.items.length > 0 ? (
        <ul className="cr-agent-slack-panel__list">
          {panel.items.map((item) => (
            <li key={item.term} className={item.active ? 'is-active' : undefined}>
              <span className="cr-agent-slack-panel__bullet" aria-hidden />
              <span className="cr-agent-slack-panel__line">
                <span className="cr-agent-slack-panel__term">{item.term}</span>
                <span className="cr-agent-slack-panel__sep" aria-hidden>
                  ·
                </span>
                <span className="cr-agent-slack-panel__detail">{item.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
    <div className="cr-agent-slack-panel__divider" aria-hidden="true" />
    <div
      className={`cr-agent-slack-panel__visual${panel.id === 'context' || panel.id === 'plan' || panel.id === 'execute' ? ' cr-agent-slack-panel__visual--collect' : ''}`}
      aria-hidden="true"
    >
      <div className="cr-agent-slack-panel__visual-slot" data-panel={panel.id}>
        {panel.id === 'context' ? (
          <AgentCollectIllustration />
        ) : panel.id === 'plan' ? (
          <AgentVerifyIllustration />
        ) : (
          <AgentAnalyzeIllustration />
        )}
      </div>
    </div>
  </article>
);

const AgentSlackWorkflowsSection = () => (
  <section
    className="cr-agent-slack-section"
    aria-labelledby="agent-slack-workflows-title"
    id="agent-slack-workflows"
  >
    <div className={CR_MARKETING_CONTAINER}>
      <header className="cr-agent-slack-section__header">
        <p className="cr-agent-slack-section__eyebrow">{AGENT_SLACK_SECTION_COPY.eyebrow}</p>
        <h2 id="agent-slack-workflows-title" className="cr-agent-slack-section__heading">
          {AGENT_SLACK_SECTION_COPY.heading}
        </h2>
      </header>

      <div className="cr-agent-slack-section__stack">
        {AGENT_SLACK_PANELS.map((panel) => (
          <AgentSlackPanel key={panel.id} panel={panel} />
        ))}
      </div>
    </div>
  </section>
);

export default AgentSlackWorkflowsSection;
