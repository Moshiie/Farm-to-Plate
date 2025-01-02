import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

// Dummy data for chats
const chats = [
  { id: '1', name: 'John Doe', message: 'Hey there!' },
  { id: '2', name: 'Jane Smith', message: 'Let’s meet up tomorrow!' },
  { id: '3', name: 'Mike Brown', message: 'How’s the project going?' },
];

const ChatScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={chats}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatRoom', { chatId: item.id, name: item.name })}
          >
            <View>
              <Text style={styles.chatName}>{item.name}</Text>
              <Text style={styles.chatMessage}>{item.message}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7f1',
    padding: 10,
  },
  chatItem: {
    backgroundColor: '#66b366', // Green background
    padding: 15,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  chatMessage: {
    fontSize: 14,
    color: '#fff',
  },
});

export default ChatScreen;
