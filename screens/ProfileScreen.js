import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const [avatar, setAvatar] = useState('https://via.placeholder.com/150'); // Default avatar
  const navigation = useNavigation();

  // Function to handle image selection
  const handleImageUpload = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Camera roll access is required to upload an image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: [ImagePicker.MediaType.IMAGE],
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri); // Update avatar with selected image
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#2E4C2D', '#2E4C2D']} style={styles.header}>
  <Text style={styles.title}>Account</Text>
  <TouchableOpacity style={styles.gearButton}>
    <Icon name="gear" size={24} color="#fff" />
  </TouchableOpacity>
</LinearGradient>


      {/* Profile Section */}
      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleImageUpload}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
          <Text style={styles.uploadText}>Tap to upload</Text>
        </TouchableOpacity>
        <Text style={styles.userName}>Juan Dela Cruz</Text>
        <TouchableOpacity
          style={styles.editProfileButton}
          onPress={() => navigation.navigate('InfoPro')}
        >
          <Icon name="edit" size={16} color="#fff" style={styles.actionIcon} />
          <Text style={styles.editProfile}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionsRow}>
      <TouchableOpacity
  style={styles.actionButton}
  onPress={() => navigation.navigate('OrderList')} // Correct screen name
>
  <Icon name="list-alt" size={30} color='#2E4C2D' />
  <Text style={styles.actionText}>Orders</Text>
</TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => navigation.navigate('Favourites')}
        >
          <Icon name="heart" size={30} color='#2E4C2D' />
          <Text style={styles.actionText}>Favourites</Text>
        </TouchableOpacity>
        <TouchableOpacity
  style={styles.actionButton}
  onPress={() => navigation.navigate('AddressShop')} // Use the correct screen name
>
  <Icon name="address-book" size={30} color='#2E4C2D' />
  <Text style={styles.actionText}>Addresses</Text>
</TouchableOpacity>
      </View>

      {/* Additional Sections */}
      <ScrollView>
      <TouchableOpacity
  style={styles.listItem}
  onPress={() => navigation.navigate('Pro')} // Navigates to ProScreen
>
  <View style={styles.listItemContent}>
    <FontAwesome5 name="crown" size={20} color="#FFD700" style={styles.listItemIcon} />
    <Text style={styles.listItemText}>Become a Pro</Text>
  </View>
  <Icon name="angle-right" size={20} color="#4CAF50" />
</TouchableOpacity>

<TouchableOpacity
  style={styles.listItem}
  onPress={() => navigation.navigate('HelpCenter')} // Navigates to HelpCenterScreen
>
  <View style={styles.listItemContent}>
    <Icon
      name="question-circle"
      size={20}
      color='#2E4C2D'
      style={styles.listItemIcon}
    />
    <Text style={styles.listItemText}>Help Center</Text>
  </View>
  <Icon name="angle-right" size={20} color="#4CAF50" />
</TouchableOpacity>

<TouchableOpacity
  style={styles.listItem}
  onPress={() => navigation.navigate('TermsAndPolicies')}
>
  <View style={styles.listItemContent}>
    <Icon name="file-text" size={20} color='#2E4C2D' style={styles.listItemIcon} />
    <Text style={styles.listItemText}>Terms & Policies</Text>
  </View>
  <Icon name="angle-right" size={20} color="#4CAF50" />
</TouchableOpacity>
      </ScrollView>

      {/* Log Out Button */}
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => Alert.alert('Log Out', 'Are you sure you want to log out?', [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Log Out', style: 'destructive', onPress: () => navigation.navigate('Login') },
        ])}
      >
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8D6C5',
  },
  header: {
    padding: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 5,
    position: 'relative',
  },
  gearButton: {
    position: 'absolute',
    right: 20,
    top: 25,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
  profileSection: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 10,
    elevation: 5,
    borderRadius: 10,
    marginHorizontal: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 14,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 5,
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
    backgroundColor: '#2E4C2D',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 5,
  },
  editProfile: {
    fontSize: 16,
    color: '#fff',
    marginLeft: 8,
  },
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginVertical: 20,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
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
    marginVertical: 8,
    elevation: 2,
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemIcon: {
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#E63946',
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
});

export default ProfileScreen;
