import { gql } from 'apollo-boost';

export const CHECK_IF_USERNAME_IS_TAKEN = gql`
    query checkIfUsernameTaken($username: String!) {
        users(where: {username: {_eq: $username}}) {
            username
        }
    }
`

export const GET_USER_EMAIL = gql`
    query getUserEmail($input: String!) {
        users(where: {_or:[ {username: {_eq: $input}}, {phone_number: {_eq: $input}} ]}) {
            email
        }
    }
`

export const GET_EDIT_PROFILE_INFO = gql`
    query getEditUserProfile($id: uuid!) {
        users_by_pk(id: $id) {
            id
            username
            name
            email
            bio
            profile_image
            website
            phone_number
        }
    }
`

export const SEARCH_USERS = gql`
    query searchUsers($query: String) {
        users(where: { _or: [ { username: {_ilike: $query} }, { name: {_ilike: $query} } ] }) {
            id
            profile_image
            name
            username
        }
    }
`

export const GET_USER_PROFILE = gql`
    query getUserProfile($username: String!) {
        users(where: {username: {_eq: $username}}) {
            id
            username
            name
            profile_image
            bio
            website
            posts_aggregate {
                aggregate {
                    count
                }
            }
            saved_posts(order_by: { created_at : desc }) {
                post {
                    media
                    id
                    likes_aggregate {
                        aggregate {
                            count
                        }
                    }
                    comments_aggregate {
                        aggregate {
                            count
                        }
                    }
                }
            }
            followers_aggregate {
                aggregate {
                    count
                }
            }
            following_aggregate {
                aggregate {
                    count
                }
            }
            posts(order_by: { created_at : desc }) {
                media
                id
                likes_aggregate {
                    aggregate {
                        count
                    }
                }
                comments_aggregate {
                    aggregate {
                        count
                    }
                }
            }
        }
    }
`

// suggest users from followers and also users created around the same time
export const SUGGEST_USERS = gql`
    query suggestUsers($limit: Int!, $followerIds: [uuid!]!, $createdAt: timestamptz!) {
        users(limit: $limit, where: {_or: [
            { id: {_in:$followerIds }},
            { created_at: { _gt: $createdAt }}
        ]}) {
            id
            username
            name
            profile_image
        }
    }
`