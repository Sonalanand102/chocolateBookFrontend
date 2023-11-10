import { StyleSheet, Text, View, Dimensions, Image } from 'react-native'
import React from 'react'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const OrderCard = (props) => {

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

  </View>
  )
}

export default OrderCard

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