// MapScreen.js
import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = ({ route, navigation }) => {
  const { initialRegion } = route.params || {
    latitude: 8.484722, 
    longitude: 124.656278,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005
  };

  const [region, setRegion] = useState(initialRegion);

  const handleSaveLocation = () => {
    navigation.navigate('AddressForm', { region });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        showsUserLocation={true}
        showsMyLocationButton
        onRegionChangeComplete={(newRegion) => setRegion(newRegion)}
      >
        <Marker coordinate={region} />
      </MapView>
      <Button title="Save Location" onPress={handleSaveLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});

export default MapScreen;
