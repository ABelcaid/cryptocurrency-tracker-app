import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';


import Home from './screens/home';
import CryptoDetails from './screens/cryptoDetails';
import Auth from './screens/auth';
import Profile from './screens/profile';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNav() {
return(

    
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home} />
        <Drawer.Screen name="Profile" component={Profile}/>
      </Drawer.Navigator>
    
    
    )
  
}


export default function App() {
  return (
    <NavigationContainer>

    <Stack.Navigator>

           <Stack.Screen   name="Auth" component={Auth} 
         options={{
         title: "Auth",
         headerTintColor:'white',
         headerStyle:{
           backgroundColor: '#5000FF',
           
         }, 
       }}/> 
         <Stack.Screen   name="DrawerNav" component={DrawerNav} 
         options={{
         title: "Cryptocurrency List",
         headerTintColor:'white',
         headerStyle:{
           backgroundColor: '#5000FF',
           
         }, 
       }}/> 
         <Stack.Screen name="CryptoDetails" component={CryptoDetails}
         options={{
         title: "CryptoDetails",
         headerTintColor:'white',
         headerStyle:{
           backgroundColor: '#5000FF',
         }, 
       }}/> 
        
     </Stack.Navigator>
 
      
   </NavigationContainer>
  );
}

