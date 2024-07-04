# Redis_Cache_NodeJS
Implement Redis for caching with NodeJS

# What is Redis
````
Redis is build for in-memory database which is used as a cache server.
Acess data very fast.
Redis supports data structures such as strings, JSON, hashes, lists, sets, sorted sets with range queries, bitmaps, hyperloglogs, geospatial indexes with radius queries and streams.
Each types data have itself method set and get.

Caching is the process of storing data into a cache. A cache is a temporary data store where data is kept for later use.
A cache as a data store is easier for the client (or server) to reach.

Redis Versus Other Key-value Stores
Redis is an in-memory database but persistent on disk database, hence it represents a different trade off where very high write and read speed is achieved with the limitation of data sets that can't be larger than the memory
Back up and retore use dump.rdb
````

# Install Redis
    brew install redis
    redis-server
    command + c

# Start redis
    brew services start redis
# Check redis is start
    redis-cli
    redis 127.0.0.1:6379 > ping
        -> Expect: Pong
# Run app
    npm i
    npm start
    using postman for testing API.

# Ref:
    https://www.npmjs.com/package/redis
    https://redis.io/docs/clients/nodejs/
    Install Cluster -> https://redis.io/docs/latest/develop/connect/clients/nodejs/
