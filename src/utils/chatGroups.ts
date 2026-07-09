export interface ChatGroup {
  title: string;
  chats: any[];
}

export function groupChats(chats: any[]) {
  const today: any[] = [];
  const yesterday: any[] = [];
  const previous: any[] = [];
  const older: any[] = [];

  const now = new Date();

  chats.forEach((chat) => {
    const date = new Date(chat.createdAt);

    const diff = Math.floor(
      (now.getTime() - date.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    if (diff === 0)
      today.push(chat);

    else if (diff === 1)
      yesterday.push(chat);

    else if (diff <= 7)
      previous.push(chat);

    else
      older.push(chat);
  });

  return [
    {
      title: "Today",
      chats: today,
    },
    {
      title: "Yesterday",
      chats: yesterday,
    },
    {
      title: "Previous 7 Days",
      chats: previous,
    },
    {
      title: "Older",
      chats: older,
    },
  ];
}