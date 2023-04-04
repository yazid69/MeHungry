import { gql } from '@apollo/client';
// LOGIN_MUTATION est une requête GraphQL qui permet de se connecter à l'application
export const REGISTER_MUTATION = gql` 
	mutation ($input: UsersPermissionsRegisterInput!) {
		register(input: $input) {
			jwt
			user {
				username
			}
		}
	}
	`;

export const LOGIN_MUTATION = gql`
	mutation ($input: UsersPermissionsLoginInput!) {
		login(input: $input) {
			jwt
			user {
				username
				email
			}
		}
	}
`;
export const ME_QUERY = gql`
	query {
		me {
			username
			email
		}
	}
`;

export const GET_PLACES_QUERY = gql`
    query {
        places {
            data {
                id
                attributes {
                title,
                address,
                latitude,
                longitude
                }
            }
        }
    }
`;



// createPlace 
export const CREATE_PLACE_MUTATION = gql`
  mutation createPlace($input: PlaceInput!) {
    createPlace(data: $input) {
      data {
        id
        attributes {
          title
          address
          latitude
          longitude
        }
      }
    }
  }
`;
// deletePlace
export const DELETE_PLACE_MUTATION = gql`
  mutation deletePlace($id: ID!) {
    deletePlace(id: $id) {
      data {
        id
      }
    }
  }
`;
// updatePlace

export const UPDATE_PLACE_MUTATION = gql`
	mutation updatePlace ($id: ID!, $input: PlaceInput!) {
		updatePlace(id: $id, data: $input){
		data {
			id
			attributes {
			title,
			address,
			latitude,
			longitude
			}
		}
		}
	}
	`;

