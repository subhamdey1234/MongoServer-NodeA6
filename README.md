# Mongoose and MongoDB Guide CRUD Application Server

## Introduction
Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node.js. It provides a structured way to interact with MongoDB using schemas and models, making database interactions easier and more maintainable.

MongoDB is a NoSQL database that stores data in flexible, JSON-like documents. It is designed for scalability and high performance.

---

## Installation
To use Mongoose and MongoDB in a Node.js project, install Mongoose using npm:

```sh
npm install mongoose
```

Make sure you have MongoDB installed and running. You can start MongoDB with:

```sh
mongod
```

Or, if you are using MongoDB Atlas, obtain a connection string from your Atlas cluster.

---

## Connecting to MongoDB
To connect Mongoose to MongoDB, use the following code:

```javascript
import mongoose from 'mongoose';

const mongoURI = 'mongodb://localhost:27017/myDatabase'; // Change to your database name

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));
```

For a MongoDB Atlas connection, use:

```javascript
const mongoURI = 'your_atlas_connection_string';
```

---

## Defining a Schema and Model
A schema defines the structure of documents within a collection.

```javascript
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, min: 0 }
});

const User = mongoose.model('User', userSchema);
```

---

## CRUD Operations

### Create (Insert Data)
```javascript
const createUser = async () => {
  const user = new User({ name: 'John Doe', email: 'john@example.com', age: 30 });
  await user.save();
  console.log('User Created:', user);
};

createUser();
```

### Read (Retrieve Data)
```javascript
const getUsers = async () => {
  const users = await User.find();
  console.log('All Users:', users);
};

getUsers();
```

### Update (Modify Data)
```javascript
const updateUser = async (userId) => {
  await User.findByIdAndUpdate(userId, { age: 35 });
  console.log('User Updated');
};
```

### Delete (Remove Data)
```javascript
const deleteUser = async (userId) => {
  await User.findByIdAndDelete(userId);
  console.log('User Deleted');
};
```

---

## Error Handling
Mongoose provides built-in error handling for validation and duplicate entries. Always wrap database operations in try-catch blocks:

```javascript
try {
  const user = await User.create({ name: 'Alice', email: 'alice@example.com', age: 28 });
} catch (error) {
  console.error('Error creating user:', error);
}
```

---

## Conclusion
Mongoose simplifies MongoDB interactions in Node.js by providing schemas, models, and built-in validation. It is widely used in modern web applications for handling structured data efficiently.

For more details, visit the [Mongoose Documentation](https://mongoosejs.com/) and [MongoDB Documentation](https://www.mongodb.com/docs/).

