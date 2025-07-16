import {MongoClient} from "mongodb";
import dotenv from 'dotenv';

dotenv.config();

const url=process.env.DB_URL;
console.log("URL: "+url);

let client;
export const connectToMOngoDB=()=>{
    MongoClient.connect(url)
    .then(clientInstance=>{
        client=clientInstance
        console.log("Mongodb is connected");
        createCounter(client.db());
        createIndexes(client.db());

    })
    .catch(err=>{
        console.log(err);
    })
}
export const getClient=()=>{
    return client;
}
export const getDB=()=>{
    return client.db();

}
