import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
const navigation = useNavigation(); // Hook to access navigation

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4CAF50', '#66BB6A']}
        style={styles.header}>
        <Text style={styles.title}>Account</Text>
        <TouchableOpacity>
          <Icon name="gear" size={24} color="black" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Profile Section */}
        <View style={styles.profileSection}>
        <Text style={styles.userName}>Juan Dela Cruz</Text>
        <TouchableOpacity style={styles.editProfileButton} onPress={() => navigation.navigate('InfoPro')}>
            <Icon name="edit" size={16} color="#4CAF50" style={styles.actionIcon} />
            <Text style={styles.editProfile}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Shop Button */}
        <TouchableOpacity
          style={styles.shopButton}
          onPress={() => navigation.navigate('Shop')}  // Navigate to Shop screen
        >
          <Icon name="shopping-cart" size={16} color="#4CAF50" style={styles.actionIcon} />
          <Text style={styles.shopButtonText}>Shop</Text>
        </TouchableOpacity>
        </View>

     {/* Action Buttons */}
        <View style={styles.actionsRow}>
        <TouchableOpacity style={styles.actionButton}>
            <Icon name="list-alt" size={30} color="#4CAF50" />
            <Text style={styles.actionText}>Orders</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
            <Icon name="heart" size={30} color="#4CAF50" />
            <Text style={styles.actionText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
            <Icon name="address-book" size={30} color="#4CAF50" />
            <Text style={styles.actionText}>Addresses</Text>
        </TouchableOpacity>
        </View>

      {/* Additional Sections */}
        <ScrollView>
            <TouchableOpacity style={styles.listItem}>
                <View style={styles.listItemContent}>
                <Icon name="star" size={20} color="#4CAF50" style={styles.listItemIcon} />
                <Text style={styles.listItemText}>Become a Pro</Text>
                </View>
                <Icon name="angle-right" size={20} color="#4CAF50" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.listItem}>
                <View style={styles.listItemContent}>
                <Icon name="question-circle" size={20} color="#4CAF50" style={styles.listItemIcon} />
                <Text style={styles.listItemText}>Help Center</Text>
                </View>
                <Icon name="angle-right" size={20} color="#4CAF50" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.listItem}>
                <View style={styles.listItemContent}>
                <Icon name="file-text" size={20} color="#4CAF50" style={styles.listItemIcon} />
                <Text style={styles.listItemText}>Terms & Policies</Text>
                </View>
                <Icon name="angle-right" size={20} color="#4CAF50" />
            </TouchableOpacity>
        </ScrollView>


      {/* Log Out Button */}
      <TouchableOpacity style={styles.logoutButton}>
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileSection: {
    backgroundColor: '#f8f8f8',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  editProfileButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  shopButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#4CAF50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    elevation: 5,
  },
  actionIcon: {
    marginRight: 8, // Spacing between icon and text
  },
  editProfile: {
    fontSize: 16,
    color: '#4CAF50',
  },
  shopButton: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
  backgroundColor: '#fff', // White background
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10,
  elevation: 5, // Adds shadow for elevation
  borderWidth: 1, // Optional: border to define button edges
  borderColor: '#4CAF50', // Border color to match the theme
},
actionIcon: {
  marginRight: 8, // Space between the icon and the text
},
shopButtonText: {
  fontSize: 16,
  color: '#000', // Black text color
},
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Spaces the buttons evenly across the row
    alignItems: 'center', // Centers buttons vertically
    marginHorizontal: 20, // Adds padding on the sides
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1, // Ensures buttons adjust spacing
    marginHorizontal: 10, // Adds space between buttons
  },
  actionText: {
    marginTop: 5,
    fontSize: 14,
    color: '#333',
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
    marginVertical: 5,
    elevation: 2,
  },
  listItemText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#09320a',
    padding: 15,
    margin: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemIcon: {
    marginRight: 10, // Adds spacing between the icon and text
  },
  listItemText: {
    fontSize: 16,
    color: '#000',
  },
});

export default ProfileScreen;
