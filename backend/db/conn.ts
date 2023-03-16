import { MongoClient } from "mongodb"
// Connection URI
const uri = process.env.ATLAS_URI
// Create a new MongoClient
const client = new MongoClient(uri)

let dbConnection

export default {
  connectToServer: async (callback: (arg0: undefined) => any) => {
    try {
      // Connect the client to the server (optional starting in v4.7)
      const db = await client.connect()
      // Establish and verify connection
      dbConnection = db.db('passkeeper')
      console.log("Successfully connected to MongoDB.")

      return callback(null)
    } catch(err) {
      await client.close()
      return callback(err)
    } 
    // finally {
    //   // Ensures that the client will close when you finish/error
    //   await client.close()
    // }
  },

  getDb: () => {
    return dbConnection
  }
}