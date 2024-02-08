import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text,  StyleSheet, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import axios from 'axios';
import { useAppContext } from '../../../AppContext';

const UserCars = ({ navigation }) => {
    const { appData, setAppData } = useAppContext();
    const [modalVisible, setModalVisible] = useState(false);

    const [cars, setCars] = useState("");

    useEffect(() => { // API isteği tek defalık olmak üzere
        if (!cars) {
          fetchData();
        }
      }, [cars]);
    
      const fetchData = async () => { // API fonksiyonu
        try {
            const response = await axios.get(`${appData.apiUrl}/api/getCars`,
              {
                headers: {
                  Authorization: `Bearer ${appData.token}`,
                },
              }
            );
            setCars(response.data.message);
          } catch (error) {
            console.log('API isteği başarısız:', error);
          }
      };


console.log(cars);
  const mainX = () => {
   
  };
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.reservations} >
    <View style={styles.leftTextContainer}>
        <Icon name="car" color="#09435a" size={20} />
        <Text style={styles.leftText}>Marka</Text>
        <Text style={styles.leftText}>Model</Text>
        <Text style={styles.leftText}>Plaka</Text>
        <Text style={styles.leftText}>Sahip</Text>
        <Text style={styles.leftText}>Son Muayene </Text>
    </View>
    <View style={styles.rightTextContainer}>
        <Icon style={styles.rightText} name="car-info" color="#09435a" size={20} />
        <Text style={styles.rightText}>{item.brand}</Text>
        <Text style={styles.rightText}>{item.model}</Text>
        <Text style={styles.rightText}>{item.plaka}</Text>
        <Text style={styles.rightText}>{item.owner}</Text>
        <Text style={styles.rightText}>12.12.2023 </Text>
    </View>
    </TouchableOpacity>
  );

  return (
    
    <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserAddCar')}>
            <Text style={styles.buttonText}>Yeni Araç Ekle</Text>
        </TouchableOpacity>



        <Text style={styles.text} ><Icon name="car-arrow-right" color="#09435a" size={20} />Araçlarım<Icon name="car-arrow-left" color="#09435a" size={20} /></Text>

            <FlatList
                data={cars}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={styles.flatlist}
            />



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
        color:"#09435a",
        fontSize:20,
    },
    reservations:{ // yaklaşan rezervasyon bilgilendirme kutusu
        width:"100%",
        height:150,
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
    flatlist:{
        width:"90%",
        padding:0,
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

export default UserCars;
 
