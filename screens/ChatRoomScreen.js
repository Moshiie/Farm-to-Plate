import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebaseConfig'; 
import { collection, query, orderBy, onSnapshot, addDoc, doc, getDoc, updateDoc, where, getDocs } from 'firebase/firestore';
import { AuthContext } from '../providers/AuthProvider';

const ChatRoomScreen = ({ route, navigation }) => {
  const { chatId, name } = route.params;
  const { userAuthData } = useContext(AuthContext);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]); 
  const [selectedMessage, setSelectedMessage] = useState(null);  
  const [senderId, setSenderId] = useState(null);  
  const [senderRole, setSenderRole] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [readyToRender, setReadyToRender] = useState(false); 

  const currentUserId = userAuthData?.uid;

  // Real-time listener for messages in a specific chat room
  useEffect(() => {
    const messagesRef = collection(db, 'chat_rooms', chatId, 'messages');
    const q = query(messagesRef, orderBy('createdAt', 'asc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const messagesData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(messagesData);
    });

    const getChatRoomDetails = async () => {
      const chatDocRef = doc(db, 'chat_rooms', chatId);
      const chatDoc = await getDoc(chatDocRef);
      if (chatDoc.exists()) {
        const chatData = chatDoc.data();
        if (chatData.buyer_id === currentUserId) {
          setSenderRole('buyer');
          setSenderId(currentUserId);
        } else if (chatData.farmer_id === currentUserId) {
          setSenderRole('farmer'); 
          setSenderId(currentUserId);
        }
        setReadyToRender(true); // Ensure all critical info is loaded
      }
    };

    getChatRoomDetails();

    return () => unsubscribe();
  }, [chatId, currentUserId]);

  useEffect(() => {
    const markMessagesAsRead = async () => {
      const messagesRef = collection(db, 'chat_rooms', chatId, 'messages');
      try {
        const messagesQuery = query(messagesRef, 
          where('isRead', '==', false),
          where('senderId', '!=', userAuthData.uid)
        );
    
        const querySnapshot = await getDocs(messagesQuery);
        querySnapshot.forEach(async (doc) => {
          await updateDoc(doc.ref, {
            isRead: true,
          });
        });
      } catch (error) {
        console.error("Error marking messages as Read", error);
      }
    };

    markMessagesAsRead();

  }, [])

  const sendMessage = async () => {
    if (message.trim() && senderId) {
      try {
        // Add New Message
        const newMessage = {
          text: message,
          createdAt: new Date(),
          senderId: currentUserId,  
          isRead: false,
        };
        await addDoc(collection(db, 'chat_rooms', chatId, 'messages'), newMessage);

         // latest message
        const chatDocRef = doc(db, 'chat_rooms', chatId);
        await updateDoc(chatDocRef, {
          last_message: message, 
          last_message_time: newMessage.createdAt
        });

        setMessage(''); // Clear input
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  const formatTime = (createdAt) => {
    const date = new Date(createdAt.seconds * 1000);
    return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  };

  // Only render content if the senderId is defined (avoids initial flickering)
  if (!readyToRender) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#66b366" />
        <Text>Loading chat...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.chatHeader}>Chat with {name}</Text>
      </View>

      {/* Render messages after 'readyToRender' is true */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            onPress={() => setSelectedMessage(item)}   // Toggle time visibility
            style={[styles.messageContainer, item.senderId === senderId ? styles.myMessage : styles.theirMessage]}
          >
            <Text style={[styles.messageText, item.senderId === senderId ? styles.myMessageText : styles.theirMessageText]}>
              {item.text}
            </Text>
            {/* Only show time if this message is selected */}
            {selectedMessage?.id === item.id && (
              <Text style={styles.timestamp}>{formatTime(item.createdAt)}</Text> 
            )}
          </TouchableOpacity>
        )}
        inverted={false}  // Remove inversion to start from the top
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message..."
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f1',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10,
    backgroundColor: '#66b366',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4d734d',
  },
  backButton: {
    padding: 5,
  },
  chatHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  messageContainer: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '80%',
    marginHorizontal: 15,
  },
  myMessage: {
    backgroundColor: '#66b366',
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  theirMessage: {
    backgroundColor: '#a1d18d',
    alignSelf: 'flex-start',
    marginLeft: 15,
  },
  messageText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    color: '#fff',
  },
  theirMessageText: {
    color: '#333',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    marginLeft: 10,   // Moves the time slightly to the right
    alignSelf: 'flex-end', // Align time to the right for consistency
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#66b366',
  },
  input: {
    flex: 1,
    height: 45,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#66b366',
    borderRadius: 50,
    padding: 10,
  },
});

export default ChatRoomScreen;
