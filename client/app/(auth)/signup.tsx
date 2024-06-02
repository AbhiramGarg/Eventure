import { useAuth } from '@/context/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [artistName, setArtistName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('artist'); // Default role is "artist"

  const handleSignup = () => {
    // Implement signup logic here
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Role:', role);
    signIn();
  };

  const { signIn } = useAuth();
  const router = useRouter();

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
  };

  return (
    <ImageBackground source={require('@/assets/images/stars.jpg')} style={styles.backgroundImage}>
      <View style={styles.container}>
        <View style={styles.roleButtons}>
          <TouchableOpacity style={styles.roleButton} onPress={() => handleRoleChange('artist')}>
            <Text style={styles.buttonText}>Artist</Text>
          </TouchableOpacity>
          <View style={{ width: 20 }} />
          <TouchableOpacity style={styles.roleButton} onPress={() => handleRoleChange('event manager')}>
            <Text style={styles.buttonText}>Event Manager</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Signup as {role}</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="white"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="white"
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
        />
        {role === 'artist' && (
          <TextInput
            style={styles.input}
            placeholder="Artist Name"
            placeholderTextColor="white"
            value={artistName}
            onChangeText={text => setArtistName(text)}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.replace("/(auth)/login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    marginTop: '40%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  roleButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleButton: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'white', // Title color
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'white', // Border bottom color
    color: 'white', // Input text color
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 10,
    width: '100%',
  },
  button: {
    backgroundColor: 'transparent',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  link: {
    marginTop: 10,
    color: 'white', // Link color
    textDecorationLine: 'underline',
  },
});
