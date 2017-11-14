export default [
  {
    pattern: 'http://l:4000(.*)',
    fixtures: (match, params, headers) => {
      const url = match[1]
      if (url === '/api/test') {
        return {
          'items': []
        }
      }
      if (url === '/api/test/id') {
        return {}
      }
    },
    get: (match, data) => ({body: data}),
    post: (match, data) => ({body: data})
  }
]
