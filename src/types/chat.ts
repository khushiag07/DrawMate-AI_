export interface UploadedFile {
  id: string;
  name: string;
  url: string;
  type: string;
  size?: number;
}

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;

  images?: string[];
  files?: UploadedFile[];

  isStreaming?: boolean;
}

export interface Chat {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;

  pinned: boolean;

  messages: Message[];
}