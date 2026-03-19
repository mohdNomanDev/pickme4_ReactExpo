import React from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  useSharedValue, 
  withSpring, 
  withTiming,
  FadeIn
} from 'react-native-reanimated';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { toggleLanguageAction } from '../../store/languageSlice';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export const LanguageToggle = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentLanguage } = useSelector((state: RootState) => state.language);
  
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95);
    opacity.value = withTiming(0.8);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
    opacity.value = withTiming(1);
  };

  const isAR = currentLanguage === 'ar';

  return (
    <AnimatedPressable
      onPress={() => dispatch(toggleLanguageAction())}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={animatedStyle}
      className="bg-black/80 dark:bg-white/10 rounded-full px-4 py-2 border border-white/20 backdrop-blur-md flex-row items-center space-x-2"
    >
      <View className="flex-row items-center justify-center">
        <Text className={`text-xs font-bold ${!isAR ? 'text-white' : 'text-white/40'}`}>
          EN
        </Text>
        <View className="w-[1px] h-3 bg-white/20 mx-2" />
        <Text className={`text-xs font-bold ${isAR ? 'text-white' : 'text-white/40'}`}>
          AR
        </Text>
      </View>
      
      {/* Indicator Dot */}
      <Animated.View 
        className="h-1.5 w-1.5 bg-orange-500 rounded-full absolute -top-0.5 -right-0.5"
        entering={FadeIn.duration(400)}
      />
    </AnimatedPressable>
  );
};
