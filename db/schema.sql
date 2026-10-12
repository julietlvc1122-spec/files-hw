-- created the folder
CREATE TABLE folders (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE
);
--created the files 
CREATE TABLE files (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  size INTEGER NOT NULL,
  folder_id INTEGER NOT NULL REFERENCES folders(id) ON DELETE CASCADE,
  UNIQUE (name, folder_id)
);