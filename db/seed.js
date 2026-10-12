import db from "#db/client";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const SQL = `
INSERT INTO folders (name)
VAlUES ('Woodworking Ideas'),
('DIY projects'),
('Inspiration')
RETURNING *;
`;
  const { rows: folders } = await db.query(SQL);

  const files = [
    { name: "Shelf Plans", size: 120, folderName: "Woodworking Ideas" },
    { name: "Wood Measurements", size: 85, folderName: "Woodworking Ideas" },
    { name: "Tool Checklist", size: 60, folderName: "Woodworking Ideas" },
    { name: "Cutting Guide", size: 150, folderName: "Woodworking Ideas" },
    { name: "Workbench Sketch", size: 200, folderName: "Woodworking Ideas" },

    { name: "Birdhouse Guide", size: 180, folderName: "DIY projects" },
    { name: "Plant Stand Plans", size: 240, folderName: "DIY projects" },
    { name: "Materials List", size: 45, folderName: "DIY projects" },
    { name: "Toy Box Design", size: 300, folderName: "DIY projects" },
    { name: "Picture Frame Guide", size: 95, folderName: "DIY projects" },

    { name: "Workshop Photos", size: 350, folderName: "Inspiration" },
    { name: "Rustic Table Ideas", size: 125, folderName: "Inspiration" },
    { name: "Wood Finishes", size: 90, folderName: "Inspiration" },
    { name: "Garden Bench Ideas", size: 210, folderName: "Inspiration" },
    { name: "Cabinet Inspiration", size: 175, folderName: "Inspiration" },
  ];
  // places files in correct folder
  for (const file of files) {
    const folder = folders.find((folder) => folder.name === file.folderName);
    const fileSQL = `
      INSERT INTO files (name, size, folder_id)
      VALUES ($1, $2, $3)
      RETURNING *;
    `;

    await db.query(fileSQL, [file.name, file.size, folder.id]);
  }
}
