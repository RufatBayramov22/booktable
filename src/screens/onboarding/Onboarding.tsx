import React, { useRef, useState } from 'react';
import { View, FlatList, Dimensions, Animated, ViewToken } from 'react-native';

import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const { width } = Dimensions.get('window');

const Onboarding: React.FC = () => {
  const stepComponents = [Step1, Step2, Step3];
  const totalSteps = stepComponents.length;

  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef<FlatList<any>>(null);
  const [currentStep, setCurrentStep] = useState(0);

  const onViewableItemsChanged = useRef(
    (info: { viewableItems: Array<ViewToken>; changed: Array<ViewToken> }) => {
      if (
        info.viewableItems.length > 0 &&
        info.viewableItems[0].index !== null &&
        info.viewableItems[0].index !== undefined
      ) {
        setCurrentStep(info.viewableItems[0].index);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  const goNext = () => {
    if (currentStep < totalSteps - 1) {
      flatListRef.current?.scrollToIndex({ index: currentStep + 1 });
    }
  };

  const goToLastStep = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToIndex({ index: totalSteps - 1 });
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <Animated.FlatList
        ref={flatListRef}
        data={stepComponents}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef.current}
        renderItem={({ item: StepComponent, index }) => (
          <View style={{ width, flex: 1 }}>
            <StepComponent
              onContinue={goNext}
              onSkip={goToLastStep}
              currentStep={index + 1}
              totalSteps={totalSteps}
              scrollX={scrollX}
              stepsCount={totalSteps}
            />
          </View>
        )}
      />
    </View>
  );
};

export default Onboarding;
