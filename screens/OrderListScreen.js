import React, { useState, useEffect, useContext, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';  
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../providers/AuthProvider';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

const OrderListScreen = ({ navigation }) => {
  const { userAuthData } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('All Orders');
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const ordersRef = collection(db, 'orders');
      const ordersQuery = query(ordersRef, where('store_id', '==', userAuthData?.uid));
      const querySnapshot = await getDocs(ordersQuery);

      const fetchedOrders = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setOrders(fetchedOrders);
      setFilteredOrders(fetchedOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchOrders();  
    }, [])
  );

  useEffect(() => {
    if (activeTab === 'All Orders') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(orders.filter((order) => order.status === activeTab));
    }
  }, [activeTab, orders]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredOrders(orders);
    } else {
      setFilteredOrders(
        orders.filter((order) =>
          order.product_name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, orders]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
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

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search Order"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Tabs */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabContainer}
      >
        {['All Orders', 'Pending', 'Processing', 'Completed', 'Cancelled'].map(
          (status, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.tabButton, activeTab === status && styles.activeTab]}
              onPress={() => setActiveTab(status)}
            >
              <Text
                style={activeTab === status ? styles.tabTextActive : styles.tabText}
              >
                {status}
              </Text>
            </TouchableOpacity>
          )
        )}
      </ScrollView>

      {/* Order List */}
      {loading ? (
        <ActivityIndicator size="large" color="#2E4C2D" />
      ) : filteredOrders.length > 0 ? (
        <View style={styles.orderList}>
          {filteredOrders.map((order) => (
            <View style={styles.orderCard} key={order.id}>
              <View style={styles.orderDetails}>
                <Text style={styles.orderTitle}>{order.product_name}</Text>
                <Text style={styles.orderDescription}>
                  Date: {order.order_date?.toDate().toLocaleDateString() || 'N/A'}
                </Text>
                <Text style={styles.orderDescription}>
                  Quantity: {order.quantity} | Subtotal: ₱{order.subtotal}
                </Text>
              </View>
              <View style={styles.orderActions}>
                <Text style={[styles.orderStatus, styles[order.status.toLowerCase()]]}>
                  {order.status}
                </Text>
                <TouchableOpacity
                  style={styles.viewOrderButtonDetails}
                  onPress={() => navigation.navigate('OrderDetails', { orderId: order.id })}
                >
                  <Text style={styles.viewOrderText}>View Order</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <Text style={styles.noOrdersText}>No orders available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#F8F9FA', paddingBottom: 20 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2E4C2D',
  },
  shopLogo: { width: 60, height: 60, borderRadius: 30, marginRight: 15 },
  shopInfo: { flex: 1 },
  shopName: { fontSize: 22, fontWeight: 'bold', color: '#FFF' },
  shopRating: { fontSize: 14, color: '#FFD700', marginTop: 5 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
    margin: 20,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: { flex: 1, fontSize: 16, color: '#333', marginLeft: 10 },
  tabContainer: {
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 12,
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#2E4C2D',
  },
  activeTab: { backgroundColor: '#2E4C2D' },
  tabText: { color: '#2E4C2D', fontSize: 14 },
  tabTextActive: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  orderList: { paddingHorizontal: 20 },
  orderCard: {
    backgroundColor: '#FFF',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderDetails: { flex: 1, marginRight: 10 },
  orderTitle: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  orderDescription: { fontSize: 14, color: '#777', marginVertical: 5 },
  orderActions: { alignItems: 'flex-end' },
  orderStatus: { fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  pending: { color: '#FFA500' },
  processing: { color: '#007BFF' },
  completed: { color: '#28A745' },
  cancelled: { color: '#DC3545' },
  viewOrderButtonDetails: { padding: 10, backgroundColor: '#2E4C2D', borderRadius: 5 },
  viewOrderText: { color: '#FFF', fontSize: 14, fontWeight: 'bold' },
  noOrdersText: { textAlign: 'center', marginTop: 20, fontSize: 16, color: '#888' },
});

export default OrderListScreen;
