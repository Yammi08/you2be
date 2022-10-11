var mng = require('mongodb').MongoClient; 
const dt = require('../database');
var database;
var db;
const init = (dat)=>
{
    database = dat;
    db = database.db('mydb');
}
const find = (res)=>
{
    return db.collection('customers').findOne(res);
}
const findAll = (res)=>
{
    return db.collection('customers').find(res);
}
const edit = (res,edit)=>
{
    return db.collection('customers').updateOne(res,edit);
}
const add = (res)=>
{
    return db.collection('customers').insertOne(res);
}
const remove=  (res)=>
{
    return db.collection('customers').deleteOne(res);
}
init(dt);
module.exports = 
{
    init,
    find,
    findAll,
    add,
    remove,
    edit
}