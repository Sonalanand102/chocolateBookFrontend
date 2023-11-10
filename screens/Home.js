import {
   StyleSheet, 
   Text, 
   View, 
   SafeAreaView, 
   TextInput,
   Dimensions,
   Button,
   TouchableOpacity
  } from 'react-native'
import React, { useState } from 'react'
import axios, {isCancel, AxiosError} from 'axios';
// import DateTimePicker from '@react-native-community/datetimepicker';
import RNDateTimePicker from '@react-native-community/datetimepicker';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Home = ({navigation}) => {

  const [name, setName] = useState('');
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [chocolateName, setChocolateName] = useState('');

  const data = {
    name: name,
    date: date,
    chocolateName: chocolateName
  }

  const addToKhataPostAPI = () => {
    axios.post(
      'https://chocolatekhatabookv1.onrender.com/api/post', 
      data
    )
    .then((response) => {
      console.log(response);
      navigation.navigate('GoToKhata');
    })
    .catch((error) => {
      console.log(error);
    });
  }


  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const getDate = () => {
    let tempDate = date.toString().split(' ');
    return date !== ''
      ? `${tempDate[2]} ${tempDate[1]} ${tempDate[3]}`
      : '';
  };
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Name</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={name} placeholder='Name' onChangeText={setName}/>
        </View>
      </View>

      <View style={styles.inputView} >
        <Text style={styles.inputLabel}>Date</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} editable={false} value={getDate()} placeholder='Date'/>
          <TouchableOpacity onPress={showDatepicker} style={styles.btnDatePicker}>
            <Text style={styles.btnDatePickerText}>D</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.inputView}>
        <Text style={styles.inputLabel}>Choclate Name</Text>
        <View style={styles.inputContainer}>
          <TextInput style={styles.input} value={chocolateName} placeholder='Choclate Name' onChangeText={setChocolateName}/>
        </View>
      </View>

      <TouchableOpacity style={styles.addToKhataBtn} onPress={() => addToKhataPostAPI()}>
        <Text style={styles.addToKhataBtnTxt}>Add to Khata</Text>
      </TouchableOpacity>
      

    {showPicker && 
      <RNDateTimePicker
      value={date}
      onChange={onChange}
      />}
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    padding : 20,
    height : windowHeight,
    alignItems : 'center',
    backgroundColor : '#FFF7E4',
  },

  inputView:{
    margin : 12,
  },

  inputLabel: {
    marginVertical : 3,
    fontSize: 18,
    color: "#2E1503",
    fontWeight: "500",
  },
  input: {
    height: 46,
    fontSize : 16,  
  },
  
  inputContainer:{
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 2,
    width : windowWidth-50,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    paddingLeft : 10,
  },

  btnDatePicker:{
    backgroundColor: '#2E1503',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
  },

  btnDatePickerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: "500",
  },

  addToKhataBtn: {
    backgroundColor: '#2E1503',
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth-50,
    paddingVertical: 10,
    marginVertical : 50,
    borderRadius : 5,
  },

  addToKhataBtnTxt: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: "500",
  }
})