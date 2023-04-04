import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useMutation } from '@apollo/client';
import { DELETE_PLACE_MUTATION } from '../lib/gql/index';
export { deletePlace };

export default function deletePlace() {
  const [placeId, setPlaceId] = useState('');

  const [deletePlace, { loading, error }] = useMutation(DELETE_PLACE_MUTATION, { // Voir Login
    onCompleted: () => {
      // Reset form
      setPlaceId('');
      alert('Place deleted successfully!');
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleSubmit = () => {
    deletePlace({
      variables: {
        id: placeId,
      },
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Delete a Place</Text>
      <TextInput
        style={styles.input}
        placeholder="Place ID"
        onChangeText={setPlaceId}
        value={placeId}
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