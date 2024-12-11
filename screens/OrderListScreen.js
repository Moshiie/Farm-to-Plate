import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderListScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All Orders'); // State to track active tab

  // Sample orders for each tab
  const orders = {
    'All Orders': [
      { id: 1, type: 'Deliver / Pick-up', price: '₱100.00', status: 'Pending' },
      { id: 2, type: 'Deliver / Pick-up', price: '₱200.00', status: 'Processing' },
      { id: 3, type: 'Deliver / Pick-up', price: '₱150.00', status: 'Completed' },
      { id: 4, type: 'Deliver / Pick-up', price: '₱50.00', status: 'Cancelled' },
    ],
    'Pending': [
      { id: 1, type: 'Deliver / Pick-up', price: '₱100.00', status: 'Pending' },
    ],
    'Processing': [
      { id: 2, type: 'Deliver / Pick-up', price: '₱200.00', status: 'Processing' },
    ],
    'Completed': [
      { id: 3, type: 'Deliver / Pick-up', price: '₱150.00', status: 'Completed' },
    ],
    'Cancelled': [
      { id: 4, type: 'Deliver / Pick-up', price: '₱50.00', status: 'Cancelled' },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header Section with Shop Name */}
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/60' }} // Shop logo placeholder
          style={styles.shopLogo}
        />
        <View style={styles.shopInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('ShopDetails')}>
            <Text style={styles.shopName}>Shop Name</Text>
          </TouchableOpacity>
          <Text style={styles.shopRating}>⭐ 4.9</Text>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Order"
          placeholderTextColor="#888"
        />
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {['All Orders', 'Pending', 'Processing', 'Completed', 'Cancelled'].map((status, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tabButton, activeTab === status && styles.activeTab]}
              onPress={() => setActiveTab(status)}
            >
              <Text style={activeTab === status ? styles.tabTextActive : styles.tabText}>{status}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Order List */}
      <View style={styles.orderList}>
        {orders[activeTab].map((order) => (
          <View style={styles.orderCard} key={order.id}>
            <Text style={styles.orderTitle}>Order #{order.id}</Text>
            <Text style={styles.orderType}>{order.type}</Text>
            <Text style={styles.orderPrice}>{order.price}</Text>
            <Text style={styles.orderStatus}>{order.status}</Text>
            <TouchableOpacity
              style={styles.viewOrderButton}
              onPress={() => navigation.navigate('OrderDetails')}
            >
              <Text style={styles.viewOrderText}>View Order {'>'}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#09320a',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
  },
  shopLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },
  shopInfo: {
    flex: 1,
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
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 25,
    margin: 20,
    padding: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  tabContainer: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 10,
    paddingHorizontal: 20,
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
  orderList: {
    padding: 20,
  },
  orderCard: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  orderType: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  orderPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4C2D',
    marginBottom: 10,
  },
  orderStatus: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  viewOrderButton: {
    alignItems: 'flex-end',
  },
  viewOrderText: {
    color: '#2E4C2D',
    fontWeight: 'bold',
  },
});

export default OrderListScreen;
