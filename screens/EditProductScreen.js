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
import { useNavigation } from '@react-navigation/native';

const EditProductScreen = () => {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [pieces, setPieces] = useState('');
  const [description, setDescription] = useState('');
  const [images, setImages] = useState([]);
  const navigation = useNavigation();

  const handleAddImages = () => {
    // Functionality to add product images (e.g., image picker)
    console.log('Add images pressed');
  };

  const handleSaveChanges = () => {
    // Functionality to save changes
    console.log('Save changes pressed');
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Text style={styles.backText}>←</Text>
      </TouchableOpacity>
      <Text style={styles.header}>Edit Product</Text>

      {/* Product Images Section */}
      <View style={styles.imageSection}>
        <Text style={styles.label}>Product Images</Text>
        <TouchableOpacity style={styles.imageUploader} onPress={handleAddImages}>
          {images.length === 0 ? (
            <Text style={styles.addImageText}>+ Add Product Images</Text>
          ) : (
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }} // Placeholder or actual image
              style={styles.imagePreview}
            />
          )}
        </TouchableOpacity>
      </View>

      {/* Input Fields */}
      <View style={styles.inputSection}>
        <Text style={styles.label}>
          Product Name <Text style={styles.charCount}>{`${productName.length}/100`}</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Input"
          maxLength={100}
          value={productName}
          onChangeText={setProductName}
        />

        <Text style={styles.label}>
          Category <Text style={styles.charCount}>{`${category.length}/50`}</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Input"
          maxLength={50}
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>
          Pieces <Text style={styles.charCount}>{`${pieces.length}/50`}</Text>
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Input"
          keyboardType="numeric"
          maxLength={50}
          value={pieces}
          onChangeText={setPieces}
        />

        <Text style={styles.label}>
          Product Description <Text style={styles.charCount}>{`${description.length}/300`}</Text>
        </Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Input"
          maxLength={300}
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  backText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  imageUploader: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#f5f5f5',
  },
  addImageText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 12,
    color: '#666',
    fontWeight: 'normal',
  },
  saveButton: {
    backgroundColor: '#004d00',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default EditProductScreen;
