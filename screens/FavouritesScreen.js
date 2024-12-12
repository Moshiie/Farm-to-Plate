import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  Alert,
} from 'react-native';
import { collection, query, where } from "firebase/firestore";
import { db } from '../firebaseConfig';
import { Ionicons } from '@expo/vector-icons';

export default function FavouritesScreen({ navigation, route }) {
  // Retrieve the favourites list and initialize it in state
  const [favourites, setFavourites] = useState(route.params?.favourites || []);

  // Function to remove an item from favourites
  const handleRemoveItem = (item) => {
    Alert.alert(
      'Remove Favourite',
      `Are you sure you want to remove ${item.name} from favourites?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setFavourites((prevFavourites) =>
              prevFavourites.filter((favourite) => favourite.id !== item.id)
            );
          },
        },
      ]
    );
  };

  const renderFavouriteItem = ({ item }) => (
    <View style={styles.favouriteItem}>
      <Ionicons name="image-outline" size={50} color="#4CAF50" style={styles.itemIcon} />
      <View style={styles.itemDetails}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
        <Text style={styles.productSold}>{item.sold}</Text>
      </View>
      <TouchableOpacity
        style={styles.removeButton}
        onPress={() => handleRemoveItem(item)}
      >
        <Ionicons name="trash-outline" size={24} color="#E63946" />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Favourites</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <View style={styles.container}>
        {favourites.length > 0 ? (
          <FlatList
            data={favourites}
            renderItem={renderFavouriteItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.favouritesList}
          />
        ) : (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={100} color="#4CAF50" style={styles.emptyIcon} />
            <Text style={styles.heading}>No favourites saved</Text>
            <Text style={styles.subText}>
              To make ordering even faster, you’ll find all your faves here. Just look for the heart icon!
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.buttonText}>Let’s find some favourites</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={28} color="#4CAF50" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
          <Ionicons name="chatbubble-outline" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  favouritesList: {
    paddingBottom: 20,
  },
  favouriteItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  itemIcon: {
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 5,
  },
  productSold: {
    fontSize: 12,
    color: '#999',
    marginTop: 3,
  },
  removeButton: {
    padding: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    backgroundColor: '#fff',
  },
});
