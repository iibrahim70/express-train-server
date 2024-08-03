import mongoose from 'mongoose';
import app from './app';
import config from './config';

async function main() {
  try {
    const connectionInstance = await mongoose.connect(
      `${config.dbURL}/${config.dbName}`,
    );

    console.log(
      `MongoDB Connected! DB Host: ${connectionInstance.connection.host}`,
    );

    app.listen(config.port, () => {
      console.log(`App is listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('MongoDB Error', error);
    process.exit(1);
  }
}

main();
