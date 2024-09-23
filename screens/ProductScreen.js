import React from 'react';
import { View, Text, Button } from 'react-native';

const ProductScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Product Details</Text>
      <Button 
        title="Add to Cart"
        onPress={() => navigation.navigate('Cart')}
      />
    </View>
  );
};

export default ProductScreen;
