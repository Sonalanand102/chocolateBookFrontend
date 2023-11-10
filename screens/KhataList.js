import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import KhataCard from '../components/KhataCard';
import axios, {isCancel, AxiosError} from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const KhataList = ({navigation}) => {

  const [data, setData] = useState([]);
  const [pageStatus, setPageStatus] = useState(false);
  const [selectedKhataList, setSelectedKhataList] = useState([]);
  
  useEffect(() => {
    fetchData();
    console.log("selectedKhataList:", selectedKhataList);
  },[pageStatus])

  const handlePageStatus = () => {
    setPageStatus(true);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get('https://chocolatekhatabookv1.onrender.com/api/getCheckListByStatus/false');
      console.log(response.data);
      setData(response.data);
      handlePageStatus();
      } catch (error) {
      console.error(error);
    }
  }

  const addDataToCheckOut = async (param) => {
    try {
      const response = await axios.patch('https://chocolatekhatabookv1.onrender.com/api/updateCheckOutList',param)
      console.log(response.data)
      handlePageStatus();
      navigation.navigate('Orders')
    } catch (error){
      console.log(error)
    }
  }

  const handleCheckOutList = (id) => {
        // Check if the item is already in the selectedKhataList
        const isSelected = selectedKhataList.some(item => item.id === id.id);
        // If the item is selected, remove it from the array
        if (isSelected) {
          setSelectedKhataList(selectedKhataList.filter(item => item.id !== id.id));
        } else {
          // If the item is not selected, add it to the array
          setSelectedKhataList([...selectedKhataList, id]);
        }
      }

  const reversedData = data.slice().reverse();
  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollContainer} showsVerticalScrollIndicator={false}>

            {reversedData && reversedData.map((item, key) => (
              item && (
                
                <KhataCard 
                  name={item.name} 
                  id={{"id" : item._id}}
                  chocolateName={item.chocolateName}
                  date={item.date}
                  key={key}
                  pageStatus={()=> handlePageStatus()}
                  onSelect={(id) => handleCheckOutList(id)}
                  />
        
              )
            ))} 

        </ScrollView>
        <TouchableOpacity style={styles.checkoutBtn} onPress={() => addDataToCheckOut(selectedKhataList)}>
          <Text style={styles.checkoutBtnTxt}>Check Out</Text>
        </TouchableOpacity>
    </SafeAreaView>
  )
}

export default KhataList

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