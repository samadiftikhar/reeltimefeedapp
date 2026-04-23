export function useAxiosErrorMessage() {
  return (error) =>
    error?.response?.data?.message ||
    error?.message ||
    'Something went wrong. Please try again.'
}

