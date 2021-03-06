import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { Splash } from '../screens/Splash';
import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { CarDetails } from '../screens/CarDetails';
import { Scheduling } from '../screens/Scheduling';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { SchedulingComplete } from '../screens/SchedulingComplete';

const { Navigator, Screen } = createNativeStackNavigator();

declare global {
  namespace ReactNavigation {
    interface RootParamList {
      Splash: string,
      Home: string,
      MyCars: string,
      CarDetails: string,
      Scheduling: string,
      SchedulingDetails: string,
      SchedulingComplete: string,
    }
  }
}

export function StackRoutes(){
  return(
    <Navigator 
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Splash'
    >
      <Screen name='Splash' component={Splash}/>
      <Screen name='Home' options={{gestureEnabled: false}} component={Home}/>
      <Screen name='MyCars' component={MyCars}/>
      <Screen name='CarDetails' component={CarDetails}/>
      <Screen name='Scheduling' component={Scheduling}/>
      <Screen name='SchedulingDetails' component={SchedulingDetails}/>
      <Screen name='SchedulingComplete' component={SchedulingComplete}/>
    </Navigator>
  )
}