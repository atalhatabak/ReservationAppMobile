import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import { useAppContext } from '../../AppContext';
import { useRoute } from '@react-navigation/native';

const UserHome: React.FC  = ({ navigation }) => {


  const route = useRoute(); // navigator param ile gönderilen veri, loginden geliyor. bunu App context içerisine home sayfasından alıyoruz ve uygulamanın kalanı boyunca erişebiliyoruz
  const routeData= (route.params.appData);

  const { appData, setAppData } = useAppContext();

  // şu an apiden gelen name ve token verileri heryerden ulaşılabilir
  useEffect(() => {
    setAppData({
      'apiUrl':appData.apiUrl,
      'name':routeData.name,
      'role':routeData.role,
      'token': routeData.token,
      'user_id': routeData.user_id,
      'data':"Test"
    });
  }, []); 



    return (
        <View style={styles.container}>

          <Text style={styles.text} >Hoşgeldin, {routeData.name} </Text>
          <Text style={styles.text} ><Icon name="car-arrow-right" color="#09435a" size={20} />Yaklaşan Rezervasyon<Icon name="car-arrow-left" color="#09435a" size={20} /></Text>
          <TouchableOpacity style={styles.reservations} onPress={() => navigation.navigate('UserReservationsStack')}>
                        <View style={styles.leftTextContainer}>
                            <Icon name="book" color="#09435a" size={20} />
                            <Text style={styles.leftText}>Bayi</Text>
                            <Text style={styles.leftText}>Tarih</Text>
                        </View>
                        <View style={styles.rightTextContainer}>
                            <Icon style={styles.rightText} name="clock" color="#09435a" size={20} />
                            <Text style={styles.rightText}>Alanya</Text>
                            <Text style={styles.rightText}>14.2.2024</Text>
                        </View>
            </TouchableOpacity>

          <Text style={styles.text} ><Icon name="car-arrow-right" color="#09435a" size={20} />Araçlarım<Icon name="car-arrow-left" color="#09435a" size={20} /></Text>
          <TouchableOpacity style={styles.reservations} onPress={() => navigation.navigate('UserProfileStack')}>
                <View style={styles.leftTextContainer}>
                    <Icon name="car-2-plus" color="#09435a" size={20} />
                    <Text style={styles.leftText}>Marka</Text>
                    <Text style={styles.leftText}>Model</Text>
                    <Text style={styles.leftText}>Son Muayene </Text>
                    <Icon style={styles.leftText} name="car-info" color="#09435a" size={20} />
                </View>
                <View style={styles.rightTextContainer}>
                    <Icon style={styles.rightText} name="car-2-plus" color="#09435a" size={20} />
                    <Text style={styles.rightText}>Ford</Text>
                    <Text style={styles.rightText}>Mondeo</Text>
                    <Text style={styles.rightText}>12.12.2023 </Text>
                    <Icon style={styles.rightText} name="car-info" color="#09435a" size={20} />
                </View>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent:"flex-start",
      alignItems: 'center',
      backgroundColor: '#fafbfb',
      padding:20,
    },
    text: { 
      padding:20,
      color:"#09435a",
      fontSize:20,
    },
    icon:{
      marginBottom:30,
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
    reservations:{ // yaklaşan rezervasyon bilgilendirme kutusu
      width:"90%",
      height:120,
      padding:10,
      borderColor: '#09435a',
      borderWidth: 1,
      borderRadius: 5,
      flexDirection: 'row',
      paddingVertical: 10,
      paddingHorizontal: 20,
      marginTop:5,
  },
      leftTextContainer: {
          flex: 1, // Soldaki metnin esnek genişliği
      },
      leftText: {
          color: '#09435a',
          textAlign: 'left', // Sol tarafa hizala
      },
      rightTextContainer: {
          flex: 1, // Sağdaki metnin esnek genişliği
      },
      rightText: {
          color: '#09435a',
          textAlign: 'right', // Sağa hizala
      },
      
      //Açılır Popup Menü
      modalContainer: {
          flex: 1,
          flexDirection: 'column',
          justifyContent:"flex-start",
          alignItems: 'center',
          backgroundColor: 'rgba(251, 251, 251, 1)', 
          width:"90%",
          height:"80%",
          top:"10%",
          left:"5%",
          position:"absolute",
          borderWidth:1,
          paddingTop:50,

      },
      modalText: {
          color: '#09435a',
          marginBottom: 20,
      },
      closeButton: {
          position:"absolute",
          top:5,
          right:5,
      
      },

  });

export default UserHome;
 
