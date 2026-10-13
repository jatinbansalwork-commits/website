import AgentDocsumoStageIllustration from './AgentDocsumoStageIllustration';
import verifyStageHtml from './docsumo-verify-stage.html?raw';

const AgentVerifyIllustration = () => (
  <AgentDocsumoStageIllustration html={verifyStageHtml} stage="verify" />
);

export default AgentVerifyIllustration;
