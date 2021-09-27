import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'localhost',
    DB_PORT = process.env.DB_PORT || '27017',
    DB_NAME = process.env.DB_NAME || 'edso-backend',
    DB_USERNAME = process.env.DB_USERNAME || '',
    DB_PASSWORD = process.env.DB_PASSWORD || '',
    LOGIN_DB = DB_USERNAME && DB_PASSWORD ? `${DB_USERNAME}:${DB_PASSWORD}@` : '',
    DB_USE_SRV = process.env.DB_USE_SRV;

mongoose.connection.on('open', () => console.log('🚀 Mongo DB connected'));

mongoose.plugin(require('@meanie/mongoose-to-json'));

global.mongoose = mongoose;

export async function connectMongoDb() {
    return mongoose.connect(
        `mongodb${DB_USE_SRV === 'true' ? '+srv' : ''}://${LOGIN_DB}${DB_HOST}${DB_USE_SRV ? '' : `:${DB_PORT}`
        }/${DB_NAME}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 5000,
            useFindAndModify: false,
            useCreateIndex: true
        }
    );
}

