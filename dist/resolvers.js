import { v4 as uuidv4 } from 'uuid';
const firstColumn = uuidv4();
const secondColumn = uuidv4();
const thirdColumn = uuidv4();
const columnsData = [
    {
        id: firstColumn,
        title: "To Do",
        tasks: [
            { id: uuidv4(), content: "Task 1", columnId: firstColumn },
            { id: uuidv4(), content: "Task 2", columnId: firstColumn },
        ],
    },
    {
        id: secondColumn,
        title: "In Progress",
        tasks: [
            { id: uuidv4(), content: "Task 3", columnId: secondColumn },
            { id: uuidv4(), content: "Task 4", columnId: secondColumn },
        ],
    },
    {
        id: thirdColumn,
        title: "Completed",
        tasks: [
            { id: uuidv4(), content: "Task 5", columnId: thirdColumn },
            { id: uuidv4(), content: "Task 6", columnId: thirdColumn },
        ],
    },
];
const resolvers = {
    Query: {
        columns: () => columnsData,
        // column: (_, { id }) => columns.find(col => col.id === id),
    },
    Mutation: {
        addColumn: (_, { title }) => {
            const newColumn = {
                id: uuidv4(),
                title,
                tasks: [],
            };
            columnsData.push(newColumn);
            return newColumn;
        },
        updateColumnTitle: (_, { id, newTitle }) => {
            const column = columnsData.find(col => col.id === id);
            if (column) {
                column.title = newTitle;
                return column;
            }
            return null;
        },
        deleteColumn: (_, { id }) => {
            const columnIndex = columnsData.findIndex(col => col.id === id);
            if (columnIndex !== -1) {
                const deletedColumn = columnsData.splice(columnIndex, 1);
                return deletedColumn[0];
            }
            return null;
        },
        addTask: (_, { columnId, content }) => {
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
export default resolvers;
