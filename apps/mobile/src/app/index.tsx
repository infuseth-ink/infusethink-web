import { FONTS, ONBOARDING_SLIDES } from '@infuseth-ink/shared-ui';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useRef, useState, type ComponentProps } from 'react';
import { Dimensions, FlatList, Image, Pressable, Text, View, ViewToken } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

const BRAND_GOLD = '#e1c154';
const HERO_BG = '#0d1f12';
// portrait-locked (app.json orientation: portrait) — safe as module-level constant
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function OnboardingScreen() {
  const [activeIndex, setActiveIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor: HERO_BG }}>
      <View className="flex-row items-center gap-2.5 px-6 py-3">
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: 36, height: 36, borderRadius: 8 }}
        />
        <Text
          className="text-sm tracking-tight text-white"
          style={{ fontFamily: FONTS.displaySemiBold }}
        >
          infuseth.ink
        </Text>
      </View>

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
            <Ionicons name={item.icon as IoniconsName} size={120} color={BRAND_GOLD} />
            <Text
              className="mt-10 text-center text-2xl text-white"
              style={{ fontFamily: FONTS.display }}
            >
              {item.tagline}
            </Text>
            <Text className="mt-4 text-center text-base leading-relaxed text-white/70">
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
              style={{ backgroundColor: i === activeIndex ? BRAND_GOLD : 'rgba(255,255,255,0.2)' }}
            />
          ))}
        </View>

        <View className="gap-3">
          <Pressable
            className="h-12 flex-row items-center justify-center rounded-full px-7"
            style={{ backgroundColor: BRAND_GOLD }}
            onPress={() => {}} // TODO: navigate to learn sign-up
          >
            <Text className="text-xl font-bold" style={{ color: HERO_BG }}>
              Start learning →
            </Text>
          </Pressable>

          <Pressable
            className="h-12 flex-row items-center justify-center rounded-full border border-white/50 bg-white/10 px-7"
            onPress={() => {}} // TODO: navigate to teach sign-up
          >
            <Text className="text-xl font-semibold text-white">Start teaching</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
