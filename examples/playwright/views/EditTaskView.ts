/* eslint-disable import/no-cycle */
import type { Locator, Page } from "@playwright/test";
import type { AddTaskModel } from "$examples/playwright/models/TaskModel";
import HomePage from "$examples/playwright/pages/HomePage";

class EditTaskView {
  addToDoHeader: Locator;

  bodyInput: Locator;

  projectSelector: Locator;

  dateInput: Locator;

  saveButton: Locator;

  constructor(private page: Page) {
    this.addToDoHeader = this.page.getByRole("heading", { name: "Add todo" });
    this.bodyInput = this.page.getByTestId("todoform-textarea");
    this.projectSelector = this.page.getByTestId("todoform-select-input");
    this.dateInput = this.page.getByTestId("todoform-input");
    this.saveButton = this.page.getByTestId("todoform-submit-button");
  }

  async editTask(addTask: AddTaskModel): Promise<HomePage> {
    await this.bodyInput.fill(addTask.body);
    await this.projectSelector.selectOption(addTask.project);
    await this.dateInput.fill(addTask.date);
    await this.saveButton.click();

    return new HomePage(this.page);
  }
}
export default EditTaskView;
