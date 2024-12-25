import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const UpdateShopProfileScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#2E4C2D" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Update Shop Profile</Text> 
      </View>

      {/* Change Cover Photo Section */}
      <View style={styles.imageSection}>
        <Text style={styles.sectionTitle}>Change Cover Photo</Text>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="add" size={50} color="#FF0000" />
        </View>
        <Text style={styles.addButtonText}>+ Add cover photo</Text>
      </View>

      {/* Change Profile Image Section */}
      <View style={styles.imageSection}>
        <Text style={styles.sectionTitle}>Change Profile Image</Text>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="add" size={50} color="#FF0000" />
        </View>
        <Text style={styles.addButtonText}>+ Add profile image</Text>
      </View>

      {/* Save Changes Button */}
      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8D6C5',
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E4C2D',
    textAlign: 'center',
    flex: 1,
  },
  imageSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E4C2D',
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderWidth: 2,
    borderColor: '#A9A9A9',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginBottom: 10,
    borderRadius: 10,
  },
  addButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2E4C2D',
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#2E4C2D',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UpdateShopProfileScreen;
