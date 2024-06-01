import { Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/gojowp.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Yo whats good!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.subtitleContainer} type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText style={styles.paratext}>
          Edit <ThemedText style={styles.paratext} type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText style={styles.paratext} type="defaultSemiBold">
            {Platform.select({ ios: 'cmd + d', android: 'cmd + m' })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.subtitleContainer} type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText style={styles.paratext}>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText style={styles.subtitleContainer} type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText style={styles.paratext} >
          When you're ready, run{' '}
          <ThemedText style={styles.paratext} type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText style={styles.paratext} type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText style={styles.paratext} type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText style={styles.paratext} type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 258,
    width: 390,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  subtitleContainer:{
    color:'#1eb4eb'
  },
  paratext:{
    color:'#96c5d6'
  }
});
