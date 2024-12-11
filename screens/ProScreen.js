import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons'; // Import FontAwesome5 for crown
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ProScreen = () => {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#FFBB00', '#FFD700']} style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text style={styles.headerTitle}>PlatePro</Text>
            <FontAwesome5 name="crown" size={20} color="#FFD700" style={styles.crownIcon} />
          </View>
          <TouchableOpacity activeOpacity={0.7}>
            <Icon name="close" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Monthly Perks Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Monthly Perks</Text>

        <View style={styles.perkCard}>
          <Icon name="percent" size={30} color="#4CAF50" style={styles.perkIcon} />
          <View style={styles.perkTextContainer}>
            <Text style={styles.perkTitle}>Up to 30% Off on Farm Products</Text>
            <Text style={styles.perkDescription}>
              Enjoy exclusive discounts on select fresh produce and agricultural products.
            </Text>
          </View>
        </View>

        <View style={styles.perkCard}>
          <Icon name="truck" size={30} color="#4CAF50" style={styles.perkIcon} />
          <View style={styles.perkTextContainer}>
            <Text style={styles.perkTitle}>Free Delivery</Text>
            <Text style={styles.perkDescription}>
              Unlimited free delivery for all orders meeting a minimum purchase requirement.
            </Text>
          </View>
        </View>

        <View style={styles.perkCard}>
          <Icon name="shopping-basket" size={30} color="#4CAF50" style={styles.perkIcon} />
          <View style={styles.perkTextContainer}>
            <Text style={styles.perkTitle}>10% Off Farmer's Specialty Shops</Text>
            <Text style={styles.perkDescription}>
              Discounts on premium items, such as organic produce, artisanal goods, and specialty farm products.
            </Text>
          </View>
        </View>
      </View>

      {/* Surprise Perks Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Surprise Perks</Text>

        <View style={styles.perkCard}>
          <Icon name="gift" size={30} color="#F44336" style={styles.perkIcon} />
          <View style={styles.perkTextContainer}>
            <Text style={styles.perkTitle}>Exclusive Deals on Fresh Baskets</Text>
            <Text style={styles.perkDescription}>
              Special bundled discounts on curated weekly or monthly fresh produce baskets.
            </Text>
          </View>
        </View>

        <View style={styles.perkCard}>
          <Icon name="money" size={30} color="#F44336" style={styles.perkIcon} />
          <View style={styles.perkTextContainer}>
            <Text style={styles.perkTitle}>₱100 Off on Orders Above ₱500</Text>
            <Text style={styles.perkDescription}>
              Instant discounts for large orders, encouraging bulk purchases.
            </Text>
          </View>
        </View>

        <View style={styles.perkCard}>
          <Icon name="credit-card" size={30} color="#F44336" style={styles.perkIcon} />
          <View style={styles.perkTextContainer}>
            <Text style={styles.perkTitle}>5% Cashback</Text>
            <Text style={styles.perkDescription}>
              Earn cashback on every Pro purchase, which can be used for future orders.
            </Text>
          </View>
        </View>
      </View>

      {/* Pricing and CTA */}
      <View style={styles.footerContainer}>
        <Text style={styles.pricingText}>Starting from</Text>
        <Text style={styles.price}>₱ 25.00 / month</Text>
        <TouchableOpacity
          style={styles.selectPlanButton}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('SelectPro')}
        >
          <Text style={styles.selectPlanText}>Select Plan</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  crownIcon: {
    marginLeft: 8,
  },
  sectionContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  perkCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  perkIcon: {
    marginRight: 15,
  },
  perkTextContainer: {
    flex: 1,
  },
  perkTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flexShrink: 1,
  },
  perkDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  footerContainer: {
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 20,
  },
  pricingText: {
    fontSize: 16,
    color: '#555',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  selectPlanButton: {
    backgroundColor: '#FF5722',
    paddingVertical: 15,
    paddingHorizontal: 50,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  selectPlanText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ProScreen;
