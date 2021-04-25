export function createRedisClient(options = {}) {
    console.log('test');
    return null;
    // const redisClient = new Redis({
    //   host: process.env.REDIS_URL || 'localhost',
    //   port: process.env.REDIS_PORT || 6379,
    //   password: process.env.REDIS_PASS,
    //   tls: process.env.REDIS_USE_TLS ? {} : undefined,
    //   ...options,
    // });
    // redisClient.on('connect', () => {
    //   console.log('Redis connected!!!!');
    // });
    // return redisClient;
}
