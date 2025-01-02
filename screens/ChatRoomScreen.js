import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { db } from '../firebaseConfig'; // Import Firestore from your config file
import { collection, query, where, orderBy, onSnapshot, addDoc } from 'firebase/firestore';

const ChatRoomScreen = ({ route, navigation }) => {
  const { chatId, name } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

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

    // Cleanup the listener when the screen is unmounted
    return () => unsubscribe();
  }, [chatId]);

  // Send a new message
  const sendMessage = async () => {
    if (message.trim()) {
      try {
        const newMessage = {
          text: message,
          createdAt: new Date(),
          senderId: 'buyer', // Dynamically set based on the current user role
        };
        await addDoc(collection(db, 'chat_rooms', chatId, 'messages'), newMessage);
        setMessage(''); // Clear the input field
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.chatHeader}>Chat with {name}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.senderId === 'buyer' ? styles.myMessage : styles.theirMessage]}>
            <Text style={[styles.messageText, item.senderId === 'buyer' ? styles.myMessageText : styles.theirMessageText]}>
              {item.text}
            </Text>
          </View>
        )}
        inverted={false}  // Remove inversion so messages start from the top
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
    backgroundColor: '#66b366', // Green header
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
    color: '#fff',  // White header text
    marginLeft: 15,
  },
  messageContainer: {
    backgroundColor: '#d1e8d1',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    maxWidth: '80%',
  },
  myMessage: {
    backgroundColor: '#66b366', // Green for buyer's message
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#a1d18d', // Lighter green for the farmer's message
    alignSelf: 'flex-start',
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#66b366', // Green border for the input area
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
