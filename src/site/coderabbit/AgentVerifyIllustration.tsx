import AgentWorkflowStageIllustration from './AgentWorkflowStageIllustration';
import verifyStageHtml from './workflow-verify-stage.html?raw';

const AgentVerifyIllustration = () => (
  <AgentWorkflowStageIllustration html={verifyStageHtml} stage="verify" />
);

export default AgentVerifyIllustration;
