import BasePage from "./BasePage";

class TodoPage extends BasePage {
  url = "/en";

  todoDescription = this.page.getByTestId("tododetails-description");

  todoDate = this.page.getByTestId("tododetails-date");

  todoProject = this.page.getByTestId("tododetails-project");

  todoId = this.page.getByTestId("tododetails-id");

  goBackToHomePageButton = this.page.getByTestId("homepage-home-button");
}

export default TodoPage;
