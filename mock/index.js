export default [
    {
        url: '/api/test/ping',
        method: 'get',
        response: () => {
          console.log('✅ Mock test/ping hit!')
          return { code: 200, msg: 'M1ock is working!' }
        },
    }
]