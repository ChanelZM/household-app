import type { Locator, Page } from "@playwright/test";

class MainMenuComponents {
  addToDoButton: Locator;

  constructor(private page: Page) {
    this.addToDoButton = this.page.getByTestId("todoheading-add-button");
  }

  async clickAddToDoButton(): Promise<Page> {
    await this.addToDoButton.click();
    return this.page;
  }
}

export default MainMenuComponents;
