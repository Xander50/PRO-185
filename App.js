import React from 'react' 
import Main from "./screens/Main"
import Home from "./screens/Home"
import {NavigationContainer} from "@react-navigation/native"
import {createStackNavigator} from "@react-navigation/stack"

const Stack=createStackNavigator();
function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{
        headerShown:false
      }}>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Main" component={Main}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
