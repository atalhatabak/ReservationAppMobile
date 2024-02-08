import React, { useState } from 'react';
import { View,TouchableOpacity, Text,  StyleSheet,} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //

const BranchProfile = ({ navigation }) => {


    const mainX = () => {
        
    };



    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BranchPersonalInfo')}>
                <Text style={styles.buttonText}>Bayi Bilgileri Düzenle</Text>
            </TouchableOpacity>



            <TouchableOpacity style={styles.logOutButton} onPress={() => navigation.navigate('Login')}>
                
                <Text style={styles.buttonText}><Icon name="exit-to-app" color="#fff" size={20} />  Çıkış Yap</Text>
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
    button: {
        backgroundColor: '#09435a', 
        padding: 10,
        borderRadius: 5,
        width:"90%",
        marginTop:15,

      },
      buttonText: { 
        color: 'white', 
        textAlign: 'center',
        fontSize: 16,
      },
      logOutButton: { 
        backgroundColor: '#4B0812', 
        padding: 10,
        borderRadius: 5,
        width:"90%",
        marginTop:15,
        position: 'absolute',
        bottom: 10,
        alignItems: 'center',

      },
    text: { 
        padding:20,
        color:"#09435a",
    },

  });

export default BranchProfile;
 
