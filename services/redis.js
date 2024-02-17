
import { create } from "redis";
const creds = require("../creds.json");

const client = createClient({
	url: `redis://${creds.username}:${creds.password}@${creds.endpoint}`});


client.on('error', err => console.log('Redis Client Error', err));


await client.connect();

export function connect() {
	return client.connect();
}
export default client;
