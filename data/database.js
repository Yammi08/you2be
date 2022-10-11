const {MongoClient} = require('mongodb');
const { query } = require('express');
const parseSchema = require('mongodb-schema');
var url = 'mongodb://localhost:27017/';
const db = new MongoClient(url);

const run = async()=>
{
    try
    {
        await db.connect();
        //db.db('mydb').collection('customers').deleteOne;
        await db.db('mydb').command({ping:1});
        console.log('Connection succefully');
    }
    finally
    {
    }
}

run();

module.exports = db;