import { faker } from "@faker-js/faker/locale/en";
import dayjs from "dayjs";
import type { AddTaskModel } from "$examples/playwright/models/TaskModel";

const project = "CitizenM";
const futureDate = dayjs().add(3, "month");
const date = dayjs(futureDate).format("YYYY-MM-DD");

function prepareRandomTask(bodySentences = 1): AddTaskModel {
  const body = faker.lorem.sentences(bodySentences);
  return { body, project, date };
}

export default prepareRandomTask;
