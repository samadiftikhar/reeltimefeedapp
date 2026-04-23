export const AUTH_EVENTS = {
  UNAUTHORIZED: 'auth:unauthorized',
}

export function emitUnauthorized() {
  window.dispatchEvent(new CustomEvent(AUTH_EVENTS.UNAUTHORIZED))
}

