import { Button, ButtonText, ONBOARDING_SLIDES } from '@infuseth-ink/shared-ui';
import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Text, View, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BRAND_GOLD = '#e1c154';
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0 && viewableItems[0].index != null) {
      setActiveIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <SafeAreaView className="flex-1 bg-white">
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.tagline}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        renderItem={({ item }) => (
          <View style={{ width: SCREEN_WIDTH }} className="flex-1 items-center justify-center px-8">
            <Ionicons name={item.icon as any} size={120} color={BRAND_GOLD} />
            <Text className="mt-10 text-center text-2xl font-bold text-gray-900">
              {item.tagline}
            </Text>
            <Text className="mt-4 text-center text-base leading-relaxed text-gray-500">
              {item.description}
            </Text>
          </View>
        )}
      />

      <View className="px-8 pb-8">
        <View className="mb-6 flex-row justify-center gap-2">
          {ONBOARDING_SLIDES.map((_, i) => (
            <View
              key={i}
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: i === activeIndex ? BRAND_GOLD : '#d1d5db' }}
            />
          ))}
        </View>

        <Button className="rounded-full" onPress={() => {}}>
          <ButtonText>Get started →</ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}
