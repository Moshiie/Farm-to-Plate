import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, onSnapshot } from 'firebase/firestore'; 
import { AuthContext } from '../providers/AuthProvider';

const ChatScreen = ({ navigation, route }) => {
  const { userAuthData } = useContext(AuthContext);
  const [chatRooms, setChatRooms] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const userId = userAuthData?.uid;
        if (!userId) return;

        const chatRoomsRef = collection(db, 'chat_rooms');
        
        const chatRoomsQuery = query(
          chatRoomsRef,
          where('status', '==', 'active'), 
          where('buyer_id', '==', userId) 
        );
        
        // Using onSnapshot for real-time updates
        const unsubscribe = onSnapshot(chatRoomsQuery, (querySnapshot) => {
          const fetchedChatRooms = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setChatRooms(fetchedChatRooms); // Set chat rooms to state
          setLoading(false);
        });

        return unsubscribe; // Clean up on unmount
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
        setLoading(false);
      }
    };

    fetchChats();
  }, []); // Empty dependency array to run only once

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2E4C2D" />
        <Text style={styles.loadingText}>Loading chats...</Text>
      </View>
    );
  }

  if (chatRooms.length === 0) {
    return (
      <View style={styles.noChatsContainer}>
        <Text style={styles.noChatsText}>No chats available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={chatRooms}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatRoom', { chatId: item.id, name: item.name })}
          >
            <View>
              <Text style={styles.chatName}>Chat with Farmer {item.farmer_id}</Text>
              <Text style={styles.chatMessage}>{item.last_message || 'No recent message'}</Text>
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#888',
  },
  noChatsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noChatsText: {
    fontSize: 18,
    color: '#888',
  },
});

export default ChatScreen;
