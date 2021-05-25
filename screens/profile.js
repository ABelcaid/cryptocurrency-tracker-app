import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


import axios from 'axios';


axios.defaults.headers.common['Accept-Encoding'] = 'gzip';



export default function profile() {



  const [username, setUsername] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhotoUrl, setUserPhotoUrl] = useState('');

   // ----------------------------------------------save user to db -------------
         


const saveUser = async () => {

  try {
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    const res = await axios.post(`http://192.168.8.74:3000/user/add`, {email : email, name: name});
             console.log('====================================££££££');
             console.log(res.data);
             console.log('====================================££££££');
        
  } catch(e) {
   console.log(e);
  }
}


const getData = async () => {

  try {
    const email = await AsyncStorage.getItem('email');
    const name = await AsyncStorage.getItem('name');
    const photoUrl = await AsyncStorage.getItem('photoUrl');

    setUserEmail(email)
    setUsername(name)
    setUserPhotoUrl(photoUrl)
        
  } catch(e) {
   console.log(e);
  }
}


useEffect(() => {
  getData();
  saveUser();
},[]);














    return (
          <View  style={styles.container}>

                <View>
                    <View style={styles.listItem}>
                        <View style={{justifyContent:"center",alignItems:"flex-start",flex:1,marginHorizontal: "5%"}}>
                            {/* <Image source={userPhotoUrl}  style={{width:40, height:40,borderRadius:30}} /> */}
                            <Image
                              source={{ uri: userPhotoUrl }}
                              style={{ width: 40, height: 40, borderRadius: 30 }}
                             />
                            <Text >{username}</Text>
                        </View>
                    
                        <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                            <Text style={{fontWeight:"bold"}}>My Wallet </Text>
                            <Text >1000 DH</Text>
                        </View>
                    </View>
                </View>

                 
        </View>
    )
}

const styles = StyleSheet.create({
      container: {
    flex: 1,
    backgroundColor: '#FFF',
    marginTop:0,
    justifyContent: "center", 
    alignItems: "center",
    
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"90%",
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5,
    elevation: 3,
    shadowOffset: { width: 1 , height:1},
    shadowColor: "#333",
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    

  }
})
