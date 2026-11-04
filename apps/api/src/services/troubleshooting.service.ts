import { troubleshootingKnowledge } from "../knowledge/troubleshooting.knowledge.js";

export const getTroubleshootingResponse = (userMessage: string) => {
  const message = userMessage.toLowerCase();

  const matchedIssue = troubleshootingKnowledge.find((item) =>
    item.keywords.some((keyword) => message.includes(keyword))
  );

  if (!matchedIssue) {
    return {
      success: true,
      matched: false,
      response:
        "I'm unable to identify this issue from my troubleshooting knowledge base. Please contact technical support."
    };
  }

  return {
    success: true,
    matched: true,
    issue: matchedIssue.issue,
    response: matchedIssue.solution
  };
};