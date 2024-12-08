import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../services/supabaseClient';

export default function FavouritesScreen({ navigation }) {

  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();

        if (userError || !user) {
          console.error('No user found:', userError?.message || 'User is undefined');
          return;
        }
        
        if (user) {
          // Step 1: Fetch account_id from the accounts table using user_id
          const { data: accountData, error: accountError } = await supabase
            .from('accounts')
            .select('account_id')
            .eq('user_id', user.id)
            .single(); // Get the account_id associated with the logged-in user
    
          if (accountError) {
            console.error('Error fetching account_id:', accountError.message);
            return;
          }
    
          const account_id = accountData.account_id;

          // Step 2: Fetch favourites from the favourites table using account_id
          const { data, error } = await supabase
            .from('favorites')
            .select('product_id, products(product_id, product_name, price, stock_quantity)')
            .eq('account_id', account_id); // Get the current user's favourites

          if (error) {
            throw new Error(error.message);
          }

          setFavourites(data.map(item => item.products)); // Extract product details
        }

      } catch (error) {
        console.error('Error fetching favourites:', error);
        
      } finally {
        setLoading(false);
      }
    };

    fetchFavourites();
  }, []);

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => console.log('Proceed to Product Details')}
    >
      <Image source={{ uri: item.image_url }} style={styles.productImage} />
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.productPrice}>{`₱${item.price}`}</Text>
      <Text style={styles.productStock}>{`${item.stock_quantity} in stock`}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Favourites</Text>
        <TouchableOpacity>
          <Ionicons name="cart-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      {loading ? (
        <ActivityIndicator size="large" color="#7A9F59" style={styles.loader} />
      ) : favourites.length > 0 ? (
        <FlatList
          data={favourites}
          renderItem={renderProduct}
          keyExtractor={(item) => item.product_id}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.iconContainer}>
            <Ionicons name="heart" size={100} color="#7A9F59" />
          </View>
          <Text style={styles.heading}>No favourites saved</Text>
          <Text style={styles.subText}>
            To make ordering even faster, you’ll find all your faves here. Just look for the heart icon!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.button}>
            <Text style={styles.buttonText}>Let’s find some favourites</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home-outline" size={28} color="#7A9F59" />
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
    backgroundColor: '#fff',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  productCard: {
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  productImage: {
    height: 100,
    width: 100,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
  productStock: {
    fontSize: 12,
    color: '#888',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  iconContainer: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1C3814',
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
  },
});