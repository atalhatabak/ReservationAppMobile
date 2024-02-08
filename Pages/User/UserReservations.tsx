import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text,  StyleSheet, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import { useAppContext } from '../../AppContext';
import axios from 'axios';

const UserReservations = ({ navigation }) => {

    const { appData, setAppData } = useAppContext();


    const [reservations, setReservations] = useState("");
    const [whichReservations, setWhichReservations] = useState("active");
    const [activeReservations, setActiveReservations] = useState("");
    const [deactiveReservations, setDeactiveReservations] = useState("");

    

    const changeReservations = () => {
      if(whichReservations == "active"){
        setWhichReservations("deactive");
        setReservations(deactiveReservations);
      }
      else if(whichReservations == "deactive"){
        setWhichReservations("active");
        setReservations(activeReservations);
      }
    }

    useEffect(() => { // API isteği tek defalık olmak üzere
        if (!activeReservations) {
          fetchData();
        }
      }, [activeReservations]);
    
      const fetchData = async () => { // API fonksiyonu
        try {
            const response = await axios.get(`${appData.apiUrl}/api/getReservations`,
              {
                headers: {
                  Authorization: `Bearer ${appData.token}`,
                },
              }
            );
            setActiveReservations(response.data.message.active);
            setReservations(response.data.message.active);
            setDeactiveReservations(response.data.message.deactive);
            console.log(response.data.message)
          } catch (error) {
            console.log('API isteği başarısız:', error);
          }
      };

      const refresh = () => {
        setWhichReservations("active");
        setActiveReservations("");
      }

  const renderItem = ({ item }) => (
    <View>
    <TouchableOpacity style={styles.reservations} onPress={() => navigation.navigate('UserReservationDetail',item)}>
        <View style={styles.leftTextContainer}>
            <Icon name="book" color="#09435a" size={20} />
            <Text style={styles.leftText}>{item.branch}</Text>
            <Text style={styles.leftText}>{item.city}</Text>
            <Text style={styles.leftText}>Rezervasyon Ayrıntıları </Text>
        </View>
        <View style={styles.rightTextContainer}>
            <Icon style={styles.rightText} name="clock" color="#09435a" size={20} />
            <Text style={styles.rightText}>{item.session}</Text>
            <Text style={styles.rightText}>{item.date}</Text>
            <Text style={styles.leftText}>İçin Tıklayınız </Text>
        </View>
    </TouchableOpacity>
    </View>

  );

  return (
    
    <View style={styles.container}>
        
        <TouchableOpacity style={styles.button} onPress={() =>  navigation.navigate('UserNewReservation')}>
            <Text style={styles.buttonText}>Yeni Rezervasyon oluştur</Text>
        </TouchableOpacity>

        <Text style={styles.text} onPress={refresh} > {whichReservations == "active" ?"Aktif Rezervasyonlar" : "Geçmiş/İptal Rezervasyonlar"} <Icon style={styles.rightText} name="refresh" color="#09435a" size={15} /></Text>
        
            <FlatList
                data={reservations}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={styles.flatlist}
            />

        <TouchableOpacity  onPress={ changeReservations }>
          <Text style={styles.text} >{ whichReservations == "active" ? "Geçmiş/İptal Rezervasyonları Göster" : "Gelecek Rezervasyonları Göster" }</Text>
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
        backgroundColor: '#09435a', 
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
    reservations:{ // yaklaşan rezervasyon bilgilendirme kutusu
        width:"100%",
        height:100,
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
    flatlist:{
        width:"90%",
        padding:0,
    },


  });

export default UserReservations;
 
