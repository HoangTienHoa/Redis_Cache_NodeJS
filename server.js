const express = require('express');
const redis = require('redis');
const bodyParser = require('body-parser')
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const client = redis.createClient();// Port:6379 by default
/*
//Connect to remote Redis server
createClient({
    url: 'redis://alice:foobared@awesome.redis.server:6380'
});*/

client.on('error', err => console.log('Redis Client Error', err));

//String
app.get("/testString", async (req, res)=>{
    const key = 'testString';
    let value = await client.get(key);
    console.log(value);
    if(value==null){
        //await client.set(key, 'This function is testing for String');
        await client.set(key, 'This function is testing for String',{
            EX: 10,//second, time to expire
            NX: true
        });
        value = await client.get(key);
        return res.json({ source: 'Get From Database', data: value});
    }else {
        return res.json({source: 'Get From Cache', data: value});
    }
})

//Using Hashes or JSON
app.get("/testHashes", async (req, res)=>{
    const key = "testHashes";
    let user = await client.hGetAll(key);
    console.log(Object.keys(user));
   if(Object.keys(user).length==0){
        await client.hSet(key,{
            "id": 1,
            "user": "Hoang Tien Hoa"
        });
        user = await client.hGetAll(key);
        return res.json({ source: 'Get From Database', data: user });
    }else{
        return res.json({ source: 'Get From Cache', data: JSON.parse(JSON.stringify(user))});
    }
})

//Delete All Redis Data
app.delete("/deleteAllRedisData", async (req, res)=>{
   let keys = await client.keys('*');
   console.log(keys);
   keys.map( async key => {
       await client.del(key);
   });
   return res.send('Deleted All Redis Data');
})
app.delete("/delete",async (req, res)=>{
    const key = req.query.key;
    console.log(key);
    await client.del(key);
    return res.send('Deleted key: '+ key);
})

app.listen(3000, async () => {
    await client.connect();
    console.log('Redis connection is open.');
    console.log('Server listening on port: 3000');
});

//How to delete Redis connection after close the project
//await client.disconnect();