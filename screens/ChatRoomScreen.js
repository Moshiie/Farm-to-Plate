import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Dummy data for messages
const messages = [
  { id: '1', user: 'me', text: 'Hey! How are you?' },
  { id: '2', user: 'John Doe', text: 'I’m good, you?' },
  { id: '3', user: 'me', text: 'Doing well, thanks!' },
];

const ChatRoomScreen = ({ route, navigation }) => {
  const { chatId, name } = route.params;
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      // Here you can send the message or update the chat state
      console.log('Send message:', message);
      setMessage(''); // Clear the input field
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={20} color="#000" />
        </TouchableOpacity>
        <Text style={styles.chatHeader}>Chat with {name}</Text>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={[styles.messageContainer, item.user === 'me' && styles.myMessage]}>
            <Text style={[styles.messageText, item.user === 'me' && styles.myMessageText]}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type a message"
          value={message}
          onChangeText={setMessage}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f1',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  backButton: {
    padding: 5,
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4d734d',
    marginLeft: 5,
  },
  messageContainer: {
    backgroundColor: '#d1e8d1',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  myMessage: {
    backgroundColor: '#66b366',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: '#333',
    fontSize: 14,
  },
  myMessageText: {
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#66b366',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  sendText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ChatRoomScreen;
