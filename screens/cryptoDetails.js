import React, { useEffect, useState } from 'react';
import { Text, View, Dimensions,StyleSheet, TouchableOpacity, Image,TextInput   } from 'react-native';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

import axios from 'axios';
import Modal from 'react-native-modal';

axios.defaults.headers.common['Accept-Encoding'] = 'gzip'



const CryptoDetails = ({ navigation, route }) => {

  const [time, setTime] = useState([10,20]);
  const [price, setPrice] = useState([3,8]);

  const [isModalVisible, setModalVisible] = useState(false);
  const [cryptoAmount, setCryptoAmount] = useState('');
  

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };



  const convertTimeToDay =  (timestamp) => {
                      
    var a = new Date(timestamp);
    var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var dayOfWeek = days[a.getDay()]

    // console.log(dayOfWeek);
    return dayOfWeek
  };

  const getDataUsingAsyncAwaitGetCall = async () => {
      try {
        const response = await axios.get(
          `https://api.coincap.io/v2/assets/${route.params.id}/history?interval=d1`,
        );


        
        let resData = response.data.data;



        const priceArray = resData && resData.map(item => item.priceUsd);
        const dateArray  = resData && resData.map(item => convertTimeToDay(item.time));
        // const dateArray  = resData && resData.map(item => item.time);

        setTime(dateArray && dateArray.slice(-6));
        setPrice(priceArray && priceArray.slice(-6));



      } catch (error) {
        // handle error
        console.log(error.message);
      }
    };





  
  useEffect(() => {
     getDataUsingAsyncAwaitGetCall();
    //  convertTimeToDay();
  },[]);









  return (
    <View  style={styles.container}>


          <View style={styles.listItem}>
              <Image source={{uri: `https://assets.coincap.io/assets/icons/${route.params.symbol.toLowerCase()}@2x.png`}}  style={{width:40, height:40,borderRadius:30}} />
              <View style={{justifyContent:"center",alignItems:"flex-start",flex:1,marginHorizontal: "5%"}}>
                <Text style={{fontWeight:"bold"}}>{route.params.name}</Text>
                <Text >{route.params.symbol}</Text>
              </View>
              <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                <Text style={{fontWeight:"bold"}}>${parseFloat(route.params.priceUsd).toFixed(2)}</Text>
              </View>
              <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                <Text style={{fontWeight:"bold"}}>{parseFloat(route.params.changePercent24Hr).toFixed(2)} %</Text>
              </View>
              {/* <TouchableOpacity style={{height:50,width:50, justifyContent:"center",alignItems:"center"}}>
                <Text style={{color:"green"}}>Call</Text>
              </TouchableOpacity> */}
          </View>

          {/* <View style={styles.itemTextHeder}>
                <Text style={styles.baseText}>
                Crypto Price 
                </Text>
                <Text style={styles.titleText}>
              $
              { 
              parseFloat(route.params.priceUsd).toFixed(2)
              }
                </Text>
              </View> */}
        

            {/* <LineChart
          data={{
            labels: time,
            datasets: [
              {
                data: price
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={500}
          yAxisLabel="$"
          yAxisSuffix="k"
          chartConfig={{
            backgroundColor: "#0052D4",
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0,82,212, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,82,212, ${opacity})`,
            // style: {
            //   borderRadius: 16
            // },
            // propsForDots: {
            //   r: "1",
            //   strokeWidth: "1",
            //   stroke: "#0052D4"
            // }
          }}
          bezier
        
          
        /> */}
            {/* <View style={styles.listItem}>
            <Image source={{
                uri: 'https://reactnative.dev/img/tiny_logo.png',
              }}  style={{width:30, height:30,borderRadius:30}} />
                    <View style={{alignItems:"center",flex:1}}>
              <Text style={{fontWeight:"bold"}}>My Wallet</Text>
            </View>
            <View style={{alignItems:"center",flex:1}}>
              <Text style={{fontWeight:"bold"}}>ffff</Text>
              <Text>2222</Text>
            </View>
          </View> */}


      <LineChart
          data={{
            labels: time,
            datasets: [
              {
                data: price,
              }
            ]
          }}
          width={Dimensions.get("window").width} // from react-native
          height={500}
          yAxisLabel="$"
          yAxisSuffix="k"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#FFF",
            backgroundGradientFrom: "#FFF",
            backgroundGradientTo: "#FFF",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0,82,212, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0,82,212, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#0052D4"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />

          <View  style={styles.ButtonContainer}>
            <TouchableOpacity onPress={toggleModal} style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Buy</Text>
            </TouchableOpacity>
            <TouchableOpacity  style={styles.appButtonContainer}>
              <Text style={styles.appButtonText}>Sell</Text>
            </TouchableOpacity>
          </View>


          <Modal   isVisible={isModalVisible}>
              <View style={styles.modalContainer}>
            
                <Text style={styles.titleText}>Forms in React Native, The right way!</Text>

                <TextInput
                style={styles.input}
                onChangeText={setCryptoAmount}
                value={cryptoAmount}
                />

                <View  style={styles.ButtonContainer}>
                  <TouchableOpacity onPress={toggleModal} style={styles.appButtonContainerNoBg2}>
                    <Text style={styles.appButtonTextNoBg2}>Buy</Text>
                  </TouchableOpacity>
                  <TouchableOpacity  style={styles.appButtonContainerNoBg}>
                    <Text style={styles.appButtonTextNoBg}>Back</Text>
                  </TouchableOpacity>
                </View>

              </View>
          </Modal>


      </View>
  );
}

export default CryptoDetails;



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
    flex:1,
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5,
    elevation: 3,
    shadowOffset: { width: 1 , height:1},
    shadowColor: "#333",
    shadowOpacity: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    

  },
  textHeder:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  itemTextHeder:{
    textAlign:'left'

  },
  baseText: {
  },

  titleText: {
    fontSize: 20,
    fontWeight: "bold"
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center'
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#0052d4",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: "1%",
    marginBottom: 2,
    marginTop: 8,
    minWidth: "48%",
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },

  modalContainer:{
    flex: 0.5,
    backgroundColor:"#FFF",
    justifyContent: 'space-around',
    alignItems: 'center',
    borderRadius:15,
  },
  appButtonContainerNoBg: {
    
    backgroundColor: "#FFF",
    borderRadius: 30,
    borderWidth :2,
    borderColor : '#2ecc71',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: "1%",
    marginBottom: 2,
    marginTop: 8,
    width: "30%",
  },
  appButtonTextNoBg: {
    fontSize: 18,
    color: "#2ecc71",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  appButtonContainerNoBg2: {
    
    backgroundColor: "#2ecc71",
    borderRadius: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: "1%",
    marginBottom: 2,
    marginTop: 8,
    width: "30%",
  },
  appButtonTextNoBg2: {
    fontSize: 18,
    color: "#FFF",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  listItem:{
    margin:10,
    padding:10,
    backgroundColor:"#FFF",
    width:"95%",
    alignSelf:"center",
    flexDirection:"row",
    borderRadius:5,
    elevation: 8,
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f1f2f6",
    borderRadius: 60,
    width: "80%",
  },
});