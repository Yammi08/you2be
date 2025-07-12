var mng = require('mongodb').MongoClient; 
const dt = require('../database');
var database;
var db;
const  init = (database)=> db = database.db('mydb');

const find = (res)=> db.collection('usuarios').findOne(res);

const findAll = (res)=> db.collection('usuarios').find(res);

const edit = (res,edit)=> db.collection('usuarios').updateOne(res,edit);

const add = (res)=>  db.collection('usuarios').insertOne(res);

const remove= (res)=> db.collection('usuarios').deleteOne(res);

const addVideo= (res)=> db.collection('videos').insertOne(res);

const removeVideo= (res)=> db.collection('videos').deleteOne(res);

const editVideo= (res,edit)=> db.collection('videos').updateOne(res,edit);

const findVideo = (res)=> db.collection('videos').findOne(res);

const findAllVideos = (res)=> db.collection('videos').find(res);

init(dt);
module.exports = 
{
    find,
    findAll,
    add,
    remove,
    edit,
    addVideo,
    removeVideo,
    editVideo,
    findVideo,
    findAllVideos
}