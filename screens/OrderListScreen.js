import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const OrderListScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState('All Orders');

  const orders = {
    'All Orders': [
      { id: 1, type: 'Deliver / Pick-up', price: '₱100.00', status: 'Pending' },
      { id: 2, type: 'Deliver / Pick-up', price: '₱200.00', status: 'Processing' },
      { id: 3, type: 'Deliver / Pick-up', price: '₱150.00', status: 'Completed' },
      { id: 4, type: 'Deliver / Pick-up', price: '₱50.00', status: 'Cancelled' },
    ],
    'Pending': [{ id: 1, type: 'Deliver / Pick-up', price: '₱100.00', status: 'Pending' }],
    'Processing': [{ id: 2, type: 'Deliver / Pick-up', price: '₱200.00', status: 'Processing' }],
    'Completed': [{ id: 3, type: 'Deliver / Pick-up', price: '₱150.00', status: 'Completed' }],
    'Cancelled': [{ id: 4, type: 'Deliver / Pick-up', price: '₱50.00', status: 'Cancelled' }],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: 'https://via.placeholder.com/60' }}
          style={styles.shopLogo}
        />
        <View style={styles.shopInfo}>
          <TouchableOpacity onPress={() => navigation.navigate('ShopDetails')}>
            <Text style={styles.shopName}>Shop Name</Text>
          </TouchableOpacity>
          <Text style={styles.shopRating}>⭐ 4.9</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Order"
          placeholderTextColor="#888"
        />
      </View>

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

      <View style={styles.orderList}>
        {orders[activeTab].map((order) => (
          <View style={styles.orderCard} key={order.id}>
            <View style={styles.orderDetails}>
              <Text style={styles.orderTitle}>Order #{order.id}</Text>
              <Text style={styles.orderType}>{order.type}</Text>
              <Text style={styles.orderPrice}>{order.price}</Text>
            </View>
            <View style={styles.orderActions}>
              <Text style={[styles.orderStatus, styles[order.status.toLowerCase()]]}>{order.status}</Text>
              <TouchableOpacity
                style={[styles.viewOrderButtonDetails, { marginTop: 10 }]}
                onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}
              >
                <Text style={styles.viewOrderText}>View Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F8F9FA',
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2E4C2D',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
  shopLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  shopInfo: {
    flex: 1,
  },
  shopName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
  },
  shopRating: {
    fontSize: 14,
    color: '#FFD700',
    marginTop: 5,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    margin: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
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
  tabContainer: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#2E4C2D',
  },
  tabText: {
    color: '#888',
    fontSize: 14,
  },
  tabTextActive: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  orderList: {
    paddingHorizontal: 20,
  },
  orderCard: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#EEE',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  orderDetails: {
    flex: 1,
    marginRight: 10,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  orderType: {
    fontSize: 14,
    color: '#777',
    marginVertical: 5,
  },
  orderPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4C2D',
  },
  orderActions: {
    alignItems: 'flex-end',
  },
  orderStatus: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    marginTop: 10,
  },
  pending: { color: '#FFA500' },
  processing: { color: '#007BFF' },
  completed: { color: '#28A745' },
  cancelled: { color: '#DC3545' },
  viewOrderButtonDetails: {
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#2E4C2D',
    borderRadius: 5,
    marginBottom: 10,
  },
  viewOrderText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default OrderListScreen;
