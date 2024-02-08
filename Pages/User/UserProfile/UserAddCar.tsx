 
import React, { useState } from 'react';
import { View,TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import axios from 'axios';
import { useAppContext } from '../../../AppContext';

const UserAddCar = ({ navigation }) => {

  const { appData, setAppData } = useAppContext();

  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [owner, setOwner] = useState('');
  const [plaka, setPlaka] = useState('');


  const mainX = async () => {
    try {
      const response = await axios.post(`${appData.apiUrl}/api/addCar`,
        {
          brand: brand,
          model: model,
          owner: owner,
          plaka: plaka,
        },
        {
          headers: {
            Authorization: `Bearer ${appData.token}`,
          },
        }
      );
  
      Alert.alert('Araç Başarı ile Eklendi');
      navigation.navigate("UserProfile");
    } catch (error) {
      console.log('API isteği başarısız:', error);
      Alert.alert('Başarısız', 'Eklenemedi');
    }
  };



    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name="car-multiple" color="#09435a" size={125} />
            <TextInput
                style={styles.input}
                placeholder="Araç Markası"
                value={brand}
                onChangeText={text => setBrand(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Araç Modeli"
                value={model}
                onChangeText={text => setModel(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Araç Sahibi"
                value={owner}
                onChangeText={text => setOwner(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Araç Plakası"
                value={plaka}
                onChangeText={text => setPlaka(text)}
            />
           

            <TouchableOpacity style={styles.button} onPress={mainX}>
              <Text style={styles.buttonText}>Ekle</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center',
      backgroundColor: '#fafbfb',
    },
    icon:{
      marginBottom:30,
    },
    input: {
      height: 40,
      width: '80%',
      borderColor: '#09435a',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      paddingLeft: 10,
    },

    button: { // kayıt ol butonu
      backgroundColor: '#09435a', 
      padding: 10,
      borderRadius: 5,
      width:"80%",
    },
    buttonText: { // kayıt ol butonu metini
      color: 'white', 
      textAlign: 'center',
      fontSize: 16,
    },


  });

export default UserAddCar;
