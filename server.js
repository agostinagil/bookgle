import express from "express";
import cors from "cors";
const app = express();

app.use(cors());
app.get("/api", (req, res) => {
  res.json({ message: "CORS habilitado" });
});

app.listen(3000, () => console.log("Servidor en http://localhost:5173"));
