import db from "#db/client";

/** @returns the employee created according to the provided details */
export async function createEmployee({ name, birthday, salary }) {
    const result = await db.query(
        `
          INSERT INTO employees (name, birthday, salary)
          VALUES ($1, $2, $3)
          RETURNING *;
        `,
        [name, birthday, salary]
      );

      return result.rows[0];
}

// === Part 2 ===

/** @returns all employees */
export async function getEmployees() {
  const result = await db.query(`SELECT * FROM employees;`);
  return result.rows;
}

/**
 * @returns the employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function getEmployee(id) {
  const result = await db.query(
    `SELECT * FROM employees WHERE id = $1;`,
    [id]
  );

  return result.rows[0]; // undefined if not found
}

/**
 * @returns the updated employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function updateEmployee({ id, name, birthday, salary }) {
  const result = await db.query(
    `
      UPDATE employees
      SET name = $1, birthday = $2, salary = $3
      WHERE id = $4
      RETURNING *;
    `,
    [name, birthday, salary, id]
  );

  return result.rows[0];
}


/**
 * @returns the deleted employee with the given id
 * @returns undefined if employee with the given id does not exist
 */
export async function deleteEmployee(id) {
  const existing = await getEmployee(id);
  if (!existing) return undefined;

  await db.query(`DELETE FROM employees WHERE id = $1;`, [id]);

  return existing;
}

