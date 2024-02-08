import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; //
import { useAppContext } from './AppContext';

// Login Pages
import Login from './Pages/Login'; 
import Register from './Pages/Register'; 

// User Pages
import UserReservations from './Pages/User/UserReservations'; 
  import UserNewReservation from './Pages/User/UserReservations/UserNewReservation'; 
    import UserNewReservationDate from './Pages/User/UserReservations/UserNewReservationDate'; 
      import UserReservationDetail from './Pages/User/UserReservations/UserReservationDetail'; 
import UserHome from './Pages/User/UserHome'; 
import UserProfile from './Pages/User/UserProfile'; 
  import UserPersonalInfo from './Pages/User/UserProfile/UserPersonalInfo'; 
  import UserCars from './Pages/User/UserProfile/UserCars'; 
    import UserAddCar from './Pages/User/UserProfile/UserAddCar'; 

// Branch Pages
import BranchReservations from './Pages/Branch/BranchReservations'; 
import BranchHome from './Pages/Branch/BranchHome'; 
import BranchProfile from './Pages/Branch/BranchProfile'; 
  import BranchPersonalInfo from './Pages/Branch/BranchProfile/BranchPersonalInfo'; 

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const LoginStack = () => ( // Default girilen sayfa login sayfasından branch veya user sayfasına yönlendirme
  <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
  </Stack.Navigator>
);

const UserTab = ({ route }) => ( // User Sayfaları için Tab Navigator gruplandırması, 3 ana sayfa alt sayfa fonksiyonlarına yönlendiriyor
  <Tab.Navigator initialRouteName='UserHomeStack' screenOptions={{ headerShown: false }}> 
    <Tab.Screen name="UserReservationsStack" component={UserReservationsStack} options={{ tabBarLabel: 'Rezervasyonlar',tabBarIcon: ({  color, size }) => (<Icon name="book-open-outline" color="#09435a" size={25} /> ) }} />
    <Tab.Screen name="UserHomeStack" component={UserHomeStack} options={{tabBarLabel: 'Ana Sayfa',tabBarIcon: ({  color, size }) => (<Icon name="home-flood" color="#09435a" size={35} /> )}}/>
    <Tab.Screen name="UserProfileStack" component={UserProfileStack} options={{ tabBarLabel: 'Profil',tabBarIcon: ({  color, size }) => (<Icon name="account" color="#09435a" size={25} /> ) }}/>
  </Tab.Navigator>
);
    //User Navigator Alt sayfaları
    const UserReservationsStack = ({ route }) => ( 
      <Stack.Navigator initialRouteName='UserReservations' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserReservations" component={UserReservations}  />
        <Stack.Screen name="UserNewReservation" component={UserNewReservation} />
        <Stack.Screen name="UserNewReservationDate" component={UserNewReservationDate} />
        <Stack.Screen name="UserReservationDetail" component={UserReservationDetail} />
      </Stack.Navigator>
    );

    const UserHomeStack = ({ route }) => (
      <Stack.Navigator initialRouteName='UserHome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserHome" component={UserHome}  />
      </Stack.Navigator>
    );

    const UserProfileStack = ({ route }) => (
      <Stack.Navigator initialRouteName='UserProfile' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="UserProfile" component={UserProfile} />
        <Stack.Screen name="UserPersonalInfo" component={UserPersonalInfo} />
        <Stack.Screen name="UserCars" component={UserCars} />
        <Stack.Screen name="UserAddCar" component={UserAddCar} />
      </Stack.Navigator>
    );

const BranchTab = () => ( // Branch Sayfaları için Tab Navigator gruplandırması, 3 ana sayfa alt sayfa fonksiyonlarına yönlendiriyor
<Tab.Navigator initialRouteName='BranchHomeStack' screenOptions={{ headerShown: false }}> 
<Tab.Screen name="BranchReservationsStack" component={BranchReservationsStack} options={{ tabBarLabel: 'Rezervasyonlar',tabBarIcon: ({  color, size }) => (<Icon name="book-open-page-variant-outline" color="#4B0812" size={25} /> ) }} />
<Tab.Screen name="BranchHomeStack" component={BranchHomeStack} options={{tabBarLabel: 'Ana Sayfa',tabBarIcon: ({  color, size }) => (<Icon name="home-group" color="#4B0812" size={40} /> )}}/>
<Tab.Screen name="BranchProfileStack" component={BranchProfileStack} options={{ tabBarLabel: 'Profil',tabBarIcon: ({  color, size }) => (<Icon name="office-building-marker" color="#4B0812" size={25} /> ) }}/>
</Tab.Navigator>
);
    //Branch Navigator Alt sayfaları
    const BranchReservationsStack = () => ( 
      <Stack.Navigator initialRouteName='BranchReservations' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BranchReservations" component={BranchReservations} />
      </Stack.Navigator>
    );

    const BranchHomeStack = () => (
      <Stack.Navigator initialRouteName='BranchHome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BranchHome" component={BranchHome} />
      </Stack.Navigator>
    );

    const BranchProfileStack = () => (
      <Stack.Navigator initialRouteName='BranchProfile' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="BranchProfile" component={BranchProfile} />
        <Stack.Screen name="BranchPersonalInfo" component={BranchPersonalInfo} />
      </Stack.Navigator>
    );

const Navigator = () => {
    const { appData } = useAppContext();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Auth' screenOptions={{ headerShown: false }}> 
        <Stack.Screen name="Auth" component={LoginStack} />
        <Stack.Screen name="UserTab" component={UserTab} />
        <Stack.Screen name="BranchTab" component={BranchTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
