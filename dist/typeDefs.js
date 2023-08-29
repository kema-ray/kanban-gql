// import { gql } from 'apollo-server';
export const typeDefs = `
  type Task {
    id: ID!
    columnId: ID!
    content: String!
  }

  type Column {
    id: ID!
    title: String!
    tasks: [Task]!
  }

  type Query {
    columns: [Column]!
    column(id: ID!): Column
  }

  type Mutation {
    addColumn(title: String!): Column
    updateColumnTitle(id: ID!, newTitle: String!): Column
    deleteColumn(id: ID!): ID
    addTask(columnId: ID!, content: String!): Task
    updateTaskContent(id: ID!, newContent: String!): Task
    moveTask(taskId: ID!, fromColumnId: ID!, toColumnId: ID!): Task
  }
`;
