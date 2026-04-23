const DB_KEY = 'snblog.localdb'

function seed() {
  return {
    users: [{ id: 'u1', email: 'demo@demo.com', password: 'Password123!' }],
    posts: [
      {
        id: 'p1',
        title: 'Welcome to Social Blog',
        description:
          'This post is stored in localStorage. You can create posts with title, image, and description without any backend.',
        imageDataUrl: '',
        authorEmail: 'demo@demo.com',
        createdAt: new Date().toISOString(),
        likes: 1,
      },
    ],
  }
}

export function getDb() {
  const raw = localStorage.getItem(DB_KEY)
  if (raw) return JSON.parse(raw)
  const initial = seed()
  localStorage.setItem(DB_KEY, JSON.stringify(initial))
  return initial
}

export function setDb(db) {
  localStorage.setItem(DB_KEY, JSON.stringify(db))
}

export async function wait(ms = 250) {
  await new Promise((resolve) => setTimeout(resolve, ms))
}

