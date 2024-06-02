import { useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ImageBackground, Image, TextInput, Button, FlatList } from 'react-native';

const initialDiscography = [
  { id: '1', title: 'Song 1', platform: 'Spotify', link: 'https://open.spotify.com/track/1' },
  { id: '2', title: 'Song 2', platform: 'Apple Music', link: 'https://music.apple.com/us/album/2' },
  { id: '3', title: 'Song 3', platform: 'YouTube', link: 'https://www.youtube.com/watch?v=3' },
];

const initialPosts = [
  { id: '1', image: require('../../../assets/images/adaptive-icon.png'), description: 'Post 1 Description' },
  { id: '2', image: require('../../../assets/images/adaptive-icon.png'), description: 'Post 2 Description' },
  { id: '3', image: require('../../../assets/images/adaptive-icon.png'), description: 'Post 3 Description' },
  { id: '4', image: require('../../../assets/images/adaptive-icon.png'), description: 'Post 4 Description' },
];

const initialEvents = [
  { id: '1', image: require('../../../assets/images/adaptive-icon.png'), description: 'Event 1: Live Concert at XYZ Venue' },
  { id: '2', image: require('../../../assets/images/adaptive-icon.png'), description: 'Event 2: Virtual Meetup' },
  { id: '3', image: require('../../../assets/images/adaptive-icon.png'), description: 'Event 3: Charity Event Performance' },
  { id: '4', image: require('../../../assets/images/adaptive-icon.png'), description: 'Event 4: Festival Appearance' },
];

const initialFeaturedArtists = [
  { id: '1', image: require('../../../assets/images/adaptive-icon.png'), description: 'Featured Artist 1: John Doe' },
  { id: '2', image: require('../../../assets/images/adaptive-icon.png'), description: 'Featured Artist 2: Jane Smith' },
  { id: '3', image: require('../../../assets/images/adaptive-icon.png'), description: 'Featured Artist 3: The Rock Band' },
  { id: '4', image: require('../../../assets/images/adaptive-icon.png'), description: 'Featured Artist 4: Indie Singer' },
];

