import { faker } from "@faker-js/faker";
import { createEmployee } from "./queries/employees.js";

import db from "#db/client";

await db.connect();
await seedEmployees();
await db.end();
console.log("🌱 Database seeded.");

async function seedEmployees() {
  for (let i = 0; i < 10; i++) {
    const employee = {
      name: faker.person.fullName(),
      birthday: faker.date.birthdate({ min: 1950, max: 2005, mode: "year" }),
      salary: faker.number.int({ min: 40000, max: 150000 })
    };

    await createEmployee(employee);
  }
}
