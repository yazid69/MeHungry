import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import * as SecureStore from 'expo-secure-store';
import { useNavigation } from '@react-navigation/native';

import { LOGIN_MUTATION } from '../lib/gql/index';
import { TOKEN_KEY } from '../lib/constants/index';
import { useUserStore } from '../lib/store/user';

export function Login() { 
	const [login] = useMutation(LOGIN_MUTATION); // useMutation est une fonction qui permet de faire des requêtes GraphQL
	const navigation = useNavigation(); //useNavigation est une fonction qui permet de naviguer entre les pages
	const { setConnected } = useUserStore(); // useUserStore est une fonction qui permet de stocker les données de l'utilisateur

	const [form, setForm] = useState({ 
		identifier: '',
		password: '',
	});

	function onChangeText(name, value) { // onChangeText est une fonction qui permet de modifier les données de l'utilisateur
		setForm({
			...form,
			[name]: value,
		});
	}

	async function handleSubmit() { // handleSubmit est une fonction qui permet de valider les données de l'utilisateur
		const res = await login({ // res est une variable qui permet de stocker les données de l'utilisateur
			variables: {
				input: {
					identifier: form.identifier,
					password: form.password,
				},
			},
		});

		// SecureStore est une fonction qui permet de stocker les données de l'utilisateur de manière sécurisée sur le téléphone de l'utilisateur
		await SecureStore.setItemAsync(TOKEN_KEY, res.data.login.jwt); 
		setConnected(true); // setConnected est une fonction qui permet de connecter l'utilisateur
	}

	return ( // return est une fonction qui permet de retourner les données de l'utilisateur
		<View>
			<Text>Login</Text>
			<View>
				<TextInput
					style={styles.input}
					onChangeText={(value) => onChangeText('identifier', value)} 
					value={form.identifier}
				/>
				<TextInput
					style={styles.input}
					onChangeText={(value) => onChangeText('password', value)}
					value={form.password}
				/>

				<Button title="S'identifier" color="#f194ff" onPress={handleSubmit} />
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