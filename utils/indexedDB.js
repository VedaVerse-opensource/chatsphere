const DB_NAME = "ChatSphereDB";
const STORE_NAME = "chatHistory";
let dbVersion = 2; // Increment this value

const openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, dbVersion);

    request.onerror = () => reject("Error opening database");
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = event => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
      }
    };
  });
};

export const saveChatHistory = async chat => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  return chat.id ? store.put(chat) : store.add(chat);
};

export const getChatHistory = async () => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], "readonly");
  const store = transaction.objectStore(STORE_NAME);
  return new Promise((resolve, reject) => {
    const request = store.getAll();
    request.onerror = () => reject("Error fetching chat history");
    request.onsuccess = () => resolve(request.result);
  });
};

export const updateChatHistory = async (id, updatedChat) => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  return store.put({ ...updatedChat, id });
};

export const deleteChatHistory = async id => {
  const db = await openDB();
  const transaction = db.transaction([STORE_NAME], "readwrite");
  const store = transaction.objectStore(STORE_NAME);
  return store.delete(id);
};
