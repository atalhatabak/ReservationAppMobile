import React, { useState } from 'react';
import { View,TextInput, Text,  StyleSheet, Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import axios from 'axios';
import { useAppContext } from '../AppContext';
import { useRoute } from '@react-navigation/native';

const LoginS: React.FC  = ({ navigation }) => {
    const { appData, setAppData } = useAppContext();

    const route = useRoute(); // parametre ile gelen veriyi al, amacı registerdan başarılı ise email verisini alıyor
    //const [email, setEmail] = useState(typeof route.params == 'undefined' ? route.params : route.params);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState('');

    const apiUrl = appData.apiUrl;
    const mainX = async () => {
      axios.post(`${apiUrl}/api/login`, {
        email: email,
        password: password,
      })
        .then(response => {
            const appData = {
              apiUrl:apiUrl,
              name:response.data.name,
              role:response.data.role,
              token:response.data.token,
              user_id:response.data.user_id,
              data:"",
            };
            navigation.navigate(response.data.role == "0" ? "UserTab" : "BranchTab", {screen: response.data.role == "0" ? 'UserHomeStack' : 'BranchHomeStack',params: {screen: response.data.role == "0" ? 'UserHome' : 'BranchHome',params: {appData}}}); 
        }) 
        .catch(error => {
          console.log('API isteği başarısız:', error);
          Alert.alert("Başarısız","Email veya Şifre Hatalı");
        });

    };

    return (
        <View style={styles.container}>
            <Icon style={styles.icon} name="car-emergency" color="#09435a" size={125} />
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
            <TouchableOpacity style={styles.button} onPress={mainX}>
              <Text style={styles.buttonText}><Icon name="login" color="#fff" size={20} />  Giriş Yap</Text>
            </TouchableOpacity>
            <Text style={styles.text} onPress={() => navigation.navigate('Register')}>Hesabın Yok mu? Kayıt Ol</Text>
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
      marginBottom:50,
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
    text: {
        padding:20,
        color:"#09435a",
    },
    button: {
      backgroundColor: '#09435a', // İstediğiniz arkaplan rengini burada belirtin
      padding: 10,
      borderRadius: 5,
      width:"80%",
    },
    buttonText: {
      color: 'white', // İstediğiniz metin rengini burada belirtin
      textAlign: 'center',
      fontSize: 16,
    },
  });

export default LoginS;
