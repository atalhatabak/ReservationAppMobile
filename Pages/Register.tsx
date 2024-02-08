import React, { useState } from 'react';
import { View,TextInput, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import axios from 'axios';
import { useAppContext } from '../AppContext';

const Register: React.FC = ({ navigation }) => {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [TC, setTC] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('0');
  const options = ['0', '1'];

  const { appData, setAppData } = useAppContext();
  const apiUrl = appData.apiUrl;

    const mainX = () => {
      axios.post(`${apiUrl}/api/register`, {
        name:name,
        email: email,
        password: password,
        TC:TC,
        phone:phone,
        role:role,        
      })
        .then(response => {
          navigation.navigate("Login",email);
        })
        .catch(error => {
          Alert.alert("Başarısız","Tüm Alanları Doldurduğunuzdan Emin Olun");
        });
    };

    const RoleSelect = () => {
      const newSelectedOption = role === '0' ? '1' : '0';
      setRole(newSelectedOption);
    };

    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name={role == "0" ? "car-emergency" : "car-electric-outline"} color="#09435a" size={125} />
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
            <TouchableOpacity style={styles.selectButton} onPress={RoleSelect}>
                <Text style={styles.selectButtonText}>{role == "0" ? "Normal Kullanıcı Kayıt" : "Bayi Kayıt"}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={mainX}>
              <Text style={styles.buttonText}><Icon name={role == "0" ? "account-plus" : "domain-plus"} color="#fff" size={20} />  Kayıt Ol  <Icon name={role == "0" ? "account-plus" : "domain-plus"} color="#fff" size={20} /></Text>
            </TouchableOpacity>
            <Text style={styles.text} onPress={() => navigation.navigate('Login')}>Hesabın Var mı? Giriş Yap</Text>
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

    selectButton: { // role seçme butonu
      width:"80%",
      height: 45,
      borderColor: '#09435a',
      borderWidth: 1,
      borderRadius: 5,
      marginBottom: 20,
      padding: 10,
    },
    selectButtonText: { // role metini
      color: '#09435a',
      fontSize: 16,
      textAlign: 'center',
    },

  });

export default Register;
