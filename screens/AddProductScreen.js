import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddProductScreen = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [pieces, setPieces] = useState('');
  const [description, setDescription] = useState('');

  const handleSaveAndPublish = () => {
    // Logic for saving and publishing the product
    console.log({
      productName,
      category,
      pieces,
      description,
    });
  };

  const handleGoBack = () => {
    navigation.goBack(); // This navigates back to the previous screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Add Product</Text>
      </View>

      {/* Product Images Section */}
      <View style={styles.imageContainer}>
        <Text style={styles.sectionLabel}>Product Images</Text>
        <TouchableOpacity style={styles.imageUploadButton}>
          <Image
            source={{
              uri: 'https://via.placeholder.com/100', // Placeholder image
            }}
            style={styles.image}
          />
          <Ionicons name="add" size={24} color="#2E4C2D" />
        </TouchableOpacity>
        <Text style={styles.addImageText}>+ Add Product Images</Text>
      </View>

      {/* Input Fields */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Product Name</Text>
        <TextInput
          style={styles.input}
          value={productName}
          onChangeText={setProductName}
          placeholder="Input"
          maxLength={100}
        />
        <Text style={styles.charCount}>{productName.length}/100</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Category</Text>
        <TextInput
          style={styles.input}
          value={category}
          onChangeText={setCategory}
          placeholder="Input"
          maxLength={50}
        />
        <Text style={styles.charCount}>{category.length}/50</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Pieces</Text>
        <TextInput
          style={styles.input}
          value={pieces}
          onChangeText={setPieces}
          placeholder="Input"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Product Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={description}
          onChangeText={setDescription}
          placeholder="Input"
          maxLength={300}
          multiline
        />
        <Text style={styles.charCount}>{description.length}/300</Text>
      </View>

      {/* Save and Publish Button */}
      <TouchableOpacity style={styles.saveButton} onPress={() => navigation.push('ProductList')}>
        <Text style={styles.saveButtonText}>Save and Publish</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#000',
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 20,
  },
  imageUploadButton: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#2E4C2D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: '#F0F8F5',
  },
  image: {
    width: 60,
    height: 60,
    position: 'absolute',
  },
  addImageText: {
    fontSize: 14,
    color: '#2E4C2D',
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    backgroundColor: '#F9F9F9',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  saveButton: {
    backgroundColor: '#2E4C2D',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },
});

export default AddProductScreen;
