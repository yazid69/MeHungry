import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import { REGISTER_MUTATION } from '../lib/gql/index';
import { useUserStore } from '../lib/store/user';

export function Register() { 
	const [register] = useMutation(REGISTER_MUTATION); // useMutation est une fonction qui permet de faire des requêtes GraphQL
	const navigation = useNavigation();
	const { setConnected } = useUserStore();

	const [form, setForm] = useState({

		username: '',
    email: '',
		password: '',
	});

	function onChangeText(name, value) { // onChangeText est une fonction qui permet de modifier les données de l'utilisateur
		setForm({
			...form,
			[name]: value,
		});
	}

	async function handleSubmit() {
		const res = await register({
			variables: {
				input: {
					username: form.username,
          email: form.email,
					password: form.password,
				},
			},
		});

		await SecureStore.setItemAsync(res.data.register.jwt);
		setConnected(false);
	}

	return (
		<View>
			<Text>Register</Text>
			<View>
      <TextInput
					style={styles.input}
					onChangeText={(value) => onChangeText('username', value)}
					value={form.username}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => onChangeText('email', value)}
					value={form.email}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => onChangeText('password', value)}
					value={form.password}
				/>

				<Button title="S'enregistrer" color="#f194ff" onPress={handleSubmit} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});







/*import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Form, FormItem } from 'react-native-form-component'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import { TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';


export function Register() {
  const navigation = useNavigation();

  const[form, setForm] = React.useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  function onChangeText(property, value) {
    setForm({...form, [property]: value})
  }
  

const client = new ApolloClient({
  uri: 'https://digitalcampus.nerdy-bear.com/graphql',
  cache: new InMemoryCache(),
});

// const client = ...

client
  .query({
    query: gql`
      query GetLocations {
        locations {
          id
          name
          description
          photo
        }
      }
    `,
  })
  .then((result) => console.log(result));

  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Register</Text>
            <View style={styles.content}>
                <TextInput style={styles.input} onChangeText={(value) => onChangeText('nom', value)} value={form.nom} placeholder="nom" />
                <TextInput style={styles.input} onChangeText={(value) => onChangeText('prenom', value)} value={form.prenom} placeholder="prénom" />
                <TextInput style={styles.input} onChangeText={(value) => onChangeText('email', value)} value={form.email} placeholder="email" />
                <TextInput style={styles.input} onChangeText={(value) => onChangeText('password', value)} value={form.password} placeholder="password" />
                <TextInput style={styles.input} onChangeText={(value) => onChangeText('passwordConfirm', value)} value={form.passwordConfirm} placeholder="passwordConfirm" />
                <Button title="submit" />
    </View>
    </View>
    )}


    const styles = StyleSheet.create({
      container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 32,
      },
      input: {
        width: '80%',
        height: 40,
        padding: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 16,
      },
      button: {
        backgroundColor: '#4285F4',
        width: '80%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        marginBottom: 16,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
      },
      register: {
        color: '#4285F4',
        fontSize: 16,
      },
    });*/







/*// Initialize Apollo client
const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_API_URL',
  cache: new InMemoryCache(),
});

// Register user function
const userRegister = async (name, email, password) => {
  try {
    const mutation = gql`
      mutation {
        createUser(name: "${name}", email: "${email}", password: "${password}") {
          id
          name
          email
        }
      }
    `;
    const response = await client.mutate({ mutation });
    console.log('User registered successfully!', response.data.createUser);
    // Add code to redirect user or show confirmation message
  } catch (error) {
    console.error('Error registering user:', error);
    // Add code to display error message to user
  }
};*/