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
import ProScreen from '../screens/ProScreen';
import SelectProScreen from '../screens/SelectProScreen';
import SelectPaymentScreen from '../screens/SelectPaymentScreen';
import ActiveProScreen from '../screens/ActiveProScreen';
import HelpCenterScreen from '../screens/HelpCenterScreen';
import TermsAndPoliciesScreen from '../screens/TermsAndPoliciesScreen';
import OrderListScreen from '../screens/OrderListScreen';
import AddressScreen from '../screens/AddressScreen';
import UpdateShopProfileScreen from '../screens/UpdateShopProfileScreen';
import ProductDetailScreen from '../screens/ProductDetailsScreen';
import OrderCartScreen from '../screens/OrderCartScreen';
import EditProductScreen from '../screens/EditProductScreen';
const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Welcome" screenOptions={{ headerShown: false }}>
      {/* Authentication Screens */}
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Location" component={LocationScreen} />
      <Stack.Screen name="Banner" component={BannerScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />

      {/* Main App Screens */}
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Favourites" component={FavouritesScreen} />
      <Stack.Screen name="Cart" component={CartScreen} />
      <Stack.Screen name='OrderCart' component={OrderCartScreen} />
      <Stack.Screen name="Chat" component={ChatScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />

      {/* Help Center */}
      <Stack.Screen name="HelpCenter" component={HelpCenterScreen} />

      {/* Terms and Policies */}
      <Stack.Screen name="TermsAndPolicies" component={TermsAndPoliciesScreen} />

      {/* Shop Screens */}
      <Stack.Screen name="Shop" component={ShopScreen} />
      <Stack.Screen name="ShopDashboard" component={ShopDashboardScreen} />
      <Stack.Screen name="AddProduct" component={AddProductScreen} />
      <Stack.Screen name="ProductList" component={ProductListScreen} />
      <Stack.Screen name="OrderList" component={OrderListScreen} />
      <Stack.Screen name="AddressShop" component={AddressScreen} />
      <Stack.Screen name="UpdateShopProf" component={UpdateShopProfileScreen} />
      <Stack.Screen name='ProductDetails' component={ProductDetailScreen} />
      <Stack.Screen name='EditProduct' component={EditProductScreen} />

      {/* Seller Onboarding Screens */}
      <Stack.Screen name="InfoProfile" component={InfomationProfile} />
      <Stack.Screen name="BusinessInfo" component={BusinessInformationScreen} />
      <Stack.Screen name="SetUpShop" component={SetUpShopScreen} />
      <Stack.Screen name="ShopInfo" component={ShopInformationScreen} />
      <Stack.Screen name="VerificationNumber" component={VerificationNumScreen} />
      <Stack.Screen name="RegistrationSuccess" component={SellerRegistrationSuccessScreen} />

      {/* Pro Membership Screens */}
      <Stack.Screen name="Pro" component={ProScreen} />
      <Stack.Screen name="SelectPro" component={SelectProScreen} />
      <Stack.Screen name="ActivePro" component={ActiveProScreen} />

      {/* Select Payment Screen */}
      <Stack.Screen name="SelectPayment" component={SelectPaymentScreen} />
    </Stack.Navigator>
  );
}
