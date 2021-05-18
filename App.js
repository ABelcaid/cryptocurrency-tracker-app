import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants'
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/home';
import CryptoDetails from './screens/cryptoDetails';

const Stack = createStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
 
    <View style={styles.container}>
       <StatusBar style="auto"/>
       <Stack.Navigator>
         <Stack.Screen   name="Home" component={Home} 
         options={{
         title: "Cryptocurrency List",
         headerTintColor:'white',
         headerStyle:{
           backgroundColor: '#0052d4',
           
         }, 
       }}/> 
         <Stack.Screen name="CryptoDetails" component={CryptoDetails}
         options={{
         title: "CryptoDetails",
         headerTintColor:'white',
         headerStyle:{
           backgroundColor: '#0052d4',
         }, 
       }}/> 
        
     </Stack.Navigator>
     </View>
   </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:Constants.statusBarHeight,
  }
  });