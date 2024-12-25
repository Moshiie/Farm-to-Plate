import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

const BuyerOrderDetailsScreen = ({ route, navigation }) => {

  const { order } = route.params; // Passed order details from the previous screen

  useEffect(() => {
    console.log(order.store_address);
  }, [ ]);

  const [status, setStatus] = useState(order.status || 'Pending');

  const handleCancelOrder = async () => {
    try {
      // Update the order status in Firestore
      const orderRef = doc(db, 'orders', order.order_id);
      await updateDoc(orderRef, { status: 'Canceled' });
      
      setStatus('Canceled');
      Alert.alert('Order Canceled', 'Your order status has been updated to Canceled.');

      navigation.navigate('Home');

    } catch (error) {
      console.error('Error updating order status:', error);
      Alert.alert('Error', 'Failed to cancel the order. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Details</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Order Summary */}
        <Text style={styles.sectionTitle}>Order Summary</Text>
        <Text style={styles.detailText}>Product: {order.product_name}</Text>
        <Text style={styles.detailText}>Quantity: {order.quantity}</Text>
        <Text style={styles.detailText}>Subtotal: ₱{order.subtotal.toFixed(2)}</Text>
        <Text style={styles.detailText}>Delivery Fee: ₱{order.delivery_fee.toFixed(2)}</Text>
        <Text style={styles.detailText}>Total: ₱{order.total_amount.toFixed(2)}</Text>
        <Text style={styles.detailText}>Status: {status}</Text>

        {/* Store Details */}
        <Text style={styles.sectionTitle}>Store Information</Text>
        <Text style={styles.detailText}>Store: {order.store_name}</Text>
        <Text style={styles.detailText}>Address: {order.store_address}</Text>

        {/* Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backHomeButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.buttonText}>Back to Home</Text>
          </TouchableOpacity>

          {status !== 'Canceled' && (
            <TouchableOpacity style={styles.cancelButton} onPress={handleCancelOrder}>
              <Text style={styles.buttonText}>Cancel Order</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#7A9F59',
    paddingHorizontal: 15,
    paddingVertical: 15,
  },
  headerText: { fontSize: 20, color: '#fff', marginLeft: 10, fontWeight: 'bold' },
  content: { padding: 20 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginVertical: 10, color: '#333' },
  detailText: { fontSize: 16, color: '#555', marginBottom: 5 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },
  backHomeButton: {
    backgroundColor: '#28a745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  cancelButton: {
    backgroundColor: '#ff6347',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
    marginLeft: 10,
  },
  buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});

export default BuyerOrderDetailsScreen;
