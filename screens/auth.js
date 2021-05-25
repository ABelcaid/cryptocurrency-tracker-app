import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,Button,TouchableOpacity,Image  } from 'react-native'
import * as Google from 'expo-google-app-auth';
import { Octicons, Fontisto, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';




export default function Auth({ navigation }) {

      const [googleSubmitting, setGoogleSubmitting] = useState(false);

      


  const handleGoogleSignin = async () => {


    setGoogleSubmitting(true);
    const config = {
      androidClientId: `713268331958-7bbdeia3t08cirl0611fdfku873qpib2.apps.googleusercontent.com`,
      scopes: ['profile', 'email'],
    };

    Google.logInAsync(config)
      .then(async(result) => {
        const { type, user } = result;
        if (type == 'success') {
          const { email, name, photoUrl } = user;
          console.log('====================================');
          console.log('Google signin successful');
          console.log(email, name, photoUrl);
          console.log('====================================');
          await AsyncStorage.setItem('email', email);
          await AsyncStorage.setItem('name', name);
          await AsyncStorage.setItem('photoUrl', photoUrl);
          navigation.navigate('DrawerNav', { screen: 'Profile' });

         
          
        //   persistLogin({ email, name, photoUrl }, 'Google signin successful', 'SUCCESS');
        } else {
        //   handleMessage('Google Signin was cancelled');
        console.log('====================================$');
        console.log('Google Signin was cancelled');
        console.log('====================================$');
        }
        setGoogleSubmitting(false);
      })
      .catch((error) => {
          console.log('====================================*');
          console.log('An error occurred. Check your network and try again');
          console.log('====================================*');
        // handleMessage('An error occurred. Check your network and try again');
        console.log(error);
        setGoogleSubmitting(false);
      });
  };


    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>Sign in with Google </Text>
                  <Image
                    style={styles.tinyLogo}
                    source={require('../assets/Bitcoin-rafiki.png')}
                />
           <TouchableOpacity onPress={handleGoogleSignin} style={styles.appButtonContainer}>
                <Fontisto name="google" size={25} color='white' />

                <Text style={styles.appButtonText}>Sign in with Google </Text>
           </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
container:{
    flex:1,
     justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF'
    

},
tinyLogo:{
    width: "60%",
    height: "40%",


},
 titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#2ecc71",
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%'
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase",
    marginHorizontal: 10
  }
});
