import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts, Poppins_400Regular, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Lobster_400Regular } from '@expo-google-fonts/lobster';

const IntroScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Lobster_400Regular,
    Poppins_400Regular,
    Poppins_700Bold,
  });

  // Animated values for floating effect and rotation
  const floatAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Floating up and down animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: 15, // Move up
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0, // Move back down
          duration: 2000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Smooth rotation animation (optional)
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 6000, // Slow 6-second rotation
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  if (!fontsLoaded) {
    return <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading...</Text>;
  }

  return (
    <LinearGradient colors={['#ff9a9e', '#fad0c4']} style={styles.container}>
      <Text style={styles.title}>Smart Bite</Text>

      {/* Animated Burger */}
      <View style={styles.burgerContainer}>
        <Animated.View
          style={{
            transform: [
              { translateY: floatAnim }, // Floating effect
              {
                rotate: rotateAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '0deg'], // Full rotation
                }),
              },
            ],
          }}
        >
          <Image source={require('../assets/burger_texture.png')} style={styles.image} />
        </Animated.View>

        {/* Dark shadow underneath */}
        <Animated.View style={[styles.shadow, { opacity: floatAnim.interpolate({
          inputRange: [0, 10],
          outputRange: [0.6, 0.2], // Shadow fades as it rises
        }) }]} />
      </View>

      <Text style={styles.subtitle}>Discover your Favorite Food, delivered at your Doorstep</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
      <Text style={styles.buttonText}>GET STARTED &gt;</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 70,
    fontFamily: 'Lobster_400Regular',
    color: '#fff',
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  burgerContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    width: 280,
    height: 280,
    borderRadius: 20,
  },
  shadow: {
    position: 'absolute',
    bottom: -10,
    width: 150,
    height: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1 ,
    shadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    fontFamily: 'Poppins_400Regular',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 30,
    paddingHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },
  button: {
    backgroundColor: 'yellowgreen',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'Poppins_700Bold',
    color: '#fff',
    textTransform: 'uppercase',
  },
});

export default IntroScreen;