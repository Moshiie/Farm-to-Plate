import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image, ImageBackground, Alert } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { Ionicons } from '@expo/vector-icons';
import { collection, getDocs, query, where, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebaseConfig'; // Assuming you're exporting the db from firebaseConfig

const ProductListScreen = ({ navigation }) => {

  const { userData } = useContext(AuthContext);

  const [products, setProducts] = useState([]); // Store products data
  const [loading, setLoading] = useState(true); // Track loading state
  const [searchQuery, setSearchQuery] = useState(''); // For search functionality
  const [farmerDetails, setFarmerDetails] = useState('');
  
  // Function to fetch products from Firestore
  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        const farmerCollectionRef = collection(db, 'users', userData.uid, 'farmer_details');
        const q = query(farmerCollectionRef, where("email", "==", userData.email));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const docSnap = querySnapshot.docs[0];
          const data = docSnap.data();
          setFarmerDetails(data);
          console.log(data);
        }

      } catch (error) {
        console.error('Error fetching farmer details:', error.message);
      }
    };
      
    const fetchProducts = async () => {

      try {
        const userId = userData.uid;

        const productQuery = query(
          collection(db, 'products'),
          where('farmer_id', '==', userId) 
        );

        const productSnapshot = await getDocs(productQuery);
        const productList = productSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(productList);
        setLoading(false);

      } catch (error) {
        console.error('Error fetching products: ', error);
        setLoading(false);
        Alert.alert('Error', 'Failed to load products.');
      }
    };

    fetchProducts();
    fetchFarmerDetails(); 
  }, [userData.uid]);

  const deleteProduct = async (productId) => {
    try {
      await deleteDoc(doc(db, 'products', productId)); // Delete product from Firestore
      setProducts(products.filter(product => product.id !== productId)); // Update the product list
      Alert.alert('Success', 'Product deleted successfully.');

    } catch (error) {
      console.error('Error deleting product: ', error);
      Alert.alert('Error', 'Failed to delete product.');
    }
  };

  const confirmDelete = (productId) => {
    Alert.alert(
      'Delete Product',
      'Are you sure you want to delete this product?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Delete', onPress: () => deleteProduct(productId), style: 'destructive' },
      ],
      { cancelable: true }
    );
  };

  // Filter products based on search query
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section with Background Image */}
      <ImageBackground
        source={require('../images/veg.jpg')} // Replace with the actual background URL
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Search Bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search Product"
            placeholderTextColor="#888"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Shop Header */}
        <View style={styles.shopHeader}>
          <Image
            source={{ uri: 'https://via.placeholder.com/60' }} // Replace with actual logo URL
            style={styles.shopLogo}
          />
          <View style={styles.shopInfo}>
            <TouchableOpacity onPress={() => navigation.navigate('ShopDashboard')}>
              <Text style={styles.shopName}>{farmerDetails.store_name}</Text>
            </TouchableOpacity>
            {/* <Text style={styles.shopRating}>⭐ 4.9</Text> */}
          </View>
        </View>
      </ImageBackground>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity style={[styles.tabButton, styles.activeTab]}>
            <Text style={styles.tabTextActive}>All Products</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Category 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Category 2</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Category 3</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tabButton}>
            <Text style={styles.tabText}>Sold Out</Text>
          </TouchableOpacity> */}
        </ScrollView>
      </View>

      {/* Product Count */}
      <View style={styles.productCountContainer}>
        <Text style={styles.productCountText}>{filteredProducts.length} {filteredProducts.length === 1 ? 'Product' : "Products"}</Text>
      </View>

      {/* Product Grid */}
      <View style={styles.productGrid}>
        {loading ? (
          <Text>Loading...</Text>
        ) : filteredProducts.length === 0 ? (
          <>
            <Text>No products found</Text>

            {/* Add Product Button */}
            <TouchableOpacity
              style={styles.addProductButton}
              onPress={() => navigation.navigate('AddProduct')}
            >
              <Text style={styles.addProductText}>Add Product</Text>
            </TouchableOpacity>
          </>
        ) : (
          filteredProducts.map((product) => (
            <View style={styles.productCard} key={product.id}>
              <Image
                source={{ uri: product.product_image || 'https://via.placeholder.com/100' }} // Replace with dynamic image URL
                style={styles.productImage}
              />
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productInfo}>{product.stock} pieces left</Text>
              <Text style={styles.productPrice}>₱{product.price}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => navigation.navigate('AddProduct', { product, isEdit: true })}
              >
                <Ionicons name="pencil" size={20} color="blue" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(product.id)}>
                <Ionicons name="trash" size={20} color="red" />
              </TouchableOpacity>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 25,
    width: '90%',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  shopHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
  },
  shopLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  shopInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  shopName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  shopRating: {
    fontSize: 14,
    color: '#FFD700',
  },
  tabContainer: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  tabButton: {
    paddingHorizontal: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#2E4C2D',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#2E4C2D',
    fontSize: 14,
    fontWeight: 'bold',
  },
  productCountContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  productCountText: {
    fontSize: 12,
    color: '#333',
  },
  productGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#EAF4E7',
  },
  productCard: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#DDD',
    padding: 10,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  productInfo: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4C2D',
    marginBottom: 10,
  },
  moreButton: {
    alignSelf: 'flex-end',
  },
  editButton: {
    padding: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  deleteButton: {
    alignSelf: 'flex-end',
  },
  addProductButton: {
    backgroundColor: '#2E4C2D',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  addProductText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default ProductListScreen;
