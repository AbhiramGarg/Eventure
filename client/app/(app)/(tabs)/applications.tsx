import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, LayoutAnimation, UIManager, Platform, Button, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const eventsData = [
  { id: 1, name: 'Event 1', venue: 'Venue 1', time: 'Time 1', organizer: 'Organizer 1', description: 'Description 1', requirements: 'Progressive rock band', artist: 'Artist 1', image: require('../../../assets/images/event1.jpg') },
  { id: 2, name: 'Event 2', venue: 'Venue 2', time: 'Time 2', organizer: 'Organizer 2', description: 'Description 1', requirements: 'Classical singer', artist: 'Artist 2', image: require('../../../assets/images/event2.jpg') },
  { id: 3, name: 'Event 3', venue: 'Venue 3', time: 'Time 3', organizer: 'Organizer 3', description: 'Description 1', requirements: 'Pianist', artist: 'Artist 1',image: require('../../../assets/images/event3.jpg') },
  { id: 4, name: 'Event 4', venue: 'Venue 4', time: 'Time 4', organizer: 'Organizer 4', description: 'Description 1', requirements: 'requirements', artist: 'Artist 1', image: require('../../../assets/images/event1.jpg') },
 
];

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const getUserType = () => {
  return 'artist';
};

export default function Feed() {
  const [expandedEventId, setExpandedEventId] = useState(null);
  const userType = getUserType();

  const toggleExpand = (eventId: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  return (
    <ImageBackground source={require('../../../assets/images/stars.jpg')} style={styles.background}>
      <ScrollView style={styles.container}>
        <Text style={styles.heading}>My Events</Text>
        {eventsData.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() => toggleExpand(event.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.event, expandedEventId === event.id && styles.expandedEvent]}>
              <ImageBackground source={event.image} style={styles.imageBackground}>
                <View style={styles.overlay}>
                  <Text style={styles.eventName}>{event.name}</Text>
                </View>
              </ImageBackground>
              <View style={styles.eventDetails}>
                <View style={styles.eventRow}>
                  <Icon name="place" size={20} color="#000" />
                  <Text style={styles.eventVenue}>{event.venue}</Text>
                </View>
                <View style={styles.eventRow}>
                  <Icon name="schedule" size={20} color="#000" />
                  <Text style={styles.eventTime}>{event.time}</Text>
                </View>
                <View style={styles.eventRow}>
                  <Icon name="person" size={20} color="#000" />
                  <Text style={styles.eventOrganizer}>{event.organizer}</Text>
                </View>
                {event.artist && (
                  <View style={styles.eventRow}>
                    <Icon name="mic" size={20} color="#000" />
                    <Text style={styles.eventOrganizer}>{event.artist}</Text>
                  </View>
                )}
              </View>
              {expandedEventId === event.id && (
                <View style={styles.expandedContent}>
                  <Text style={styles.eventHeading}>Description</Text>
                  <Text style={styles.eventDescription}>{event.description}</Text>
                  <Text style={styles.eventHeading}>Requirements</Text>
                  <Text style={styles.eventDescription}>{event.requirements}</Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 75,
  },
  heading: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  eventContainer: {
    flex: 1,
    marginBottom: 20,
  },
  event: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)', 
    width: '100%',
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderColor: 'white', 
        borderWidth: 2, 
  },
  expandedEvent: {
    height: 'auto',
    borderColor: '#00FFFF',
    borderWidth: 2, 
  },
  imageBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  eventDetails: {
    padding: 20,
  },
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventVenue: {
    fontSize: 16,
    marginLeft: 5,
    color: 'black',
  },
  eventTime: {
    fontSize: 16,
    marginLeft: 5,
    color: 'black',
  },
  eventOrganizer: {
    fontSize: 16,
    marginLeft: 5,
    color: 'black',
  },
  expandedContent: {
    padding: 20,
  },
  eventHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
  eventDescription: {
    fontSize: 16,
    marginTop: 10,
    color: 'black',
  },
  applyButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 10,
  },
  applyButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
