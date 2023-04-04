import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { CREATE_PLACE_MUTATION } from '../lib/gql/index';
export { createPlace }; // export de la fonction createPlace pour pouvoir l'utiliser dans App.js et dans
// le fichier getPlace.js pour afficher les lieux créés par l'utilisateur connecté
// Il est utilisé ici puisque si je ne le met pas il m'affiche une erreur, le default n'y est pour rien.


export default function createPlace() {
  const [title, setTitle] = useState(''); //useState sert à Le React useState Hook vous permet d'avoir des variables d'état dans les
  // composants fonctionnels. Vous passez l'état initial à cette fonction, et elle renvoie une variable avec la valeur 
  //de l'état actuel (pas nécessairement l'état initial) et une autre fonction pour mettre à jour cette valeur .
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  const [createPlace, { loading, error }] = useMutation(CREATE_PLACE_MUTATION, {
    onCompleted: () => {
      // Reset form
      setTitle('');
      setAddress('');
      setLatitude('');
      setLongitude('');
      alert('Place created successfully!');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    createPlace({
      variables: {
        input: {
          title,
          address,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
          publishedAt: new Date(),
        },
      },
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a Place</Text>
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

