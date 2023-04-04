import { useState, useEffect } from 'react';
import { Login } from './src/views/Login';
import { Home } from './src/views/Home';
import { StyleSheet, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import * as SecureStore from 'expo-secure-store';
import { TOKEN_KEY } from './src/lib/constants/index';
import { useUserStore } from './src/lib/store/user';
import { Register } from './src/views/Register';
import { getPlace } from './src/views/getPlace';
import { createPlace } from './src/views/createPlace';
import { deletePlace } from './src/views/deletePlace';
import updatePlace from './src/views/updatePlace';

const httpLink = createHttpLink({
	uri: 'https://digitalcampus.nerdy-bear.com/graphql',
});

const authLink = setContext(async (_, { headers }) => { //met à jour le contexte avec le token
	const token = await SecureStore.getItemAsync(TOKEN_KEY); // récupère le token dans le SecureStore
	// return the headers to the context so httpLink can read them
	return {
		headers: { // ajoute le token dans le header
			...headers,
			authorization: token ? `Bearer ${token}` : '', // si le token existe, on l'ajoute dans le header
		},
	};
});

const client = new ApolloClient({ // création du client
	link: authLink.concat(httpLink), // concaténation des liens
	cache: new InMemoryCache(), // création du cache
});

const Stack = createNativeStackNavigator(); // création du stack navigator

const Loader = () => <Text>Loading...</Text>; // écran de chargement

function App() {
	const [connected, setConnected] = useState(undefined); // état de connexion
	const { connected: connectedStore } = useUserStore();// récupère l'état de connexion depuis le store

	useEffect(() => { // vérifie si le token existe
		async function checkToken() { // fonction asynchrone pour récupérer le token dans le SecureStore et vérifier s'il existe
			const token = await SecureStore.getItemAsync(TOKEN_KEY);	// récupère le token dans le SecureStore
			if (!token) return setConnected(false);// si le token n'existe pas, on retourne false

			return setConnected(true); // si le token existe, on retourne true
		}

		checkToken();
	}, [connectedStore]);

	return ( // affiche les écrans en fonction de l'état de connexion 
		<ApolloProvider client={client}> 
			<NavigationContainer>
				<Stack.Navigator> 
					{connected === undefined && <Stack.Screen name="Loader" component={Loader} />}
					{connected && (
						<><Stack.Screen name="Home" component={Home} /></> // si l'état de connexion est true, on affiche l'écran Home
					)}
					{connected && (
						<><Stack.Screen name="getPlace" component={getPlace} /></>
					)}
					{connected === true && (
						<><Stack.Screen name="createPlace" component={createPlace} /></>
					)}
					{connected === true && (
						<><Stack.Screen name="deletePlace" component={deletePlace} /></>
					)}
					{connected === true && (
						<><Stack.Screen name="updatePlace" component={updatePlace} /></> 
					)}
					{connected === true && (
						<><Stack.Screen name="Register" component={Register} /></>
					)}
					{connected === false && (
						<><Stack.Screen name="Login" component={Login} /></>
					)}
			
				</Stack.Navigator>
			</NavigationContainer>
		</ApolloProvider>
	);
}

export default App; // exporte le composant App