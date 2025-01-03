import React, { useState, useEffect, useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, query, or, where, onSnapshot } from 'firebase/firestore';
import { AuthContext } from '../providers/AuthProvider';

const ChatScreen = ({ navigation }) => {
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
          or(where('buyer_id', '==', userId), where('farmer_id', '==', userId)) // Fetch both buyer and farmer chats
        );

        // Real-time updates with onSnapshot
        const unsubscribe = onSnapshot(chatRoomsQuery, (querySnapshot) => {
          const fetchedChatRooms = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
            actingAs: doc.data().buyer_id === userId ? 'Buyer' : 'Seller',  
            lastMessage: doc.data().last_message,
            lastMessageTime: doc.data().last_message_time,
          }));
          setChatRooms(fetchedChatRooms);
          setLoading(false);
        });

        return unsubscribe; // Clean up listener on unmount
      } catch (error) {
        console.error('Error fetching chat rooms:', error);
        setLoading(false);
      }
    };

    fetchChats();
  }, [userAuthData?.uid]);

  const formatTime = (time) => {
    if (!time) return '';
    const date = time.seconds ? new Date(time.seconds * 1000) : new Date(time);
    return `${date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()}`;
  };

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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatItem}
            onPress={() => navigation.navigate('ChatRoom', { 
              chatId: item.id, 
              name: item.buyer_id === userAuthData.uid ? item.store_name : item.buyer_name 
            })}
          >
            <View>
              <Text style={styles.chatName}>Chat with{" "}
                {item.buyer_id === userAuthData.uid ? item.store_name : item.buyer_name}
              </Text>
              <Text style={styles.chatRoleIndicator}>
                {`You are acting as a ${item.actingAs}`}
              </Text>
              <Text style={styles.chatMessage}>{item.last_message || 'No recent message'}</Text>
              {item.lastMessageTime && (
                <Text style={styles.chatTime}>{formatTime(item.lastMessageTime)}</Text>
              )}
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
    backgroundColor: '#66b366',
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
  chatRoleIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: '#d1ffd1',
    marginVertical: 4,
  },
  chatMessage: {
    fontSize: 14,
    color: '#fff',
  },
  chatTime: {
    fontSize: 12,
    color: '#d1ffd1',
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
