import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native'
import React, {useState} from 'react'
import axios from 'axios';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Ionicons from '@expo/vector-icons/Ionicons';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const KhataCard = (props) => {
  const [selectListItem, setSelectListItem] = useState(false);
  const [ek, setEk] = useState([]);
  const id = props.id;
  // const cartStatus = props.cartStatus
  const deleteKhataListById = async () => {

    try {
      const response = await axios.delete(`https://chocolatekhatabookv1.onrender.com/api/delete/${id}`)
      console.log(response);
      props.pageStatus()
      // console.log(props.pageStatus)
    } catch (error) {
      console.error("Error deleting resources: ",error);
    }
}

const handleSelectListItem = () => {
  
  setSelectListItem(!(selectListItem))
    props.pageStatus()
    props.onSelect(props.id);
}


  const datePart = props.date.slice(0, 10); // Extract the date portion

  const [year, month, day] = datePart.split('-');
  const formattedDate = [day, month, year].join('-');
  

  return (

      <View style={styles.cardContainer}>
        <View style={styles.cardDetailContainer}>
          <View style={styles.cardImg}>
          <Image alt='chocolate pic'/>
          </View>

        <View style={styles.cardDetail}>
          <Text style={styles.cardDetailTxt}>{props.name}</Text>
          <Text style={styles.cardDetailTxt}>{props.chocolateName}</Text>
          <Text style={styles.cardDetailTxt}>{formattedDate}</Text>
        </View>
        </View>
      
        <View style={styles.actionBtns}>
          <TouchableOpacity style={styles.actionBtn} onPress={()=>handleSelectListItem()}>
            <Icon name={selectListItem?"cart-remove":"cart-plus"} size={24} color={'red'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBtn} onPress={()=>deleteKhataListById()}>
            <Ionicons name="trash-outline" size={24} color={'red'} />
          </TouchableOpacity>
        </View>
      </View>

  )
}

export default KhataCard

const styles = StyleSheet.create({
    cardContainer: {
        width : windowWidth-40,
        backgroundColor : '#ffffff',
        padding: 10,
        display: "flex",
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 5,
        marginVertical: 8,
    },
    cardDetailContainer : {
      flexDirection : 'row'
    },
    cardImg: {
        height : 100,
        width : 100,
        backgroundColor: '#805155',
        borderRadius : 5,
    },

    cardDetail: {
        justifyContent : 'center',
        marginHorizontal : 10,
    },

    cardDetailTxt: {
      fontWeight : '500',
      marginVertical : 2,
    },

    actionBtns: {
      // flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },

    actionBtn: {
      marginVertical : 5,
    }
})