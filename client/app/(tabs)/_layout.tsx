import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

const getUserType = () => {
  return 'org'; 
};

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const tabBarHeight = 65;
  const userType = getUserType();

  return (
    <Tabs
     initialRouteName="feed"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          height: tabBarHeight,
          borderRadius: 50,
          backgroundColor: Colors[colorScheme ?? 'light'].tabBarBackground,
          zIndex: 12,
          elevation: 0, 
          shadowOpacity: 0, 
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="post"
        options={
          userType === 'org' ? {
            tabBarButton: () => null
          } :
          {
          title: 'Post',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'add-circle-outline' : 'add-circle-outline'} color={color} />
          ),
        }
      }
      />
      <Tabs.Screen
        name="events"
        options={
          userType !== 'org' ? {
            tabBarButton: () => null
          } :
          {
          title: 'Events',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'albums-outline' : 'albums-outline'} color={color} />
          ),
        }
      }
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person-circle-outline' : 'person-circle-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
