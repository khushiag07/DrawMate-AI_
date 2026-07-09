import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Chat, Message } from "../types/chat";

interface ChatStore {
  
  chats: Chat[];

  activeChatId: string;

  createChat: () => void;

  selectChat: (id: string) => void;

  deleteChat: (id: string) => void;

  renameChat: (
    id: string,
    title: string
  ) => void;

  addUserMessage: (
    content: string
  ) => void;
startChat: (message: string) => void;
  createAssistantMessage: () => string;

  updateAssistantMessage: (
    id: string,
    content: string
  ) => void;
}

const newChat = (): Chat => ({
  id: crypto.randomUUID(),

  title: "New Chat",

  createdAt: new Date().toISOString(),

  updatedAt: new Date().toISOString(),

  pinned: false,

  messages: [],
});

export const useChatStore =
  create<ChatStore>()(
    persist(
      (set, get) => ({
        chats: [newChat()],

        activeChatId: newChat().id,

        createChat() {
          const chat = newChat();

          set((state) => ({
            chats: [chat, ...state.chats],

            activeChatId: chat.id,
          }));
        },
       startChat(message) {
  const chat = newChat();
  chat.title =
    message.length > 35
      ? message.slice(0, 35) + "..."
      : message;

  chat.messages.push({
    id: crypto.randomUUID(),
    role: "user",
    content: message,
    timestamp: new Date().toLocaleTimeString(),
  });

  set((state) => ({
    chats: [chat, ...state.chats],
    activeChatId: chat.id,
  }));

},

        selectChat(id) {
          set({
            activeChatId: id,
          });
        },

        deleteChat(id) {
          set((state) => {
            const chats =
              state.chats.filter(
                (c) => c.id !== id
              );

            if (chats.length === 0) {
              const chat = newChat();

              return {
                chats: [chat],
                activeChatId: chat.id,
              };
            }

            return {
              chats,
              Id:
                chats[0].id,
            };
          });
        },

        renameChat(id, title) {
          set((state) => ({
            chats: state.chats.map(
              (chat) =>
                chat.id === id
                  ? {
                      ...chat,
                      title,
                    }
                  : chat
            ),
          }));
        },

        addUserMessage(content) {
          set((state) => ({
            chats: state.chats.map(
              (chat) => {
                if (
                  chat.id !==
                  state.activeChatId
                )
                  return chat;

                const message: Message = {
                  id: crypto.randomUUID(),

                  role: "user",

                  content,

                  timestamp:
                    new Date().toLocaleTimeString(),
                };

                return {
                  ...chat,

                  title:
                    chat.messages.length ===
                    0
                      ? content.length > 35
                        ? content.slice(
                            0,
                            35
                          ) + "..."
                        : content
                      : chat.title,

                  updatedAt:
                    new Date().toISOString(),

                  messages: [
                    ...chat.messages,
                    message,
                  ],
                };
              }
            ),
          }));
        },

        createAssistantMessage() {
          const id =
            crypto.randomUUID();

          set((state) => ({
            chats: state.chats.map(
              (chat) => {
                if (
                  chat.id !==
                  state.activeChatId
                )
                  return chat;

                const message: Message = {
                  id,

                  role:
                    "assistant",

                  content: "",

                  timestamp:
                    new Date().toLocaleTimeString(),

                  isStreaming: true,
                };

                return {
                  ...chat,

                  messages: [
                    ...chat.messages,
                    message,
                  ],
                };
              }
            ),
          }));

          return id;
        },

        updateAssistantMessage(
          id,
          content
        ) {
          set((state) => ({
            chats: state.chats.map(
              (chat) => ({
                ...chat,

                messages:
                  chat.messages.map(
                    (msg) =>
                      msg.id === id
                        ? {
                            ...msg,
                            content,
                            isStreaming:
                              false,
                          }
                        : msg
                  ),
              })
            ),
          }));
        },
      }),

      {
        name:
          "drawmate-history",
      }
    )
  );