import React, { useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from "../providers/AuthProvider";

//Auth Screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LocationScreen from '../screens/LocationScreen';
import BannerScreen from '../screens/BannerScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

//Main Screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import FavouritesScreen from '../screens/FavouritesScreen';
import CartScreen from '../screens/CartScreen';
import ChatScreen from '../screens/ChatScreen';
import ShopScreen from '../screens/ShopScreen';

//Loading Utility
import Loading from "../screens/utils/Loading";

const AuthStack = createStackNavigator();
const Auth = ({ isFirstLaunch }) => {
  return (
    <AuthStack.Navigator
      initialRouteName={isFirstLaunch ? "Welcome" : "Banner" } // Dynamically decide initial route
      screenOptions={{
        headerShown: false,
      }}
    >
      <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
      <MainStack.Screen name="Location" component={LocationScreen} />
      <MainStack.Screen name="Banner" component={BannerScreen} />
      <AuthStack.Screen name="Login" component={LoginScreen} />
      <AuthStack.Screen name="Signup" component={SignupScreen} />
    </AuthStack.Navigator>
  );
};

const MainStack = createStackNavigator();
const Main = () => {
  return (
    <MainStack.Navigator
      initialRouteName='Home'
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="Home" component={HomeScreen} />
      <MainStack.Screen name="Favourites" component={FavouritesScreen} />
      <MainStack.Screen name="Cart" component={CartScreen} />
      <MainStack.Screen name="Chat" component={ChatScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
      <MainStack.Screen name="Shop" component={ShopScreen} />
    </MainStack.Navigator>
  );
};

export default () => {
  const { user, isFirstLaunch } = useContext(AuthContext);

  return (
    <NavigationContainer>
      {user == null && <Loading />}
      {user == false && <Auth isFirstLaunch={isFirstLaunch}/>}
      {user == true && <Main />}
    </NavigationContainer>
  );
}
