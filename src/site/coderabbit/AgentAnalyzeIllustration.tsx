import AgentWorkflowStageIllustration from './AgentWorkflowStageIllustration';
import analyzeStageHtml from './workflow-analyze-stage.html?raw';

const AgentAnalyzeIllustration = () => (
  <AgentWorkflowStageIllustration html={analyzeStageHtml} stage="analyze" />
);

export default AgentAnalyzeIllustration;
