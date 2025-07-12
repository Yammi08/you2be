const {MongoClient} = require('mongodb');
const { query } = require('express');

var url = 'mongodb://localhost:27017/';
const db = new MongoClient(url);

const run = async()=>
{
    try
    {
        await db.connect();
        await db.db('mydb').command({ping:1});
        console.log('Connection succefully');
    }
    finally
    {
    }
}

run();

module.exports = db;