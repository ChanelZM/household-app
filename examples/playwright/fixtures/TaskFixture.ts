/* eslint-disable import/no-unused-modules */
import type { AddTaskModel } from "$examples/playwright/models/TaskModel";
import type HomePage from "$examples/playwright/pages/HomePage";
import prepareRandomTask from "$examples/playwright/factories/prepareRandomTask";
import pageObjectFixture from "./pageObjectFixture";

interface TaskCreationContext {
  homePage: HomePage;
  taskData: AddTaskModel;
}

interface TaskFixtures {
  createRandomTask: TaskCreationContext;
  randomTask: (taskData?: AddTaskModel) => Promise<TaskCreationContext>;
  getTaskCard: (homePage: HomePage, taskData: AddTaskModel) => any;
  formatDate: (homePage: HomePage, date: string) => string;
}

const TaskFixture = pageObjectFixture.extend<TaskFixtures>({
  createRandomTask: async ({ addTaskView }, use) => {
    const taskData = prepareRandomTask();
    const homePage = await addTaskView.createTask(taskData);
    await use({ homePage, taskData });
  },

  randomTask: async ({ addTaskView }, use) => {
    const create = async (
      taskData?: AddTaskModel,
    ): Promise<TaskCreationContext> => {
      const finalTaskData = taskData ?? prepareRandomTask();
      const homePage = await addTaskView.createTask(finalTaskData);
      return { homePage, taskData: finalTaskData };
    };

    await use(create);
  },

  /* eslint-disable no-empty-pattern */
  getTaskCard: async ({}, use) => {
    await use((homePage: HomePage, taskData: AddTaskModel) =>
      homePage.getTaskCard(taskData.body),
    );
  },

  formatDate: async ({}, use) => {
    await use((homePage: HomePage, date: string) =>
      homePage.formatDateToExpected(date),
    );
  },
});

export default TaskFixture;
