// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
export default function useApiMiddleware(middleware) {
  return (request, response) => new Promise((resolve, reject) => {
    middleware(request, response, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  })
}
