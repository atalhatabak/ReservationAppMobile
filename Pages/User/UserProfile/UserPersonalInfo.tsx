import React, { useState, useEffect } from 'react';
import { View,TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import axios from 'axios';
import { useAppContext } from '../../../AppContext';

const UserPersonalInfo = ({ navigation }) => {
  const { appData, setAppData } = useAppContext();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [TC, setTC] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');


    const mainX = async () => {
      try {
        const response = await axios.put(`${appData.apiUrl}/api/updatePersonalInfo`,
          {
            name: name,
            email: email,
            TC: TC,
            phone: phone,
            password: password,
          },
          {
            headers: {
              Authorization: `Bearer ${appData.token}`,
            },
          }
        );
    
        Alert.alert('Bilgileriniz Başarılı Bir Şekilde Güncellendi');
        navigation.navigate("UserProfile");
      } catch (error) {
        console.log('API isteği başarısız:', error);
        Alert.alert('Başarısız', 'Güncellenemedi');
      }
    };

    useEffect(() => { // API isteği tek defalık olmak üzere
      if (!name) {
        fetchData();
      }
    }, [name]);
  
    const fetchData = async () => { // API fonksiyonu
      try {
          const response = await axios.get(`${appData.apiUrl}/api/getPersonalInfo`,
            {
              headers: {
                Authorization: `Bearer ${appData.token}`,
              },
            }
          );
          console.log(response.data.message[0].name);
          setName(response.data.message[0].name);
          setEmail(response.data.message[0].email);
          setTC(response.data.message[0].TC);
          setPhone(response.data.message[0].phone);
        } catch (error) {
          console.log('API isteği başarısız:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name="account-edit-outline" color="#09435a" size={125} />
            <Text>İsim:</Text>
            <TextInput
                style={styles.input}
                placeholder="İsim Soyisim"
                value={name}
                onChangeText={text => setName(text)}
            />
            <Text>E Posta:</Text>

            <TextInput
                style={styles.input}
                placeholder="E Posta"
                value={email}
                onChangeText={text => setEmail(text)}
            />
            <Text>TC:</Text>
            <TextInput
                style={styles.input}
                placeholder="TC"
                value={TC}
                onChangeText={text => setTC(text)}
            />
            <Text>Telefon:</Text>
            <TextInput
                style={styles.input}
                placeholder="Telefon"
                value={phone}
                onChangeText={text => setPhone(text)}
            />
            <Text>Yeni Şifre:</Text>
            <TextInput
                style={styles.input}
                placeholder="Şifre"
                secureTextEntry={true}
                value={password}
                onChangeText={text => setPassword(text)}
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

export default UserPersonalInfo;
