import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, Image, Button, Animated, Easing, useColorScheme, ImageSourcePropType } from 'react-native';
import DiceOne from "../../assets/images/One.png";
import DiceTwo from "../../assets/images/Two.png";
import DiceThree from "../../assets/images/Three.png";
import DiceFour from "../../assets/images/Four.png";
import DiceFive from "../../assets/images/Five.png";
import DiceSix from "../../assets/images/Six.png";

type DiceProps = {
  imageUrl: ImageSourcePropType,
  animatedStyle: any
}

const Dice = ({ imageUrl, animatedStyle }: DiceProps): JSX.Element => {
  return (
    <Animated.View style={[styles.imgContainer, animatedStyle]}>
      <Image source={imageUrl} style={styles.image} />
    </Animated.View>
  );
}

export default function HomePage(): JSX.Element {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const [diceImg, setDiceImg] = useState<ImageSourcePropType>(DiceOne);
  const rotation = useRef(new Animated.Value(0)).current;

  const handleOnPress = () => {
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    switch (randomNumber) {
      case 1: setDiceImg(DiceOne); break;
      case 2: setDiceImg(DiceTwo); break;
      case 3: setDiceImg(DiceThree); break;
      case 4: setDiceImg(DiceFour); break;
      case 5: setDiceImg(DiceFive); break;
      case 6: setDiceImg(DiceSix); break;
    }

    Animated.timing(rotation, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      rotation.setValue(0); // Reset the rotation value
    });
  }

  const rotateY = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const animatedStyle = {
    transform: [{ rotateY }],
  };

  return (
    <View style={[styles.container, isDarkMode ? styles.darkMode : styles.lightMode]}>
      <Dice imageUrl={diceImg} animatedStyle={animatedStyle} />
      <Text style={[styles.text, isDarkMode ? styles.darkText : styles.lightText]}>
        Click to roll the dice!
      </Text>
      <Button title="Roll Dice" onPress={handleOnPress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
  },
  imgContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 22,
    width: "100%",
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  darkMode: {
    backgroundColor: '#121212',
  },
  lightMode: {
    backgroundColor: '#ffffff',
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
});
