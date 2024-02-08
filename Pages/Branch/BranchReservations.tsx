import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text,  StyleSheet, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import { useRoute } from '@react-navigation/native';
import { useAppContext } from '../../AppContext';
import axios from 'axios';


const UserReservations = ({ navigation }) => {

    const { appData, setAppData } = useAppContext();

    const [modalVisible, setModalVisible] = useState(false);
    const ChangeModal = (item) => { // Model Görünür ise gizler gizli ise gösterir.
        if(modalVisible){// açıksa kapat
            setModalVisible(false)
        }
        else{// kapalıysa aç
            console.log("item");
            setModalVisible(true);
        }
    }
    const [modelData, setModelData] = useState({"address": "Orası Burası", "branch": "Alanya", "brand": "Ford", "city": "Antalya", "date": "19.1.2024", "id": 1, "model": "Focus", "report": "Örnek Bayi Raporu", "session": "08.00"});
    const [reservations, setReservations] = useState("");

    useEffect(() => { // API isteği tek defalık olmak üzere
        if (!reservations) {
          fetchData();
        }
      }, [reservations]);
    
      const fetchData = async () => { // API fonksiyonu
        try {
            const response = await axios.post(`${appData.apiUrl}/api/getReservations`,
              {
                user_id: appData.user_id,
              },
              {
                headers: {
                  Authorization: `Bearer ${appData.token}`,
                },
              }
            );
            setReservations(response.data.message);
          } catch (error) {
            console.log('API isteği başarısız:', error);
          }
      };

      const refresh = () => {
        setReservations("");
      }

      const iptal = async (id) => { // API fonksiyonu
        console.log(id);
        try {
            const response = await axios.post(`${appData.apiUrl}/api/deleteReservation`,
              {
                id: id,
              },
              {
                headers: {
                  Authorization: `Bearer ${appData.token}`,
                },
              }
            );
            refresh();
          } catch (error) {
            console.log('API isteği başarısız:', error);
          }
      };




  const renderItem = ({ item }) => (
    <View>
    <TouchableOpacity style={styles.reservations} onPress={ChangeModal}>
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
    <Icon style={styles.rightText} name="cancel" color="#09435a" size={20} onPress={() => iptal(item.id)} />
    </View>

  );

  return (
    
    <View style={styles.container}>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UserNewReservation')}>
            <Text style={styles.buttonText}>Yeni Rezervasyon oluştur</Text>
        </TouchableOpacity>

        <Text style={styles.text} onPress={refresh} >Yaklaşan Rezervasyonlar <Icon style={styles.rightText} name="refresh" color="#09435a" size={15} /></Text>
        
            <FlatList
                data={reservations}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                style={styles.flatlist}
            />

        <Text style={styles.text} >Geçmiş Rezervasyonlar</Text>


            <Modal visible={modalVisible} transparent animationType="slide">
                <View style={styles.modalContainer}>
                    <Text style={styles.modalText}>Rezervasyon Ayrıntıları</Text>

                    <TouchableOpacity style={styles.closeButton} onPress={ChangeModal}>
                        <Icon name="close-box" color="#4B0812" size={50} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.reservations}  >
                        <View style={styles.leftTextContainer}>
                            <Icon name="book" color="#09435a" size={20} />
                            <Text style={styles.leftText}>{modelData.branch}</Text>
                            <Text style={styles.leftText}>{modelData.city}</Text>
                        </View>
                        <View style={styles.rightTextContainer}>
                            <Icon style={styles.rightText} name="clock" color="#09435a" size={20} />
                            <Text style={styles.rightText}>{modelData.date}</Text>
                            <Text style={styles.rightText}>{modelData.session}</Text>
                        </View>
                    </TouchableOpacity>

                    <Text style={styles.modalText}>Bayi Raporu</Text>
                    <Text style={styles.modalText}>{modelData.address}</Text>
                    <Text style={styles.modalText}>{modelData.report}</Text>
                    

                </View>
            </Modal>

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
 
