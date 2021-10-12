import React, { useEffect, useState } from 'react';
import { BackHandler, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { PanGestureHandler } from 'react-native-gesture-handler';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler, 
  withSpring,
} from 'react-native-reanimated';


import Logo from '../../assets/logo.svg';
import api from '../../services/api';
import { CarDTO } from '../../dtos/carDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
 MyCarsButton
} from './styles';

const ButtonAnimated = Animated.createAnimatedComponent(MyCarsButton);

export function Home(){
  const [cars, setCars] = useState<CarDTO[]>([]);
  const [loading, setLoading] = useState(true);

  const positionY = useSharedValue(0);
  const positionX = useSharedValue(0);

  const myCarsButtonStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: positionX.value },
        { translateY: positionY.value }
      ]
    }
  });

  const onGestureEvent = useAnimatedGestureHandler({
    onStart(_, ctx: any){
      ctx.positionX = positionX.value;
      ctx.positionY = positionY.value;
    },
    onActive(event, ctx: any){
      positionX.value = ctx.positionX + event.translationX;
      positionY.value = ctx.positionY + event.translationY;
    },
    onEnd(){
      // positionX.value = withSpring(0);
      // positionY.value = withSpring(0);
    }
  });

  const navegation = useNavigation();
  const theme = useTheme();

  function handleCarDetails(car: CarDTO) {
    navegation.navigate('CarDetails', { car });
  }

  function handleOpenMyCar() {
    navegation.navigate('MyCars', '');
  }

  useEffect(() => {
    async function fetchCars() {
      try {
        const response = await api.get('/cars');

        setCars(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  },[]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true
    })
  },[])

  return (
    <Container>
      <StatusBar 
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Header>
        <HeaderContent>
          <Logo
            width={RFValue(108)}
            height={RFValue(12)}
          />
          {
            !loading &&
            <TotalCars>
              Total 12 carros
            </TotalCars>
          }

        </HeaderContent>
      </Header>
      { loading ? <Load/> :
        <CarList
          data={cars}
          keyExtractor={item => item.id}
          renderItem={({item}) =>  <Car data={item} onPress={() => handleCarDetails(item)}/> }
        />
      }

      <PanGestureHandler onGestureEvent={onGestureEvent}>
        <Animated.View
          style={[
            myCarsButtonStyle,
            {          
              position: 'absolute',
              bottom: 13,
              right: 22
            }
          ]}
        >
          <ButtonAnimated onPress={handleOpenMyCar}>
            <Ionicons size={32} name='ios-car-sport' color={theme.colors.shape}/>
          </ButtonAnimated>
        </Animated.View>
      </PanGestureHandler>
    </Container>
  );
}