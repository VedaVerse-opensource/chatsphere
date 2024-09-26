const DB_NAME = "ChatSphereDB";
const CHAT_STORE_NAME = "chatHistory";
const PROMPT_STORE_NAME = "prompts";
let dbVersion = 3; // Increment this value

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, dbVersion);

    request.onerror = () => reject("Error opening database");
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(CHAT_STORE_NAME)) {
        db.createObjectStore(CHAT_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
      if (!db.objectStoreNames.contains(PROMPT_STORE_NAME)) {
        db.createObjectStore(PROMPT_STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
};

export const saveChatHistory = async chat => {
  const db = await openDB();
  const transaction = db.transaction([CHAT_STORE_NAME], "readwrite");
  const store = transaction.objectStore(CHAT_STORE_NAME);
  return chat.id ? store.put(chat) : store.add(chat);
};

export const getChatHistory = async () => {
  const db = await openDB();
  const transaction = db.transaction([CHAT_STORE_NAME], "readonly");
  const store = transaction.objectStore(CHAT_STORE_NAME);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject("Error fetching chat history");
    request.onsuccess = () => resolve(request.result);
  });
};

export const updateChatHistory = async (id, updatedChat) => {
  const db = await openDB();
  const transaction = db.transaction([CHAT_STORE_NAME], "readwrite");
  const store = transaction.objectStore(CHAT_STORE_NAME);
  return store.put({ ...updatedChat, id });
};

export const deleteChatHistory = async id => {
  const db = await openDB();
  const transaction = db.transaction([CHAT_STORE_NAME], "readwrite");
  const store = transaction.objectStore(CHAT_STORE_NAME);
  return store.delete(id);
};

export const savePrompt = async prompt => {
  const db = await openDB();
  const transaction = db.transaction([PROMPT_STORE_NAME], "readwrite");
  const store = transaction.objectStore(PROMPT_STORE_NAME);
  return store.add({ text: prompt });
};

export const getSavedPrompts = async () => {
  const db = await openDB();
  const transaction = db.transaction([PROMPT_STORE_NAME], "readonly");
  const store = transaction.objectStore(PROMPT_STORE_NAME);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject("Error fetching saved prompts");
    request.onsuccess = () => resolve(request.result.map(item => item.text));
  });
};
