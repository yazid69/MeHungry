import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useQuery } from '@apollo/client';
import { GET_PLACES_QUERY } from '../lib/gql/index';

export function getPlace() {
  const { loading, error, data } = useQuery(GET_PLACES_QUERY, {
    context: {
      headers: { // Ajouter le token d'authentification
		"authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTUsImlhdCI6MTY3ODk2MTcyMSwiZXhwIjoxNjgxNTUzNzIxfQ.Ghf4YlTUmrKxAmumakI-6rPC4jM_7s-ujJGUvbZ5umc"
	},
    },
  });

  if (loading) {
    return <View><Text>Loading...</Text></View>;
  }

  if (error) {
    return <View><Text>Error: {error.message}</Text></View>;
  }

  if (!data || !data.places || !data.places.data || !data.places.data.length) {
    return <View><Text>No data found</Text></View>;
  }

  const places = data.places.data;

  // Afficher la liste de lieux
  return (
    <View>
      {places.map(place => (
        <View key={place.id}>
          <Text>Title: {place.attributes.title}</Text>
          <Text>Address: {place.attributes.address}</Text>
          <Text>Latitude: {place.attributes.latitude}</Text>
          <Text>Longitude: {place.attributes.longitude}</Text>
        </View>
      ))}
    </View>
  );
}
export default getPlace;


