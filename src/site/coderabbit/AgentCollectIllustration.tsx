import AgentWorkflowStageIllustration from './AgentWorkflowStageIllustration';
import collectStageHtml from './workflow-collect-stage.html?raw';

const AgentCollectIllustration = () => (
  <AgentWorkflowStageIllustration html={collectStageHtml} stage="collect" />
);

export default AgentCollectIllustration;
