import db from "#db/client";

//returns all folders
export async function getFolders() {
  const SQL = `
    SELECT * FROM folders;
  `;
  const { rows } = await db.query(SQL);
  return rows;
}
export async function getOneFolder(id) {
  const SQL = `
    SELECT
      folders.*,
      COALESCE(json_agg(files) FILTER (WHERE files.id IS NOT NULL), '[]') AS files
    FROM folders
    LEFT JOIN files ON files.folder_id = folders.id
    WHERE folders.id = $1
    GROUP BY folders.id;
  `;
  const { rows } = await db.query(SQL, [id]);
  return rows[0];
}

// join and on this function replced the files id with the corresponding folder id that it belongs to
export async function getFiles() {
  const SQL = `
    SELECT files.*, folders.name AS folder_name
    FROM files
    JOIN folders
    ON files.folder_id = folders.id;`;
  const { rows } = await db.query(SQL);
  return rows;
}
export async function createFile({ name, size, folder_id }) {
  const SQL = `INSERT INTO files (name,size,folder_id)
     VALUES ($1,$2,$3) 
     RETURNING *;`;
  const { rows } = await db.query(SQL, [name, size, folder_id]);
  return rows[0];
}
