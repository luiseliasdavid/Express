const mongoose = require('mongoose')


const dbConnection = async () => {

   try {
    
    mongoose.set('strictQuery', true)
    mongoose.connect(process.env.MONGO_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    console.log('base de datos online')

   } catch (error){
    console.log(error)
       throw new Error('error iniciando la base de datos') 
   }


}

module.exports = {
    dbConnection
}