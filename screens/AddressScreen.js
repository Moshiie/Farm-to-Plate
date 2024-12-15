import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddressScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerButton}>
          <Ionicons name="arrow-back" size={24} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Address</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddAddress')} style={styles.headerButton}>
          <Ionicons name="add" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Address Details */}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Ionicons name="location-outline" size={24} color="#2E4C2D" />
          <View style={styles.detailTextContainer}>
            <Text style={styles.detailText}>Shop Name</Text>
            <Text style={styles.subText}>Phone Number</Text>
            <Text style={styles.subText}>Address</Text>
          </View>
          <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditAddress')}>
            <Text style={styles.editText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8D6C5', // Light green for the background
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2E4C2D',
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  headerButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  detailsContainer: {
    padding: 15,
  },
  detailRow: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    marginBottom: 10,
  },
  detailTextContainer: {
    flex: 1,
    marginLeft: 10,
  },
  detailText: {
    fontSize: 16,
    color: '#2E4C2D',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  editButton: {
    alignItems: 'flex-end',
  },
  editText: {
    color: '#2E4C2D',
    fontWeight: 'bold',
    fontSize: 14,
  },
});

export default AddressScreen;
