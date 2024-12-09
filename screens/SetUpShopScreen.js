import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation
import * as ImagePicker from 'expo-image-picker'; // Expo Image Picker for photo upload

const SetUpShopScreen = () => {
  const [shopData, setShopData] = useState({
    description: '',
    shopPhoto: null, // To store selected photo URI
  });

  const navigation = useNavigation(); // Initialize navigation

  const handleSetupShop = () => {
    Alert.alert('Success', 'Shop Set Up Successfully!', [{ text: 'OK' }]);
    console.log(shopData);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setShopData((prevState) => ({
        ...prevState,
        shopPhoto: result.uri,
      }));
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.formWrapper}>
        <Text style={styles.header}>Setup Shop</Text>

        {/* Shop Photo Section */}
        <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
          {shopData.shopPhoto ? (
            <Image source={{ uri: shopData.shopPhoto }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.plusIcon}>+</Text>
          )}
        </TouchableOpacity>
        <Text style={styles.photoText}>Add Photo</Text>

        {/* Shop Description Section */}
        <Text style={styles.label}>Shop Description</Text>
        <TextInput
          style={styles.descriptionInput}
          onChangeText={(text) => setShopData({ ...shopData, description: text })}
          value={shopData.description}
          placeholder="Enter shop description"
          multiline
          maxLength={300}
        />
        <Text style={styles.charCount}>{shopData.description.length}/300</Text>

        {/* Save Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => {;
         navigation.navigate('ShopInfo'); // Navigate to the 'ShopInfo' screen
          }}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: '5%', // Adding horizontal padding for better spacing
    paddingVertical: '10%', // Increase vertical padding for better centering
  },
  formWrapper: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignItems: 'center', // Center content horizontally
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15, // Reduced bottom margin to match the image
    color: '#333',
  },
  photoButton: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 15, // Adjusted margin to match design
    backgroundColor: '#f0f0f0',
  },
  plusIcon: {
    fontSize: 30,
    color: '#777',
  },
  photoText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#555',
    marginBottom: 20, // Adjusted to give more space between photo and description
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 5,
    alignSelf: 'flex-start',
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    height: 100,
    marginBottom: 10,
    backgroundColor: '#fff',
    fontSize: 14,
    width: '100%',
  },
  charCount: {
    fontSize: 12,
    color: '#555',
    textAlign: 'right',
    marginBottom: 20, // Added margin for spacing before the button
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  button: {
    backgroundColor: '#09320a',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SetUpShopScreen;
