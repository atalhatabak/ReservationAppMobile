import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 
import axios from 'axios';
import { useAppContext } from '../../../AppContext';
import { useRoute } from '@react-navigation/native';

const UserNewReservation: React.FC = ({ navigation }) => {
  const { appData, setAppData } = useAppContext();

  const route = useRoute();
  const routeData= (route.params); // önceki sayfadan gelen bayi id'si
  console.log(routeData);
  /////TARİH SAAT SEÇME
  const [month,setMonth] = useState("");
  const [day,setDay] = useState("");
  const [session,setSession] = useState("");
  const [FormMonth, setFormMonth] = useState([]);
  const [FormDay, setFormDay] = useState([]);
  const [FormSession, setFormSession] = useState([]);
  const [ServerDates, setServerDates] = useState("");
    /////////////////



    useEffect(() => { // API isteği tek defalık olmak üzere
      if (!ServerDates) {
        fetchData();
      }
    }, [ServerDates]);
  
    const fetchData = async () => { // API fonksiyonu
      axios.get(`${appData.apiUrl}/api/getAvaibleDates`, {
        headers: {
          'Authorization': `Bearer ${appData.token}`,
        },
        params:{
          'branch_id' : routeData,
        },
      })
        .then(response => {
          console.log(Object.keys(response.data.message["Şubat"]));
          setServerDates(response.data.message); // Sunucudan gelen veri 
          setFormMonth(Object.keys(response.data.message)); // sunucudan gelen verinin sadece Key'leri yani ay değerleri
        })
        .catch(error => {
          console.error(error);
        });
    };


    const mainX = async () => {
      console.log("Bura");
      console.log(`${month}-${day}-2024`);
      console.log(session);
      console.log(routeData);
      try {
        const response = await axios.post(`${appData.apiUrl}/api/addReservation`,
          {
            'date' : `${month}-${day}-2024`,
            'session' : session,
            'branch_id' : routeData,
            'car_id' : "1",
          },
          {
            headers: {
              Authorization: `Bearer ${appData.token}`,
            },
          }
        );
          
        Alert.alert(response.data.message);
        navigation.navigate("UserReservations");
      } catch (error) {
        console.log('API isteği başarısız:', error);
      }
    }

  return (
    <View style={styles.container}>
        <Text style={styles.text} >Tarih Seçiniz</Text>

            <TouchableOpacity style={styles.datediv} >
                <View style={styles.leftTextContainer}>
                    <SelectDropdown
                        data={FormMonth}
                        onSelect={(selectedItem, index) => {
                            setMonth(selectedItem);
                            setFormDay(Object.keys(ServerDates[selectedItem])) // sunucudan gelen verinin Aylara göre günleri
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            return item
                        }}
                        defaultButtonText="Ay"
                        buttonStyle={styles.pickerDate}
                    />                   
                </View>
                <View style={styles.rightTextContainer}>
                    <SelectDropdown
                            data={FormDay}
                            onSelect={(selectedItem, index) => {
                                setDay(selectedItem);
                                setFormSession(ServerDates[month][selectedItem]);
                                console.log(ServerDates["Şubat"]);
                            }}
                            buttonTextAfterSelection={(selectedItem, index) => {
                                return selectedItem
                            }}
                            rowTextForSelection={(item, index) => {
                                return item
                            }}
                            defaultButtonText="Gün"
                            buttonStyle={styles.pickerDate}
                        />                         
                </View>
                
            </TouchableOpacity>
            <TouchableOpacity style={styles.datediv} >
              <View style={styles.rightTextContainer}>
                      <SelectDropdown
                              data={FormSession}
                              onSelect={(selectedItem, index) => {
                                  setSession(selectedItem);
                              }}
                              buttonTextAfterSelection={(selectedItem, index) => {
                                  return selectedItem
                              }}
                              rowTextForSelection={(item, index) => {
                                  return item
                              }}
                              defaultButtonText="Saat"
                              buttonStyle={styles.pickerDate}
                          />                         
              </View>
            </TouchableOpacity>


        <TouchableOpacity style={styles.button} onPress={mainX}>
            <Text style={styles.buttonText}><Icon name="database-search" color="#fff" size={25} /> Rezervasyon Yap</Text>
        </TouchableOpacity>
        <Text style={styles.selectedDateTime} onPress={() => navigation.navigate('UserNewReservation')}><Icon name="arrow-left" size={18} /> Bayi seçmeye Geri Dön</Text>


    </View>
  );
};
//onPress={() => }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#fafbfb',
    },
    text: { 
        padding:20,
        color:"#09435a",
        fontSize:30,
    },
    button: {
        backgroundColor: "#09435a", 
        padding: 10,
        borderRadius: 5,
        width:"80%",
        marginTop:40,
        height: 50,


      },
      buttonText: { 
        color: 'white', 
        textAlign: 'center',
        fontSize: 20,
      },
      selectedDateTime: {
        marginTop: 20,
        fontSize: 18,
      },

      //tarih saat
      datediv:{ // yaklaşan rezervasyon bilgilendirme kutusu
        width:"80%",
        height: 50,
        flexDirection: 'row',
        marginTop:40,
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
        pickerDate: {
          width:"100%",
          height: 50,
          borderWidth: 1,
          borderRadius: 5,
          borderColor:"#09435a",
          left:0,
        },

        //tarih saat
  });

export default UserNewReservation;
