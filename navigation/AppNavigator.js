import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import LocationScreen from '../screens/LocationScreen';
import BannerScreen from '../screens/BannerScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import CartScreen from '../screens/CartScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ShopScreen from '../screens/ShopScreen';
import InfomationProfile from '../screens/InfomationProfile';
import BusinessInformationScreen from '../screens/BusinessInformationScreen';
import SetUpShopScreen from '../screens/SetUpShopScreen';
import ShopInformationScreen from '../screens/ShopInformationScreen';
import VerificationNumScreen from '../screens/VerificationNumScreen';
import ShopDashboardScreen from '../screens/ShopDashboardScreen';
import SellerRegistrationSuccessScreen from '../screens/SellerRegistrationSuccessScreen';
import AddProductScreen from '../screens/AddProductScreen';
import ProductListScreen from '../screens/ProductListScreen';
import OrderListScreen from '../screens/OrderListScreen';
import AddressScreen from '../screens/AddressScreen';
import UpdateShopProfileScreen from '../screens/UpdateShopProfileScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Banner" component={BannerScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="InfoPro" component={InfomationProfile} />
      <Stack.Screen name="BusinessInfo" component={BusinessInformationScreen} />
      <Stack.Screen name="SetUp" component={SetUpShopScreen} />
      <Stack.Screen name="ShopInfo" component={ShopInformationScreen} />
      <Stack.Screen name="VerNum" component={VerificationNumScreen} />
      <Stack.Screen name='ShopDash' component={ShopDashboardScreen} />
      <Stack.Screen name='SelRegSuc' component={SellerRegistrationSuccessScreen} />
      <Stack.Screen name='AddProdt' component={AddProductScreen} />
      <Stack.Screen name='ProductList' component={ProductListScreen} />
      <Stack.Screen name='OrderList' component={OrderListScreen} />
      <Stack.Screen name='AddressShop' component={AddressScreen} />
      <Stack.Screen name='UpdateShopProf' component={UpdateShopProfileScreen} />
    </Stack.Navigator>
  );
}
