import React from 'react';
import 'react-native-gesture-handler'
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { EditWrap } from './screen/Edit';
import { Home } from './screen/Home';
import { Button } from 'react-native';

const Stack = createStackNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={'Home'}>
        <Stack.Screen name={'Home'} component={Home} />
        <Stack.Screen name={'Edit'} component={EditWrap} options={({ navigation, route }) => ({
          headerRight: () => {
            let editing = route.params.editing
            return (
              <Button
                title={editing ? 'Cancel' : 'Edit'}
                color="black"
                onPress={() => navigation.setParams({ editing: !editing })}
              />
            )
          }
        })
        } />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
