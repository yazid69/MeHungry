import { StyleSheet, Text, View, Button } from 'react-native';
import { useQuery } from '@apollo/client';
import { useNavigation } from '@react-navigation/native';
import { ME_QUERY } from '../lib/gql/index';

export function Home() {
	const { loading, error, data } = useQuery(ME_QUERY); //permet de charger les données de l'user
	const navigation = useNavigation(); //permet de naviguer entre les pages

	async function handleLogout() { 
        await SecureStore.deleteItemAsync('token'); // Delete the token
        setDisconnected(false); // Modifie le statu de co de l'user

    };
	
	
	console.log(data, loading); //affiche les données de l'user et le statu de chargement

// affiche la page 
	return (
		<View style={styles.container}> 
			<Text style={styles.h1}>Home</Text>
			<View style={styles.content}>
				<Text>Bonjour {data && data.me.username} !</Text>
				<Button
					title="S'enregistrer"
					onPress={() => {
						navigation.navigate('Register'); //permet de naviguer vers la page Register
					}}
				/>
				<Button
					title="Logout"
					onPress={() => {
						navigation.navigate('Logout');
					}}
				/>
				<Button
					title="getPlace"
					onPress={() => {
						navigation.navigate('getPlace');
					}}
				/>
				<Button
					title="createPlace"
					onPress={() => {
						navigation.navigate('createPlace');
					}}
				/>
				<Button
					title="deletePlace"
					onPress={() => {
						navigation.navigate('deletePlace');
					}}
				/>
				<Button
					title="updatePlace"
					onPress={() => {
						navigation.navigate('updatePlace');
					}}
				/>
			</View>
		</View>
	);
}
// style de la page
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#E8E8E8',
		alignItems: 'center',
	},
	h1: {
		fontSize: 40,
		fontWeight: 500,
		paddingVertical: 20,
		backgroundColor: '#14171c',
		width: '100%',
		textAlign: 'center',
		color: 'white',
	},
	content: {
		flex: 0,
	},
});