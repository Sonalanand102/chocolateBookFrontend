import { StyleSheet, Text, View, Dimensions, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import OrderCard from '../components/OrderCard';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Orders = () => {

    const [order, setOrder] = useState([]);
    const getCheckListByStatus = async () => {
        try {
          const response = await axios.get('https://chocolatekhatabookv1.onrender.com/api/getCheckListByStatus/true');
          // console.log(response.data);
          console.log(response.data)
          setOrder(response.data)
        } catch (error) {
          console.error(error);
        }
      }

      useEffect(() => {
        getCheckListByStatus();
      },[])

      const reversedData = order.slice().reverse();
  return (
    // OrderCard
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

            {reversedData && reversedData.map((item, key) => (
              item && (
                
                <OrderCard 
                  name={item.name} 
                  id={{"id" : item._id}}
                  chocolateName={item.chocolateName}
                  date={item.date}
                  key={key}
                  />
        
              )
            ))} 

        </ScrollView>
        
    </SafeAreaView>
  )
}

export default Orders

const styles = StyleSheet.create({
    container: {
        padding : 20,
        height : windowHeight-50,
        alignItems : 'center',
        backgroundColor : '#FFF7E4',
      },
      // scrollContainer: {
      //   height : windowHeight-200,
      // },
      checkoutBtn: {
        backgroundColor : '#602a31',
        width : windowWidth-40,
        padding : 20,
        alignItems : 'center',
        borderRadius : 10
        
      },
      checkoutBtnTxt: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '500'
      }
})