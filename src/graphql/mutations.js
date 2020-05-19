import { gql } from 'apollo-boost';

export const CREATE_USER = gql`
    mutation createUsers($userId: String!, $name: String!, $username: String!, $email: String!, 
        $bio: String!, $website: String!, $profileImage: String!, $phoneNumber: String!) {
            insert_users(objects: { user_id: $userId, name: $name, username: $username, 
                    email: $email, website: $website, profile_image: $profileImage,
                    bio: $bio, phone_number: $phoneNumber}) {
                    affected_rows
                }   
    }
`