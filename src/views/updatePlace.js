import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { UPDATE_PLACE_MUTATION } from '../lib/gql/index';

export default function updatePlace() { 
  const [id, setId] = useState(''); // useState est une fonction qui permet de modifier les données de l'utilisateur 
  const [title, setTitle] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [updatePlace, { loading, error }] = useMutation( // Voir Login 
    UPDATE_PLACE_MUTATION, 
    {
      onCompleted: () => { // onCompleted est une fonction qui permet d4afficher un message de confirmation
        // Reset form
        setId(''); // setId permet de mettre l'id à vide
        setTitle('');
        setAddress('');
        setLatitude('');
        setLongitude('');
        alert('Place updated successfully!'); // met une alerte lorsque l'utilisateur a bien modifié un lieu
      },
      onError: (error) => { // onError est une fonction qui permet d'afficher un message d'erreur
        console.error(error);
      },
    }
  );

  const handleSubmit = () => {
    updatePlace({
      variables: {
        id,
        input: {
          title,
          address,
          latitude: parseFloat(latitude), // parseFloat permet de convertir une chaîne de caractères en nombre décimal
          longitude: parseFloat(longitude),
        },
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update a Place</Text>
      <TextInput
        style={styles.input}
        placeholder="Place ID"
        onChangeText={setId}
        value={id}
      />
      <TextInput
        style={styles.input}
        placeholder="Title"
        onChangeText={setTitle}
        value={title}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        onChangeText={setAddress}
        value={address}
      />
      <TextInput
        style={styles.input}
        placeholder="Latitude"
        onChangeText={setLatitude}
        value={latitude}
      />
      <TextInput
        style={styles.input}
        placeholder="Longitude"
        onChangeText={setLongitude}
        value={longitude}
      />
      <Button title="Submit" onPress={handleSubmit} />
      {loading && <Text>Loading...</Text>}
      {error && <Text>Error: {error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});