import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { feedApi } from '../api/feedApi.js'
import { gql } from 'graphql-request'
import { graphqlRequest } from '../../../services/graphqlRequest'

const GET_POST = gql`
  query GetPost($id: ID!) {
    post(id: $id) {
      _id
      title
      content
      imageUrl
      createdAt
      updatedAt
      creator {
        _id
        name
        email
      }
    }
  }
`

const GET_POSTS = gql`
  query GetPosts($page: Int!, $perPage: Int!) {
    posts(page: $page, perPage: $perPage) {
      posts {
        _id
        title
        content
        imageUrl
        createdAt
        updatedAt
        creator {
          _id
          name
          email
        }
      }
      totalPosts
    }
  }
`
const CREATE_POST = gql`
  mutation CreatePost($postInput: PostInputData!) {
    createPost(postInput: $postInput) {
      _id
      title
      content
      imageUrl
      createdAt
      updatedAt
      creator {
        _id
        name
        email
      }
    }
  }
`
const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $postInput: PostInputData!) {
    updatePost(id: $id, postInput: $postInput) {
      _id
      title
      content
      imageUrl
      createdAt
      updatedAt
      creator {
        _id
        name
        email
      }
    }
  }
`

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`

const LIKE_POST = gql`
  mutation LikePost($id: ID!) {
    likePost(id: $id) {
      _id
      title
      content
      imageUrl
      createdAt
      updatedAt
      creator {
        _id
        name
        email
      }
      likes
    }
  }
`

const feedKeys = {
  all: ['feed'],
  posts: () => [...feedKeys.all, 'posts'],
}

export function usePostsQuery(page = 1, perPage = 10) {
  return useQuery({
    queryKey: ['feed', 'posts', page, perPage],
    queryFn: () => graphqlRequest(GET_POSTS, { page, perPage }).then((res) => res.posts),
  })
}


export function usePostQuery(id) {
  return useQuery({
    queryKey: ['feed', 'post', id], // 🔥 dynamic key
    queryFn: () => graphqlRequest(GET_POST, { id }),
    keepPreviousData: true // smooth UX
  })
}


export function useCreatePostMutation() {
  const qc = useQueryClient()

  return useMutation({
    mutationFn: (variables) =>
      graphqlRequest(CREATE_POST, variables),

    onSuccess: async () => {
      toast.success('Post Created!')
      await qc.invalidateQueries({ queryKey: ['feed', 'posts'] })
    },
  })
}


export function useUpdatePostMutation() {
  const qc = useQueryClient()
  return useMutation({

    mutationFn: (variables) => graphqlRequest(UPDATE_POST, variables),
    onSuccess: async () => {
      toast.success('Post Updated!')
      await qc.invalidateQueries({ queryKey: feedKeys.posts() })
    },
  })
}


export function useDeletePostMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (variables) => graphqlRequest(DELETE_POST, variables),
    onSuccess: async () => {
      toast.success('Post Deleted!')
      await qc.invalidateQueries({ queryKey: feedKeys.posts() })
    },
  })
}

export function useLikePostMutation() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: feedApi.likePost,
    onSuccess: async () => {
      await qc.invalidateQueries({ queryKey: feedKeys.posts() })
    },
  })
}

