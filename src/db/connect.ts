import mongoose from 'mongoose';

const connection: { isConnected?: number } = {};

async function connect() {
	if (connection.isConnected) {
		return;
	}

	const db = await mongoose.connect(process.env.DB_URI!, {
		dbName: 'bike-app',
	});
	connection.isConnected = db.connections[0].readyState;
}

export default connect;