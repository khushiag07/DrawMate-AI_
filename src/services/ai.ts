const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:8000";

export interface AIResponse {
  reply: string;
  uploaded?: string[];
  images?: string[];
}

export async function sendMessage(
  message: string,
  files: File[] = []
): Promise<AIResponse> {
  const formData = new FormData();

  formData.append("message", message);

  files.forEach((file) => {
    formData.append("files", file);
  });

  const response = await fetch(`${API_URL}/chat`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
}