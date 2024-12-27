/* eslint-disable import/no-cycle */
import { expect, type Locator } from "@playwright/test";
import dayjs from "dayjs";
import MainMenuComponents from "$examples/playwright/components/MainMenuComponents";
import BasePage from "$examples/playwright/pages/BasePage";
import EditTaskView from "$examples/playwright/views/EditTaskView";
import TodoPage from "./TodoPage";

interface TaskCard {
  body: Locator;
  date: Locator;
  project: Locator;
  editButton: Locator;
  deleteButton: Locator;
}
class HomePage extends BasePage {
  url = "/en";

  mainMenu = new MainMenuComponents(this.page);

  myToDosHeader = this.page.getByRole("heading", { name: "My todos" });

  editButton = this.page.getByTestId("todoitem-button-edit");

  getTaskCard(body: string): TaskCard {
    const taskContainer = this.page.getByTestId("card-container").filter({
      has: this.page
        .getByTestId("todoitem-description")
        .filter({ hasText: body }),
    });

    return {
      body: taskContainer.getByTestId("todoitem-description"),
      project: taskContainer.getByTestId("todoitem-project-label"),
      date: taskContainer.getByTestId("todoitem-date-label"),
      editButton: taskContainer.getByTestId("todoitem-button-edit"),
      deleteButton: taskContainer.getByTestId("todoitem-button-delete"),
    };
  }

  async gotoTask(body: string): Promise<TodoPage> {
    await this.page.getByText(body).click();
    return new TodoPage(this.page);
  }

  formatDateToExpected(inputDate: string): string {
    const date = new Date(inputDate);
    const formattedDate = dayjs(date).format("DD MMM YYYY");
    return formattedDate;
  }

  async verifyTaskDate(
    body: string,
    expectedDateString: string,
  ): Promise<boolean> {
    const { date } = this.getTaskCard(body);
    const receivedDateString = await date.innerText();

    const formattedDateString = this.formatDateToExpected(receivedDateString);

    expect(formattedDateString).toBe(expectedDateString);

    return true;
  }

  async deleteTask(taskBody: string): Promise<HomePage> {
    const task = this.getTaskCard(taskBody);
    await task.deleteButton.click();
    return new HomePage(this.page);
  }

  async clickEditTask(taskbody: string): Promise<EditTaskView> {
    const task = this.getTaskCard(taskbody);
    await task.editButton.click();
    return new EditTaskView(this.page);
  }
}

export default HomePage;
