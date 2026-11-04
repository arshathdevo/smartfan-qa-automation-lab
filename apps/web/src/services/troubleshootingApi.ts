const API_URL = "http://localhost:5000/api/troubleshooting";

export interface TroubleshootingResponse {
  success: boolean;
  matched: boolean;
  issue?: string;
  response: string;
}

export const askTroubleshootingAssistant = async (
  message: string
): Promise<TroubleshootingResponse> => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  if (!response.ok) {
    throw new Error("Failed to contact troubleshooting assistant");
  }

  return response.json() as Promise<TroubleshootingResponse>;
};