import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductDetailScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('#')}>
          <Text style={styles.closeText}>X</Text>
        </TouchableOpacity>

        <View style={styles.topIcons}>
          <TouchableOpacity>
            <Text style={styles.cartIcon}>🛒</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={styles.optionsIcon}>⋮</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Product Image */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={{ uri: 'https://via.placeholder.com/300' }}
          resizeMode="contain"
        />
      </View>

      {/* Product Information */}
      <View style={styles.productInfo}>
        <Text style={styles.productName}>Product Name</Text>
        <Text style={styles.productPrice}>₱ 200.00</Text>
        <Text style={styles.productLocation}>📍 Location</Text>
      </View>

      {/* Specifications */}
      <ScrollView style={styles.specificationContainer}>
        <Text style={styles.specificationHeader}>Specification</Text>
        <Text style={styles.specificationText}>
          Lorem ipsum dolor sit amet. Aut animi laudantium eum fugiat distinctio
          et aspernatur laborum eos magnam dolor est laboriosam sint. Et minima
          perferendis ut dolores odit et molestias autem.
        </Text>
      </ScrollView>

      {/* Action Buttons */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>💬</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionText}>🛒</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buyButton}>
          <Text style={styles.buyButtonText}>Buy Now!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#d5e7ce',
  },
  closeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#09320a',
    borderRadius: 15,
    width: 30,
    height: 30,
  },
  closeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  topIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cartIcon: {
    fontSize: 18,
    marginRight: 15,
  },
  optionsIcon: {
    fontSize: 18,
  },
  imageContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    maxHeight: 300,
  },
  productInfo: {
    padding: 15,
    backgroundColor: '#d5e7ce',
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 18,
    color: '#000',
    marginBottom: 5,
  },
  productLocation: {
    fontSize: 14,
    color: '#333',
  },
  specificationContainer: {
    flex: 2,
    padding: 15,
    backgroundColor: '#fff',
  },
  specificationHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  specificationText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
  actionBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#09320a',
  },
  actionButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    width: 50,
    height: 50,
  },
  actionText: {
    fontSize: 18,
  },
  buyButton: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: '#0c3d0c',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProductDetailScreen;
