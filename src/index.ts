import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
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

import { v4 as uuidv4 } from 'uuid';

const firstColumn = uuidv4();
const secondColumn = uuidv4();
const thirdColumn = uuidv4();
const fourthColumn = uuidv4();


const columnsData = [
  {
    id: firstColumn,
    title: "To Do",
    tasks: [
      { id: uuidv4(), content: "Apollo Client", columnId: firstColumn },
      { id: uuidv4(), content: "Apollo Client", columnId: firstColumn },
    ],
  },
  {
    id: secondColumn,
    title: "In Progress",
    tasks: [
      { id: uuidv4(), content: "Apollo Server", columnId: secondColumn },
      { id: uuidv4(), content: "Apollo Server", columnId: secondColumn },
    ],
  },
  {
    id: thirdColumn,
    title: "Completed",
    tasks: [
      { id: uuidv4(), content: "Kanban Board", columnId: thirdColumn },
      { id: uuidv4(), content: "Kanban Board", columnId: thirdColumn },
    ],
  },
  {
    id: fourthColumn,
    title: "BackLog",
    tasks: [
      { id: uuidv4(), content: "BackLog Refinement", columnId: fourthColumn },
      { id: uuidv4(), content: "BackLog Refinement", columnId: fourthColumn },
    ],
  },
]

const resolvers = {
  Query: {
    columns: () => columnsData,
  },
  Mutation: {
    addColumn: (_: any, { title }: {title: string}) => {
      const newColumn = {
        id: uuidv4(),
        title,
        tasks: [],
      };
      columnsData.push(newColumn);
      return newColumn;
    },
    updateColumnTitle: (_: any, { id, newTitle }:{id: string, newTitle: string}) => {
      const column = columnsData.find(col => col.id === id);
      if (column) {
        column.title = newTitle;
        return column;
      }
      return null;
    },
    deleteColumn: (_: any, { id }:{id: string}) => {
      const columnIndex = columnsData.findIndex(col => col.id === id);
      if (columnIndex !== -1) {
        const deletedColumn = columnsData.splice(columnIndex, 1);
        return deletedColumn[0];
      }
      return null;
    },
    addTask: (_: any, { columnId, content }:{columnId: string, content: string}) => {
    //   const column = columnsData.find(col => col.id === columnId);
        const newTask = {
          id: uuidv4(),
          columnId,
          content,
        };
        const column = columnsData.find((c) => c.id === columnId);
        if (!column) {
            throw new Error("Column not found");
        }

        column.tasks.push(newTask);
        return newTask;
        }
    },

};
const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  
console.log(`🚀  Server ready at: ${url}`);
