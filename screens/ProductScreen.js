import React, { useState, useEffect, useContext }from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Alert, Modal  } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { db } from '../firebaseConfig'
import { collection, doc, setDoc, getDocs, query, where } from 'firebase/firestore';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ProductScreen = ({ route, navigation }) => {

  const { userData, userAuthData } = useContext(AuthContext);
  const { product } = route.params; 
  const [farmerDetails, setFarmerDetails] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [subTotal, setSubTotal] = useState(product.price ? parseFloat(product.price) : 0);
  const [voucher, setVoucher] = useState(null); // to hold the applied voucher
  const [vouchers, setVouchers] = useState([]); // to hold the available vouchers
  const [deliveryFee] = useState(100); // Static delivery fee
  const [adjustedDeliveryFee, setAdjustedDeliveryFee] = useState(deliveryFee);
  const [modalVisible, setModalVisible] = useState(false);
  
  useEffect(() => {
    setSubTotal(product.price * quantity); 
  }, [quantity, product.price]);

  useEffect(() => {
    const fetchFarmerDetails = async () => {
      try {
        const farmerRef = collection(db, `users/${product.farmer_id}/farmer_details`);
        const q = query(farmerRef, where('farmer_id', '==', product.farmer_id));
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach((doc) => {
            setFarmerDetails(doc.data());
            console.log(doc.data());
          });

        } else {
          console.log('No matching farmer found');
          Alert.alert('Error', 'Store not found for this product');
        }

      } catch (error) {
        console.error('Error fetching farmer details: ', error);
        Alert.alert('Error', 'There was an error fetching the farmer details');
      }
    };

    fetchFarmerDetails();
  }, [product.farmer_id]);

  const handleVoucherFetch = async () => {
    try {
      const vouchersRef = collection(db, 'voucher');
      const querySnapshot = await getDocs(vouchersRef);
      const fetchedVouchers = [];
      querySnapshot.forEach((doc) => {
        fetchedVouchers.push(doc.data());
        console.log(doc.data());
      });
      setVouchers(fetchedVouchers);
      setModalVisible(true);

    } catch (error) {
      console.error('Error fetching vouchers: ', error);
      Alert.alert('Error', 'There was an error fetching the vouchers');
    }
  };

  const handleVoucherApply = (selectedVoucher) => {

    const currentDate = new Date();
    const expiryDate = selectedVoucher.expiry_date.toDate();

    if (expiryDate < currentDate) {
      Alert.alert('Voucher Expired', 'This voucher has expired.');
      return;
    }

    if (subTotal < selectedVoucher.discount.min_spend) {
      Alert.alert('Minimum Spend Required', `This voucher requires a minimum spend of ₱${selectedVoucher.discount.min_spend}.`);
      return;
    }

    if (selectedVoucher.type === 'delivery') {
      // Calculate the delivery fee discount
      const discountAmount = Math.min(
        selectedVoucher.discount.type === 'percentage'
          ? (deliveryFee * selectedVoucher.discount.amount) / 100
          : selectedVoucher.discount.amount,
        deliveryFee
      );

      const newDeliveryFee = Math.max(0, deliveryFee - discountAmount);
      setAdjustedDeliveryFee(newDeliveryFee);
  
      setVoucher({
        ...selectedVoucher,
        discount_amount: discountAmount,
        discount_type: 'delivery',
      });
  
      Alert.alert('Delivery Discount Applied', `You get ₱${discountAmount.toFixed(2)} off on delivery.`);
      
    } else if (selectedVoucher.type === 'subtotal') {
      const discountAmount =
        selectedVoucher.discount.type === 'percentage'
          ? (subTotal * selectedVoucher.discount.amount) / 100
          : selectedVoucher.discount.amount;
  
      setVoucher({
        ...selectedVoucher,
        discount_amount: discountAmount,
        discount_type: 'subtotal',
      });
  
      Alert.alert('Subtotal Discount Applied', `You get ₱${discountAmount.toFixed(2)} off your subtotal.`);
      setSubTotal((prevSubTotal) => prevSubTotal - discountAmount);
    }
    setModalVisible(false);
  };

  const handleCheckout = async () => {
    if (!userData) {
      Alert.alert('Error', 'Please log in to place an order');
      return;
    }

    if (!farmerDetails || !farmerDetails.default_pickup_address) {
      Alert.alert('Error', 'Unable to retrieve store pickup address');
      return;
    }

    const effectiveDeliveryFee =
      voucher && voucher.discount_type === 'delivery'
        ? Math.max(deliveryFee - voucher.discount_amount, 0) // Prevent negative fees
        : deliveryFee;

    const totalAmount =
      (voucher && voucher.discount_type === 'subtotal' ? subTotal : subTotal) + effectiveDeliveryFee;

    const orderId = `${userAuthData.uid}_${new Date().getTime()}`;
    const order = {
      user_id: userAuthData.uid,
      user_name: userData.first_name + userData.last_name || 'NoName',
      user_email: userData.email,
      product_id: product.id,
      product_name: product.name,
      product_price: product.price,
      product_image: product.product_image || '',
      product_description: product.description,
      store_id: product.farmer_id,
      store_name: farmerDetails.store_name,
      store_address: farmerDetails.default_pickup_address,
      order_date: new Date(),
      quantity: quantity,
      subtotal: subTotal,  
      delivery_fee: deliveryFee,
      total_amount: totalAmount,
      voucher_applied: voucher ? voucher.name : null, 
      voucher_discount: voucher ? voucher.discount_amount : 0,
      status: 'Pending', // Example status, you can add more
    };

    try {
      // Add the order to Firestore
      await setDoc(doc(db, 'orders', orderId), order);
      Alert.alert('Success', 'Your order has been placed');

      const orderForNavigation = {
        ...order,
        order_id: orderId,
        order_date: new Date().toISOString(),
        store_address: `${farmerDetails.default_pickup_address.address_line_1}, ${farmerDetails.default_pickup_address.city}, ${farmerDetails.default_pickup_address.zip_code}`, // Flatten the object to text
      };

      navigation.navigate('BuyerOrderDetails', { order: orderForNavigation }); // Navigate to home or another page after successful order

    } catch (error) {
      console.error('Error placing order: ', error);
      Alert.alert('Error', 'There was an error placing your order. Please try again.');
    }
    
  }

  return (
    <LinearGradient colors={['#7A9F59', '#fff']} style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={28} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Product Details</Text>
      </View>

      {/* Scrollable content for Product Details */}
      <ScrollView style={styles.content}>
        <View style={styles.productCard}>
          {/* Image or Placeholder */}
          <View style={styles.imageContainer}>
            {product.product_image ? (
              <Image source={{ uri: product.product_image }} style={styles.productImage} />
            ) : (
              <Ionicons name="image-outline" size={100} color="#888" />
            )}
          </View>

          {/* Product Name and Price */}
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>₱ {product.price}</Text>

          {/* Product Description */}
          <Text style={styles.productDescription}>
            {product.description || "No description available"}
          </Text>

          {/* Product Stock */}
          <Text style={styles.productStock}>Stock: {product.stock}</Text>

          {/* Quantity Selection */}
          <View style={styles.quantityContainer}>
            <Text style={styles.quantityText}>Quantity:</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(Math.max(quantity - 1, 1))}
            >
              <Ionicons name="remove" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.quantityNumber}>{quantity}</Text>
            <TouchableOpacity
              style={styles.quantityButton}
              onPress={() => setQuantity(quantity + 1)}
            >
              <Ionicons name="add" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* Subtotal Display */}
          <Text style={styles.subtotalText}>Subtotal: ₱ {subTotal.toFixed(2)}</Text>

          {/* Voucher Button */}
          <TouchableOpacity style={styles.voucherButton} onPress={handleVoucherFetch}>
            <Text style={styles.voucherText}>View Vouchers</Text>
          </TouchableOpacity>

          {/* Applied Voucher Information */}
          {voucher && (
            <Text style={styles.voucherText}>
              Applied Voucher: {voucher.name} - {voucher.discount_type === 'delivery' ? '₱' + voucher.discount_amount : voucher.discount_amount + '%'}
            </Text>
          )}

          {/* Voucher Discount */}
          {voucher && <Text style={styles.voucherText}>Applied Voucher: {voucher.name} - Discount: ₱ {(subTotal * voucher.discount_value) / 100 || voucher.discount_value}</Text>}
          
          {/* Delivery Fee */}
          <Text style={styles.deliveryFeeText}>Delivery Fee: ₱ {adjustedDeliveryFee.toFixed(2)}</Text>

          {/* Total Amount */}
          <Text style={styles.totalAmountText}>Total Amount: ₱ {(subTotal + adjustedDeliveryFee).toFixed(2)}</Text>

          {/* Checkout Button */}
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={handleCheckout}
          >
            <Text style={styles.addToCartText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Available Vouchers</Text>
            {vouchers.length > 0 ? (
              vouchers.map((voucher, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.voucherItem}
                  onPress={() => handleVoucherApply(voucher)}
                >
                  <Text style={styles.voucherName}>{voucher.name}</Text>
                  <Text style={styles.voucherDetails}>
                    {voucher.discount.type === 'fixed' ? '₱ ' + voucher.discount.amount : voucher.discount.amount + '% off'}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text>No vouchers available</Text>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Ionicons name="home" size={28} color="#7A9F59" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Ionicons name="cart-outline" size={28} color="#333" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Ionicons name="person-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 15,
    paddingTop: 40,
    paddingBottom: 15,
  },
  headerText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  productImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    objectFit: 'cover',
  },
  productName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  productPrice: {
    fontSize: 20,
    color: '#28a745',
    marginVertical: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    marginVertical: 10,
  },
  productStock: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  quantityText: {
    fontSize: 18,
    marginRight: 10,
    color: '#555',
  },
  quantityButton: {
    backgroundColor: '#7A9F59',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  quantityNumber: {
    fontSize: 18,
    color: '#555',
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginVertical: 10,
  },
  voucherButton: {
    backgroundColor: '#ff6347',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  voucherText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  deliveryFeeText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 10,
  },
  totalAmountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
    marginTop: 10,
  },
  addToCartButton: {
    backgroundColor: '#7A9F59',
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
    width: '100%',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  voucherItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  voucherName: {
    fontSize: 16,
    color: '#333',
  },
  voucherDetails: {
    fontSize: 14,
    color: '#7A9F59',
  },
  closeButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 15,
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ProductScreen;
