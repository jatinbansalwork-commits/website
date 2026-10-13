import AgentDocsumoStageIllustration from './AgentDocsumoStageIllustration';
import collectStageHtml from './docsumo-collect-stage.html?raw';

const AgentCollectIllustration = () => (
  <AgentDocsumoStageIllustration html={collectStageHtml} stage="collect" />
);

export default AgentCollectIllustration;
