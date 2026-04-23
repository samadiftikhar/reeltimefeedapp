export const postEventHandler = ({
    data,
    queryClient,
    queryKey,
  }) => {
    // 🛑 Ignore if this came from client-originated mutation (optional future use)
    if (data.source && data.source === 'client') return
  
    const oldData = queryClient.getQueryData(queryKey)
    if (!oldData) return
  
    let updatedPosts = [...oldData.posts]
  
    switch (data.action) {
      case 'create':
        updatedPosts.unshift({
          ...data.post,
          creator: data.creator,
        })
        break
  
      case 'update':
        updatedPosts = updatedPosts.map((p) =>
          p._id === data.post._id ? data.post : p
        )
        break
  
      case 'delete':
        updatedPosts = updatedPosts.filter(
          (p) => p._id !== data.postId
        )
        break
    }
  
    queryClient.setQueryData(queryKey, {
      ...oldData,
      posts: updatedPosts,
    })
  }