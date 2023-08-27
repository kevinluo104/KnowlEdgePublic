import {
  collection,
  doc,
  setDoc,
  getDocs,
  query,
  where,
  getDoc,
  addDoc,
  serverTimestamp,
  updateDoc,
  arrayUnion,
  DocumentReference,
  onSnapshot,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../../../firebase';
import Fuse from 'fuse.js';

export const getUserInfo = async (uid) => {
  try {
    const response = await fetch(`http://localhost:3005/chat/userInfo/${uid}`);
    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    return await response.json();
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

export const subscribeToChatMessages = (chatID, callback) => {
  const chatRef = doc(db, 'chats', chatID);

  return onSnapshot(chatRef, async (snapshot) => {
    if (snapshot.exists()) {
      const chatData = snapshot.data();
      const messageRefs = chatData.messages || [];

      const messagesList = await Promise.all(
        messageRefs.map(async (messageRef) => {
          const messageSnapshot = await getDoc(messageRef);
          const message = messageSnapshot.data();
          const senderName = (await getUserInfo(message.sender_id))
            ?.preferredName;

          return {
            ...message,
            timestamp: message.timestamp.toMillis(),
            senderName,
          };
        })
      );

      callback(messagesList);
    } else {
      console.log('Document does not exist');
    }
  });
};

export const subscribeToChats = async (currentUser, chatUpdateCallback) => {
  const chatsCollection = collection(db, 'chats');

  const userQuery = query(
    chatsCollection,
    where('parties', 'array-contains', currentUser)
  );

  const unsubscribe = onSnapshot(
    userQuery,
    async (snapshot) => {
      try {
        const allDocuments = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const chatData = doc.data();

            let chatName = '';
            let chatImage = '';
            let chatType = '';

            if (chatData.type === 'channel') {
              chatName = chatData.name;
              chatImage = chatData.image;
              chatType = chatData.type;
            } else {
              const secondParty = chatData.parties.filter((party) => {
                return party !== currentUser;
              });

              let secondPartyInfo = '';
              if (secondParty.length > 0) {
                secondPartyInfo = await getUserInfo(secondParty[0]);
              } else {
                secondPartyInfo = await getUserInfo(currentUser);
              }

              chatName = secondPartyInfo.preferredName;
              chatImage = secondPartyInfo.image;
            }

            let lastMessage = '';

            const messagesLength = chatData?.messages?.length;

            if (messagesLength > 0) {
              const lastMessageRef = chatData?.messages[messagesLength - 1];
              const lastMessageSnapshot = await getDoc(lastMessageRef);

              if (lastMessageSnapshot.exists()) {
                lastMessage = lastMessageSnapshot.data();
                lastMessage.timestamp = lastMessage.timestamp.toMillis();
              }
            }

            return {
              chatID: doc.id,
              chatName: chatName,
              lastMessage: lastMessage,
              chatImage: chatImage,
              chatType: chatType,
            };
          })
        );

        const sortedChats = allDocuments.sort((chatA, chatB) => {
          const timestampA = chatA.lastMessage?.timestamp || 0;
          const timestampB = chatB.lastMessage?.timestamp || 0;
          return timestampB - timestampA;
        });

        chatUpdateCallback(sortedChats);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      }
    },
    (error) => {
      console.error('Error listening to chat changes:', error);
    }
  );

  return unsubscribe;
};

export const sendNewMessage = async (chatID, content, sender_id) => {
  const docRef = await addDoc(collection(db, 'messages'), {
    content: content,
    sender_id: sender_id,
    timestamp: serverTimestamp(),
  });

  const chatRef = doc(db, 'chats', chatID);

  const updatedMessage = await updateDoc(chatRef, {
    messages: arrayUnion(doc(db, 'messages', docRef.id)),
  });
};

export const createNewChannel = async (name, image, description, uid) => {
  try {
    const chatsCollection = collection(db, 'chats');

    const newChatRef = doc(chatsCollection);
    const newChatData = {
      name: name,
      image: image,
      description: description,
      type: 'channel',
      parties: [uid],
      messages: [],
      createdAt: serverTimestamp(),
    };

    await setDoc(newChatRef, newChatData);
    return newChatRef.id;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

export const searchContact = async (name) => {
  try {
    const response = await fetch(
      `http://localhost:3005/chat/searchName/${name}`
    );
    if (!response.ok) {
      throw new Error('Request failed with status ' + response.status);
    }
    return await response.json();
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

export const searchChannels = async (name) => {
  try {
    const chatsCollection = collection(db, 'chats');

    const query_ = query(chatsCollection, where('type', '==', 'channel'));

    const querySnapshot = await getDocs(query_);
    const documents = querySnapshot.docs.map((doc) => {
      const data = { ...doc.data(), id: doc.id };
      return data;
    });

    // Create Fuse instance for fuzzy search
    const fuse = new Fuse(documents, {
      keys: ['name'],
      threshold: 0.4,
    });

    const fuzzyResults = fuse.search(name).map((result) => result.item);

    return fuzzyResults;
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

export const manageChatParticipation = async (chatID, uid, action) => {
  try {
    const chatRef = doc(db, 'chats', chatID);

    if (action === 'join') {
      await updateDoc(chatRef, {
        parties: arrayUnion(uid),
      });
    } else if (action === 'leave') {
      await updateDoc(chatRef, {
        parties: arrayRemove(uid),
      });
    } else {
      throw new Error('Invalid action: ' + action);
    }
  } catch (error) {
    throw new Error('An error occurred: ' + error.message);
  }
};

export const returnChatID = async (parties) => {
  const chatsCollection = collection(db, 'chats');
  const query_ = query(
    chatsCollection,
    where('parties', 'array-contains-any', parties)
  );

  try {
    const querySnapshot = await getDocs(query_);

    for (const docSnapshot of querySnapshot.docs) {
      const chatData = docSnapshot.data();
      const chatParties = chatData.parties;

      if (
        chatParties.length === parties.length &&
        parties.every((party) => chatParties.includes(party))
      ) {
        // Found a chat document with the exact parties, return its ID
        return docSnapshot.id;
      }
    }

    // if no matching chat document found, create a new one
    const newChatRef = doc(chatsCollection);
    const newChatData = {
      parties: parties,
      messages: [],
      accepted: false,
      createdAt: serverTimestamp(),
    };

    await setDoc(newChatRef, newChatData);
    return newChatRef.id;
  } catch (error) {
    console.error('Error getting documents:', error);
  }
};