export default function EditProfile() {
  const params = useLocalSearchParams();
  const userId = params.userId;
  const isOrg = params.isOrg === 'true';

  const [name, setName] = useState(isOrg ? '[Organization]' : '[Artist]');
  const [about, setAbout] = useState('Hailing from Hyderabad, India, [Band Name] blends classic rock influences with modern indie vibes to create powerful, evocative music. Fueled by [mention lyrical themes], their sound is driven by [mention instruments] and ignites both live stages and recordings.');

  const [discography, setDiscography] = useState(initialDiscography);
  const [newSongTitle, setNewSongTitle] = useState('');
  const [newSongPlatform, setNewSongPlatform] = useState('');
  const [newSongLink, setNewSongLink] = useState('');

  const [posts, setPosts] = useState(initialPosts);
  const [newPostDescription, setNewPostDescription] = useState('');

  const [events, setEvents] = useState(initialEvents);
  const [newEventDescription, setNewEventDescription] = useState('');

  const [featuredArtists, setFeaturedArtists] = useState(initialFeaturedArtists);
  const [newArtistDescription, setNewArtistDescription] = useState('');

  const handleSave = () => {
    // Handle save logic here
    console.log('Profile saved!', { name, about, discography, posts, events, featuredArtists });
  };

  const handleAddSong = () => {
    const newSong = {
      id: (discography.length + 1).toString(),
      title: newSongTitle,
      platform: newSongPlatform,
      link: newSongLink,
    };
    setDiscography([...discography, newSong]);
    setNewSongTitle('');
    setNewSongPlatform('');
    setNewSongLink('');
  };

  const handleAddPost = () => {
    const newPost = {
      id: (posts.length + 1).toString(),
      image: require('../../../assets/images/adaptive-icon.png'),
      description: newPostDescription,
    };
    setPosts([...posts, newPost]);
    setNewPostDescription('');
  };

  const handleAddEvent = () => {
    const newEvent = {
      id: (events.length + 1).toString(),
      image: require('../../../assets/images/adaptive-icon.png'),
      description: newEventDescription,
    };
    setEvents([...events, newEvent]);
    setNewEventDescription('');
  };

  const handleAddArtist = () => {
    const newArtist = {
      id: (featuredArtists.length + 1).toString(),
      image: require('../../../assets/images/adaptive-icon.png'),
      description: newArtistDescription,
    };
    setFeaturedArtists([...featuredArtists, newArtist]);
    setNewArtistDescription('');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.background}>
        <ImageBackground
          source={require('../../../assets/images/partial-react-logo.png')} // Add your background image
          style={styles.backgroundImage}
        >
          <View style={styles.overlay}>
            <TextInput
              style={styles.artistName}
              value={name}
              onChangeText={setName}
            />
            <Image
              source={require('../../../assets/images/adaptive-icon.png')} // Add your profile image
              style={styles.profileImage}
            />
          </View>
        </ImageBackground>

        {/* About section */}
        <View style={styles.section}>
          <Text style={styles.heading}>About</Text>
          <TextInput
            style={styles.textArea}
            value={about}
            onChangeText={setAbout}
            multiline
          />
        </View>

        {!isOrg ? 
          <>
            <View style={styles.section}>
              <Text style={styles.heading}>Discography</Text>
              <FlatList
                data={discography}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View style={styles.item}>
                    <Text style={styles.itemText}>{item.title} ({item.platform})</Text>
                  </View>
                )}
              />
              <TextInput
                placeholder="Song Title"
                value={newSongTitle}
                onChangeText={setNewSongTitle}
                style={styles.input}
              />
              <TextInput
                placeholder="Platform"
                value={newSongPlatform}
                onChangeText={setNewSongPlatform}
                style={styles.input}
              />
              <TextInput
                placeholder="Link"
                value={newSongLink}
                onChangeText={setNewSongLink}
                style={styles.input}
              />
              <Button title="Add Song" onPress={handleAddSong} />
            </View>

            <View style={styles.section}>
              <Text style={styles.heading}>Posts</Text>
              <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.postItem}>
                    <Image source={item.image} style={styles.postImage} />
                    <Text style={styles.postDescription}>{item.description}</Text>
                  </View>
                )}
              />
              <TextInput
                placeholder="Post Description"
                value={newPostDescription}
                onChangeText={setNewPostDescription}
                style={styles.input}
              />
              <Button title="Add Post" onPress={handleAddPost} />
            </View>
          </>
          :
          <>
            <View style={styles.section}>
              <Text style={styles.heading}>Events</Text>
              <FlatList
                data={events}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.postItem}>
                    <Image source={item.image} style={styles.postImage} />
                    <Text style={styles.postDescription}>{item.description}</Text>
                  </View>
                )}
              />
              <TextInput
                placeholder="Event Description"
                value={newEventDescription}
                onChangeText={setNewEventDescription}
                style={styles.input}
              />
              <Button title="Add Event" onPress={handleAddEvent} />
            </View>
            <View style={styles.section}>
              <Text style={styles.heading}>Featured Artists</Text>
              <FlatList
                data={featuredArtists}
                keyExtractor={(item) => item.id}
                numColumns={2}
                renderItem={({ item }) => (
                  <View style={styles.postItem}>
                    <Image source={item.image} style={styles.postImage} />
                    <Text style={styles.postDescription}>{item.description}</Text>
                  </View>
                )}
              />
              <TextInput
                placeholder="Artist Description"
                value={newArtistDescription}
                onChangeText={setNewArtistDescription}
                style={styles.input}
              />
              <Button title="Add Artist" onPress={handleAddArtist} />
            </View>
          </>
        }

        <View style={styles.section}>
          <Button title="Save" onPress={handleSave} />
        </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingHorizontal: 5,
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
  textArea: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    textAlignVertical: 'top',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
  },
  postItem: {
    flex: 1,
    margin: 10,
    alignItems: 'center',
  },
  postImage: {
    width: 100,
    height: 100,
    marginBottom: 5,
  },
  postDescription: {
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});
