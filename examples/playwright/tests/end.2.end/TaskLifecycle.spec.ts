/* eslint-disable no-param-reassign */
import type { AddTaskModel } from "$examples/playwright/models/TaskModel";
import prepareRandomTask from "$examples/playwright/factories/prepareRandomTask";
import { expect, test } from "$examples/playwright/fixtures/MergeFixture";

test.describe.configure({ mode: "serial" });
test.describe("Create, verify, edit and delete article", () => {
  let taskData: AddTaskModel;
  test("Create new task @e2e", async ({
    createRandomTask,
    getTaskCard,
    formatDate,
  }) => {
    // Arrange
    taskData = createRandomTask.taskData;

    // Act
    const task = getTaskCard(createRandomTask.homePage, taskData);
    const inputDateFormatted = formatDate(
      createRandomTask.homePage,
      taskData.date,
    );

    // Assert
    await expect.soft(task.body).toHaveText(taskData.body);
    await expect.soft(task.project).toHaveText(taskData.project);
    await expect.soft(task.date).toHaveText(inputDateFormatted);
  });

  test("User can access created todo @e2e", async ({
    homePage,
    formatDate,
  }) => {
    // Act
    const todoPage = await homePage.gotoTask(taskData.body);
    const inputDateFormatted = formatDate(homePage, taskData.date);

    // Assert
    await expect.soft(todoPage.todoDescription).toHaveText(taskData.body);
    await expect.soft(todoPage.todoDate).toContainText(inputDateFormatted);
    await expect.soft(todoPage.todoProject).toContainText(taskData.project);
  });

  let editTaskData: AddTaskModel;
  test("User can edit single todo @e2e", async ({ homePage, getTaskCard }) => {
    // Arrange
    editTaskData = prepareRandomTask();

    // Act
    const editTaskView = await homePage.clickEditTask(taskData.body);
    homePage = await editTaskView.editTask(editTaskData);

    // Assert
    const editedTask = getTaskCard(homePage, editTaskData);
    await expect.soft(editedTask.body).toHaveText(editTaskData.body);
    await expect.soft(editedTask.project).toContainText(editTaskData.project);
  });

  test("User can delete todo @e2e", async ({ homePage, getTaskCard }) => {
    // Arrange
    // Act
    const task = getTaskCard(homePage, editTaskData);
    await homePage.deleteTask(editTaskData.body);

    // Assert
    await expect(task.body).toBeHidden();
  });
});
