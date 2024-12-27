import { test as baseTest } from "@playwright/test";
import type EditTaskView from "$examples/playwright/views/EditTaskView";
import HomePage from "$examples/playwright/pages/HomePage";
import TodoPage from "$examples/playwright/pages/TodoPage";
import AddTaskView from "$examples/playwright/views/AddTaskView";

interface Pages {
  homePage: HomePage;
  todoPage: TodoPage;
  addTaskView: AddTaskView;
  editTaskView: EditTaskView;
}
let taskBody: string;
const pageObjectFixture = baseTest.extend<Pages>({
  addTaskView: async ({ homePage }, use) => {
    const page = await homePage.mainMenu.clickAddToDoButton();
    const addTaskView = new AddTaskView(page);
    await use(addTaskView);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await use(todoPage);
  },
  editTaskView: async ({ homePage }, use) => {
    const editTaskView = await homePage.clickEditTask(taskBody);
    await use(editTaskView);
  },
});

export default pageObjectFixture;
