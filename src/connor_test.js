import { connect } from '../services/redis.js';

const app = esxpress();

await client.set('test_key', 'test_val');

console.log(client.get('test_key'));
