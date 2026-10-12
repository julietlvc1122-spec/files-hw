import express from "express";
import db from "#db/client";
import { getFolders, getFiles, getOneFolder, createFile } from "db/queries.js";
const app = express();
app.use(express.json());

app.get("/folders", async (req, res) => {
  const folders = await getFolders();
  res.send(folders);
});
app.get("/files", async (req, res) => {
  const files = await getFiles();
  res.send(files);
});
app.get("/folders/:id", async (req, res) => {
  const folder = await getOneFolder(req.params.id);
  if (!folder) {
    return res.status(404).send();
  }
  return res.status(200).send(folder);
});
app.post("/folders/:id/files", async (req, res) => {
  if (
    !req.body ||
    req.body.name == null ||
    req.body.name === "" ||
    req.body.size == null
  ) {
    return res.status(400).send();
  }
  const folder = await getOneFolder(req.params.id);
  if (!folder) {
    return res.status(404).send();
  }
  const file = await createFile({ ...req.body, folder_id: folder.id });
  return res.status(201).send(file);
});
export default app;
