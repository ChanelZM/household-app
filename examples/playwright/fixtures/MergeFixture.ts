import { mergeTests } from "@playwright/test";
import pageObjectFixture from "./pageObjectFixture";
import TaskFixture from "./TaskFixture";

export const test = mergeTests(pageObjectFixture, TaskFixture);

export { expect } from "@playwright/test";
