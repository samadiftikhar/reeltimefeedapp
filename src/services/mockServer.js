// Lightweight mock adapter so the app works without a backend.
// Replace with real endpoints when your API is ready.
import toast from 'react-hot-toast'

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

function getDb() {
  const raw = localStorage.getItem('snblog.mockdb')
  if (raw) return JSON.parse(raw)

  const seed = {
    users: [{ id: 'u1', email: 'demo@demo.com', password: 'Password123!' }],
    posts: [
      {
        id: 'p1',
        body: 'Welcome to the feed. This is a mocked API response.',
        authorEmail: 'demo@demo.com',
        createdAt: new Date().toISOString(),
        likes: 2,
      },
    ],
  }
  localStorage.setItem('snblog.mockdb', JSON.stringify(seed))
  return seed
}

function setDb(db) {
  localStorage.setItem('snblog.mockdb', JSON.stringify(db))
}

function ok(data, config) {
  return {
    data,
    status: 200,
    statusText: 'OK',
    headers: {},
    config,
  }
}

function fail(status, message, config) {
  const err = new Error(message)
  err.response = {
    data: { message },
    status,
    statusText: 'Error',
    headers: {},
    config,
  }
  throw err
}

function parseBody(config) {
  if (!config?.data) return {}
  if (typeof config.data === 'string') {
    try {
      return JSON.parse(config.data)
    } catch {
      return {}
    }
  }
  return config.data
}

function requireAuth(config) {
  const auth = config?.headers?.Authorization || config?.headers?.authorization
  if (!auth?.startsWith('Bearer ')) {
    fail(401, 'Unauthorized', config)
  }
}

export function attachMockServer(axiosInstance) {
  axiosInstance.defaults.adapter = async (config) => {
    const url = config.url || ''
    const method = (config.method || 'get').toLowerCase()

    // Simulate network latency a bit.
    await sleep(450)

    try {
      if (method === 'post' && url === '/auth/login') {
        const { email, password } = parseBody(config)
        const db = getDb()
        const user = db.users.find((u) => u.email === email)
        if (!user || user.password !== password) {
          return ok({ message: 'Invalid credentials' }, config)
        }

        const token = `mock.${btoa(email)}.${Date.now()}`
        return ok({ token, user: { id: user.id, email: user.email } }, config)
      }

      if (method === 'post' && url === '/auth/signup') {
        const { email, password } = parseBody(config)
        if (!email || !password) fail(400, 'Email and password required', config)

        const db = getDb()
        const existing = db.users.find((u) => u.email === email)
        if (existing) fail(409, 'Email already exists', config)

        const user = { id: `u${db.users.length + 1}`, email, password }
        db.users.push(user)
        setDb(db)

        const token = `mock.${btoa(email)}.${Date.now()}`
        return ok({ token, user: { id: user.id, email: user.email } }, config)
      }

      if (method === 'post' && url === '/auth/reset-password') {
        const { email } = parseBody(config)
        if (!email) fail(400, 'Email is required', config)
        toast.success('Mock reset link sent (check console)')

        return ok({ ok: true }, config)
      }

      if (method === 'get' && url === '/posts') {
        requireAuth(config)
        const db = getDb()
        const posts = [...db.posts].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
        )
        return ok({ posts }, config)
      }

      if (method === 'post' && url === '/posts') {
        requireAuth(config)
        const { body } = parseBody(config)
        if (!body?.trim()) fail(400, 'Post body is required', config)

        const db = getDb()
        const auth = config.headers.Authorization || config.headers.authorization
        const email = atob(auth.split('.')[1] || '') || 'unknown@mock.com'

        const post = {
          id: `p${db.posts.length + 1}`,
          body,
          authorEmail: email,
          createdAt: new Date().toISOString(),
          likes: 0,
        }
        db.posts.unshift(post)
        setDb(db)
        return ok({ post }, config)
      }

      if (method === 'post' && url.match(/^\/posts\/[^/]+\/like$/)) {
        requireAuth(config)
        const id = url.split('/')[2]
        const db = getDb()
        const post = db.posts.find((p) => p.id === id)
        if (!post) fail(404, 'Post not found', config)
        post.likes = (post.likes || 0) + 1
        setDb(db)
        return ok({ post }, config)
      }

      return fail(404, `No mock route for ${method.toUpperCase()} ${url}`, config)
    } catch (error) {
      // Axios adapter expects throwing to be translated into a rejected promise.
      return Promise.reject(error)
    }
  }
}

