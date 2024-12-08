import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { supabase } from '../services/supabaseClient'; 

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 20;

export default function HomeScreen({ navigation }) {

  const [searchQuery, setSearchQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const { data: productsData, error: productsError } = await supabase
          .from('products')
          .select('product_id, product_name, price, stock_quantity, store_id')
          .limit(10); // You can adjust the limit based on your needs

        if (productsError) throw new Error(productsError.message);

        // Fetch stores
        const { data: storesData, error: storesError } = await supabase
          .from('stores')
          .select('store_id, store_name, store_description')
          .limit(10); // You can adjust the limit based on your needs

        if (storesError) throw new Error(storesError.message);

        setProducts(productsData);
        setStores(storesData);

      } catch (error) {
        console.error('Error fetching data:', error);

      } finally {
        setLoading(false); // Data fetching complete
      }
    };

    fetchData();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.product_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFavourite = async (product) => {
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('No user found:', userError?.message || 'User is undefined');
      return;
    }
    
    if (user) {
      try {
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
  
        // Check if the product is already in the favorites table
        const { data: favoriteData, error: favoriteError } = await supabase
          .from('favorites')
          .select('favorite_id')
          .eq('account_id', account_id)
          .eq('product_id', product.product_id)
          .limit(1); // Fetch the existing favorite (if any)

        if (favoriteError) {
          console.error('Error fetching favorite:', favoriteError.message);
          return;
        }

        // If favoriteData is null, it means the product is not favorited, so we insert it
        if (!favoriteData || favoriteData.length === 0) {
          // Insert into the favorites table
          const { data, error } = await supabase
            .from('favorites')
            .upsert([
              {
                account_id: account_id,
                product_id: product.product_id,
              },
            ]);

          if (error) {
            console.error('Error adding to favorites:', error.message);
          } else {
            // Successfully added to favorites, update the state
            setProducts((prevProducts) =>
              prevProducts.map((item) =>
                item.product_id === product.product_id
                  ? { ...item, isFavourite: true }
                  : item
              )
            );
          }
          
        } else {
          // If the product is already favorited, delete it from favorites
          if (favoriteData[0]?.favorite_id) {
            const { error: deleteError } = await supabase
              .from('favorites')
              .delete()
              .eq('favorite_id', favoriteData[0].favorite_id); // Ensure favorite_id is present

            if (deleteError) {
              console.error('Error deleting from favorites:', deleteError.message);
            } else {
              // Successfully deleted, update the state
              setProducts((prevProducts) =>
                prevProducts.map((item) =>
                  item.product_id === product.product_id
                    ? { ...item, isFavourite: false }
                    : item
                )
              );
            }
          } else {
            console.error('Favorite ID is missing. Cannot delete favorite.');
          }
        }
      } catch (error) {
        console.error('Error in toggleFavourite:', error.message);
      }
    } else {
      console.log('No user logged in');
    }
  };

  const renderProduct = ({ item }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => console.log('Proceed to Product Details')}
    >
      <TouchableOpacity
        style={styles.favouriteIcon}
        onPress={() => toggleFavourite(item)}
      >
        <Ionicons
          name={item.isFavourite ? 'heart' : 'heart-outline'}
          size={24}
          color={item.isFavourite ? '#E63946' : 'black'}
        />
      </TouchableOpacity>
      <View style={styles.imagePlaceholder}>
        <Ionicons name="image-outline" size={50} color="#555" />
      </View>
      <Text style={styles.productName}>{item.product_name}</Text>
      <Text style={styles.productPrice}>{`₱ ${item.price}`}</Text>
      <Text style={styles.productStock}>{`${item.stock_quantity} in stock`}</Text>
      </TouchableOpacity>
  );

  const renderShop = ({ item }) => (
    <TouchableOpacity 
      style={styles.shopCard}
      onPress={() => console.log('Proceed to Store Details')}
    >
      <Ionicons name="storefront-outline" size={40} color="#555" style={styles.shopIcon} />
      <View style={styles.shopDetails}>
        <Text style={styles.shopName}>{item.store_name}</Text>
        <Text style={styles.shopLocation}>{item.store_description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#7A9F59" />
      <LinearGradient colors={['#7A9F59', '#fff']} style={styles.container}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.locationContainer}>
            <Ionicons name="location-outline" size={20} color="#fff" />
            <View>
              <Text style={styles.locationText}>Rosario Cres</Text>
              <Text style={styles.locationSubText}>Cagayan de Oro Misamis Oriental</Text>
            </View>
          </View>
          <View style={styles.topIcons}>
            <TouchableOpacity onPress={() => navigation.navigate('Favourites')}>
              <Ionicons name="heart-outline" size={24} color="#fff" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
              <Ionicons name="cart-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <Ionicons name="search-outline" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Search for products or shops..."
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Content */}
        {loading ? (
          <ActivityIndicator size="large" color="#7A9F59" style={styles.loader} />
        ) : (
          <View style={styles.contentContainer}>
            {/* Recommended Products */}
            <Text style={styles.sectionTitle}>Recommended Products</Text>
            <FlatList
              data={filteredProducts}
              renderItem={renderProduct}
              keyExtractor={(item) => item.product_id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productList}
            />

            {/* Recommended Shops */}
            <Text style={styles.sectionTitle}>Recommended Shops</Text>
            <FlatList
              data={stores}
              renderItem={renderShop}
              keyExtractor={(item) => item.store_id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.shopList}
            />
          </View>
        )}

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity onPress={() => navigation.navigate('Home')}>
            <Ionicons name="home" size={28} color="#7A9F59" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
            <Ionicons name="chatbubble-outline" size={28} color="#333" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
            <Ionicons name="person-outline" size={28} color="#333" />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#7A9F59',
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 10 : 30,
    paddingBottom: 10,
    backgroundColor: '#7A9F59',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 5,
  },
  locationSubText: {
    color: '#ddd',
    fontSize: 12,
    marginLeft: 5,
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 70,
  },
  searchBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBar: {
    flex: 1,
    height: 40,
    color: '#333',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 20,
  },
  productList: {
    paddingHorizontal: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    width: cardWidth,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    position: 'relative',
  },
  favouriteIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  imagePlaceholder: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EAEAEA',
    borderRadius: 10,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  productStock: {
    fontSize: 10,
    color: '#888',
  },
  shopList: {
    paddingHorizontal: 15,
  },
  shopCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: 250,
  },
  shopIcon: {
    marginRight: 15,
  },
  shopDetails: {
    flex: 1,
  },
  shopName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  shopLocation: {
    fontSize: 14,
    color: '#888',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    width: '100%',
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    position: 'absolute',
    bottom: 0,
  },
});