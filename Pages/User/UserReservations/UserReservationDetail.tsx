import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text,  StyleSheet, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import { useAppContext } from '../../../AppContext';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';


const UserReservationDetail = ({ navigation }) => {

    const { appData, setAppData } = useAppContext();
    const route = useRoute();
    const reservation = (route.params); 
    console.log(reservation);

      const iptal = async (id , iptalStatus=false) => { // API fonksiyonu

        if(iptalStatus){
                console.log("iptal Edildi");
            try {
                const response = await axios.delete(`${appData.apiUrl}/api/deleteReservation`,
                {
                    params: {
                    id: id,
                    },
                    headers: {
                    Authorization: `Bearer ${appData.token}`,
                    },
                }
                );
                Alert.alert("Başarılı","Rezervasyonunuz İptal Edildi");
                navigation.navigate('UserReservations')
            } catch (error) {
                console.log('API isteği başarısız:', error);
            }
        }
        else{
            Alert.alert(
                'Rezervasyonu İptal Et',
                'Bu rezervasyonu iptal etmek istediğinizden emin misiniz?',
                [
                  {
                    text: 'İptal',
                    style: 'cancel',
                  },
                  {
                    text: 'Evet',
                    onPress: () => iptal(id, true), // Kullanıcı 'Evet' derse iptal fonksiyonunu çağır
                  },
                ],
                { cancelable: true }
              ); 
        }
      };



  return (
    
    <View style={styles.container}>
        
        <Text style={styles.text}>Rezervasyon Ayrıntıları</Text>


        <TouchableOpacity style={styles.reservation}  >
            <View style={styles.leftTextContainer}>
                <Icon name="book" color="#09435a" size={20} />
                <Text style={styles.leftText}>Tarih</Text>
                <Text style={styles.leftText}>Bayi</Text>
                <Text style={styles.leftText}>Araç</Text>
                <Text style={styles.leftText}>Bayi Adresi</Text>
                <Text style={styles.leftText}>Bayi Raporu</Text>
                <Text style={styles.leftText}>Rezervasyon Durumu</Text>
            </View>
            <View style={styles.rightTextContainer}>
                <Icon style={styles.rightText} name="clock" color="#09435a" size={20} />
                <Text style={styles.rightText}>{reservation.date} / {reservation.session}</Text>
                <Text style={styles.rightText}>{reservation.city} / {reservation.branch}</Text>
                <Text style={styles.rightText}>{reservation.brand} / {reservation.model}</Text>
                <Text style={styles.rightText}>{reservation.address}</Text>
                <Text style={styles.rightText}>{reservation.report}</Text>
                <Text style={styles.rightText}>{reservation.status}</Text>
            </View>
        </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={() => iptal(reservation.id)}>
            <Text style={styles.buttonText}>Rezervasyonu İptal Et</Text>
        </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'flex-start', 
        alignItems: 'center',
        backgroundColor: '#fafbfb',
        padding:10,
    },
    button: { // Yeni Rezervasyon oluştur butonu
        backgroundColor: '#4B0812', 
        padding: 10,
        borderRadius: 5,
        width:"90%",
      },
      buttonText: { // Yeni Rezervasyon oluştur butonu metini
        color: 'white', 
        textAlign: 'center',
        fontSize: 16,
      },
    text: { 
        padding:20,
        color:"#4B0812",
    },
    reservation:{ // yaklaşan rezervasyon bilgilendirme kutusu
        width:"100%",
        height:"80%",
        padding:10,
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
        
  });

export default UserReservationDetail;
 
 
