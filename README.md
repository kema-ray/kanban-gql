// updateTaskContent: (_, { id, newContent }) => {
    //   const task = tasks.find(t => t.id === id);
    //   if (task) {
    //     task.content = newContent;
    //     return task;
    //   }
    //   return null;
    // },
    // moveTask: (_, { taskId, fromColumnId, toColumnId }) => {
    //   const taskIndex = tasks.findIndex(task => task.id === taskId);
    //   const fromColumn = columnsData.find(col => col.id === fromColumnId);
    //   const toColumn = columnsData.find(col => col.id === toColumnId);
      
    //   if (taskIndex !== -1 && fromColumn && toColumn) {
    //     const task = tasks[taskIndex];
    //     task.columnId = toColumnId;
    //     fromColumn.tasks = fromColumn.tasks.filter(t => t.id !== taskId);
    //     toColumn.tasks.push(task);
    //     return task;
    //   }
    //   return null;
    // },