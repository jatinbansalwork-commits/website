import AgentDocsumoStageIllustration from './AgentDocsumoStageIllustration';
import analyzeStageHtml from './docsumo-analyze-stage.html?raw';

const AgentAnalyzeIllustration = () => (
  <AgentDocsumoStageIllustration html={analyzeStageHtml} stage="analyze" />
);

export default AgentAnalyzeIllustration;
