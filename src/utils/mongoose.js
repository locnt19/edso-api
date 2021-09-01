import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const DB_HOST = process.env.DB_HOST || 'hnguyen.qaysn.mongodb.net',
    DB_PORT = process.env.DB_PORT || '27017',
    DB_NAME = process.env.DB_NAME || 'test',
    DB_USERNAME = process.env.DB_USERNAME || 'edsoadmin',
    DB_PASSWORD = process.env.DB_PASSWORD || 'qwerty123456',
    LOGIN_DB = DB_USERNAME && DB_PASSWORD ? `${DB_USERNAME}:${DB_PASSWORD}@` : '',
    DB_USE_SRV = process.env.DB_USE_SRV || 'true';

mongoose.connection.on('open', () => console.log('🚀 Mongo DB connected'));

mongoose.plugin(require('@meanie/mongoose-to-json'));

global.mongoose = mongoose;

export async function connectMongoDb() {
    console.log(`mongodb${DB_USE_SRV === 'true' ? '+srv' : ''}://${LOGIN_DB}${DB_HOST}${DB_USE_SRV ? '' : `:${DB_PORT}`
        }/${DB_NAME}`)
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

