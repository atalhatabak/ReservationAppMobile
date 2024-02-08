import React, { useState } from 'react';
import { View,TextInput, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import SelectDropdown from 'react-native-select-dropdown'

const BranchPersonalInfo = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [TC, setTC] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const Formcities= [
    'Adana',
    'Mersin',
    'Antalya',
    'Hatay',
    'Isparta',
    'Osmaniye',
    'Kahramanmaraş',
  ];
    const mainX = () => {
        // Sayfaya girildiğinde şuanki kullanıcının bilgileri görülecek, güncelle butonuna basıldığında update işlemi yapılacak
        console.log(name);
        console.log(email);
        console.log(password);
        console.log(TC);
        console.log(phone);
        console.log(city);

    };



    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name="office-building-cog" color="#09435a" size={125} />
            <TextInput
                style={styles.input}
                placeholder="İsim Soyisim"
                value={name}
                onChangeText={text => setName(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="E Posta"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="TC"
                value={TC}
                onChangeText={text => setTC(text)}
            />
            <TextInput
                style={styles.input}
                placeholder="Telefon"
                value={phone}
                onChangeText={text => setPhone(text)}
            />
            <SelectDropdown
              data={Formcities}
              onSelect={(selectedItem, index) => {
                  setCity(selectedItem);
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                  return item
              }}
              defaultButtonText="Şehir Seçiniz"
              buttonStyle={styles.picker}
            />


            <TouchableOpacity style={styles.button} onPress={mainX}>
              <Text style={styles.buttonText}>Güncelle</Text>
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
    text: { // hesabın var mı butonu
        padding:20,
        color:"#09435a",
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


    picker: { // şehir seçme
      width: "80%",
      height: 40,
      borderWidth: 1,
      marginBottom: 20,
      borderColor: '#09435a',
    },
  });

export default BranchPersonalInfo;
