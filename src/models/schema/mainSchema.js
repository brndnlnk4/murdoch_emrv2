const { gql } = require('apollo-server-express');
const faker = require('faker');


//typeDefs
exports.typeDefs = gql `
  type Query {
    getUsers: [ User ],
    hello: String
  }

  type User {
    id: String,
    name: String,
    email: String
  }

`
//resolvers
exports.resolvers = {
  Query: {
    getUsers: function () {
      console.log(`===> response data returned successfull`); //this is response

      return {
        id: faker.id,
        name: faker.name.name,
        email: faker.internet.email
      }
    },
    hello: () => {
      console.log(`===> hello called`); //this is response
      return 'hello world'
    }
  }
};
