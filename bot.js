import fetch from 'node-fetch';
import { Client, Intents } from 'discord.js';

const intents = new Intents();
intents.add(Intents.FLAGS.GUILD_PRESENCES);

const client = new Client({ intents });
client.login(process.env.IS_PEACH_UP_TOKEN);

async function getPeachStatus() {
	try {
		const loginReq = await fetch('https://v1.peachapi.com/login', {
			method: 'POST',
			body: JSON.stringify({
				email: 'thiswontworkeverrrr',
				password: 'dontusethis',
			}),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (loginReq.status === 500) {
			throw 'error';
		}

		return 'Peach is UP';
	} catch (e) {
		return 'Peach is DOWN';
	}
}

async function main() {
	const peachStatus = await getPeachStatus();
	if (!client || !client.user || !client.user.setPresence || !client.isReady()) {
		return;
	}
	try {
		client.user.setPresence({
			activities: [{ name: `${peachStatus}` }],
			status: 'online',
		});
	} catch (e) {
		console.error(e);
	}
}

setInterval(() => main(), 120000);
