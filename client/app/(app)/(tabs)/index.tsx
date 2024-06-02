import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, LayoutAnimation, UIManager, Platform, Button, Image } from 'react-native';

const eventsData = [
  { id: 1, name: 'Event 1', venue: 'Venue 1', time: 'Time 1', organizer: 'Organizer 1', description: 'Description 1', requirements: 'Progressive rock band' },
  { id: 2, name: 'Event 2', venue: 'Venue 2', time: 'Time 2', organizer: 'Organizer 2', description: 'Description 1', requirements: 'Classical singer' },
  { id: 3, name: 'Event 3', venue: 'Venue 3', time: 'Time 3', organizer: 'Organizer 3', description: 'Description 1', requirements: 'Pianist' },
  { id: 4, name: 'Event 4', venue: 'Venue 4', time: 'Time 4', organizer: 'Organizer 4', description: 'Description 1', requirements: 'requirements' },
  { id: 5, name: 'Event 5', venue: 'Venue 5', time: 'Time 5', organizer: 'Organizer 5', description: 'Description 1', requirements: 'requirements' },
  { id: 6, name: 'Event 6', venue: 'Venue 6', time: 'Time 6', organizer: 'Organizer 6', description: 'Description 1', requirements: 'requirements' },
  { id: 7, name: 'Event 7', venue: 'Venue 7', time: 'Time 7', organizer: 'Organizer 7', description: 'Description 1', requirements: 'requirements' },
  { id: 8, name: 'Event 8', venue: 'Venue 8', time: 'Time 8', organizer: 'Organizer 8', description: 'Description 1', requirements: 'requirements' },
];

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const getUserType = () => {
  return 'org'; 
};

export default function Feed() {
  const [expandedEventId, setExpandedEventId] = useState(null);
  const userType = getUserType();

  const toggleExpand = (eventId: any) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpandedEventId(expandedEventId === eventId ? null : eventId);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upcoming Events</Text>
      <ScrollView style={styles.eventContainer}>
        {eventsData.map((event) => (
          <TouchableOpacity
            key={event.id}
            onPress={() => toggleExpand(event.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.event, expandedEventId === event.id && styles.expandedEvent]}>
              <View style={styles.eventHeader}>
                <View>
                  <Text style={styles.eventName}>{event.name}</Text>
                  <Text style={styles.eventVenue}>{event.venue}</Text>
                  <Text style={styles.eventTime}>{event.time}</Text>
                  <Text style={styles.eventOrganizer}>{event.organizer}</Text>
                </View>
                <View style={styles.eventRight}>
                  {userType === 'org' ? (
                    <Image source={require('../../../assets/images/adaptive-icon.png')} style={{ width: 70, height: 70 }} />
                  ) : (
                    <Button title="Apply" onPress={() => alert('Apply clicked!')} />
                  )}
                </View>
              </View>
              {expandedEventId === event.id && (
                <View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 75,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  eventContainer: {
    flex: 1,
    marginBottom: 20,
  },
  event: {
    backgroundColor: '#e0e0e0',
    width: '100%',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  expandedEvent: {
    height: 'auto',
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  eventRight: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  eventVenue: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventTime: {
    fontSize: 16,
    marginBottom: 5,
  },
  eventOrganizer: {
    fontSize: 16,
  },
  organizer: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  eventHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 10,
  },
  eventDescription: {
    fontSize: 16,
    marginTop: 10,
  },
});
