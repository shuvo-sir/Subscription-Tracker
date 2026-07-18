import {config} from 'dotenv';

config({path: `.env.${process.env.NODE_ENV  || 'development'}.local`});

export const {
    PORT, NODE_ENV,
    DB_URL,
    JWT_SECRET, JWT_EXPIRE,
    ARCJET_KEY, ARCJET_ENV,
    QSTASH_URL, QSTASH_TOKEN
} = process.env;

