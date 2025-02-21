import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, FlatList, TouchableOpacity, Linking } from 'react-native';

const discographyData = [
  { id: '1', title: 'Song 1', platform: 'Spotify', link: 'https://open.spotify.com/track/1' },
  { id: '2', title: 'Song 2', platform: 'Apple Music', link: 'https://music.apple.com/us/album/2' },
  { id: '3', title: 'Song 3', platform: 'YouTube', link: 'https://www.youtube.com/watch?v=3' },
];

const postsData = [
  { id: '1', image: require('../../../assets/images/adaptive-icon.png'), description: 'Post 1 Description' },
  { id: '2', image: require('../../../assets/images/adaptive-icon.png'), description: 'Post 2 Description' },
  { id: '3', image: require('../../../assets/images/adaptive-icon.png'), description: 'Post 3 Description' },
  { id: '4', image: require('../../../assets/images/adaptive-icon.png'), description: 'Post 4 Description' },
];

const eventsData = [
  { id: '1', image: require('../../../assets/images/adaptive-icon.png'), description: 'Event 1: Live Concert at XYZ Venue' },
  { id: '2', image: require('../../../assets/images/adaptive-icon.png'), description: 'Event 2: Virtual Meetup' },
  { id: '3', image: require('../../../assets/images/adaptive-icon.png'), description: 'Event 3: Charity Event Performance' },
  { id: '4', image: require('../../../assets/images/adaptive-icon.png'), description: 'Event 4: Festival Appearance' },
];

const featuredArtistsData = [
  { id: '1', image: require('../../../assets/images/adaptive-icon.png'), description: 'Featured Artist 1: John Doe' },
  { id: '2', image: require('../../../assets/images/adaptive-icon.png'), description: 'Featured Artist 2: Jane Smith' },
  { id: '3', image: require('../../../assets/images/adaptive-icon.png'), description: 'Featured Artist 3: The Rock Band' },
  { id: '4', image: require('../../../assets/images/adaptive-icon.png'), description: 'Featured Artist 4: Indie Singer' },
];

export default function Profile() {
  const params = useLocalSearchParams();
  const userId = params.userId;
  const isOrg = params.isOrg === 'true';

  return (
    <View style={styles.container}>
      <ScrollView style={styles.background}>
        <ImageBackground
          source={require('../../../assets/images/partial-react-logo.png')} // Add your background image
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            {isOrg ? (
              <Text style={styles.artistName}>[Organization]</Text>
            ) : (
              <Text style={styles.artistName}>[Artist]</Text>
            )}
            <Image
              source={require('../../../assets/images/adaptive-icon.png')} // Add your profile image
              style={styles.profileImage}
            />
          </View>
        </ImageBackground>

        {/* About section */}
        <View style={styles.section}>
          <Text style={styles.heading}>About</Text>
          <Text>Hailing from Hyderabad, India, [Band Name] blends classic rock influences with modern indie vibes to create powerful, evocative music. Fueled by [mention lyrical themes], their sound is driven by [mention instruments] and ignites both live stages and recordings.</Text>
        </View>

        {!isOrg ? 
          <>
            <View style={styles.section}>
              <Text style={styles.heading}>Discography</Text>
              <FlatList
                horizontal
                data={discographyData}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity style={styles.carouselItem} onPress={() => Linking.openURL(item.link)}>
                    <Text style={styles.carouselText}>{item.title}</Text>
                    <Text style={styles.carouselPlatform}>{item.platform}</Text>
                  </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Posts</Text>
              <FlatList
                data={postsData}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.postItem}>
                    <Image source={item.image} style={styles.postImage} />
                    <Text style={styles.postDescription}>{item.description}</Text>
                  </View>
                )}
              />
            </View>
          </>
          :
          <>
            <View style={styles.section}>
              <Text style={styles.heading}>Events</Text>
              <FlatList
                data={eventsData}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.postItem}>
                    <Image source={item.image} style={styles.postImage} />
                    <Text style={styles.postDescription}>{item.description}</Text>
                  </View>
                )}
              />
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Featured Artists</Text>
              <FlatList
                data={featuredArtistsData}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.postItem}>
                    <Image source={item.image} style={styles.postImage} />
                    <Text style={styles.postDescription}>{item.description}</Text>
                  </View>
                )}
              />
            </View>
          </>
        }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingBottom: 70
  },
  background: {
    backgroundColor: '#fff',
  },
  backgroundImage: {
    width: '100%',
    height: 200, 
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    justifyContent: 'flex-end',
    padding: 20,
    position: 'relative',
  },
  artistName: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    position: 'absolute',
    bottom: 20,
    left: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    position: 'absolute',
    bottom: -50,
    right: 20,
  },
  section: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  carouselItem: {
    backgroundColor: '#e0e0e0',
    padding: 15,
    marginHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  carouselText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  carouselPlatform: {
    fontSize: 14,
    color: '#666',
  },
  postItem: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  postImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  postDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
});
