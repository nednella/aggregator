import express from "express";
import cors from "cors";
import { getUserDashboard } from "./service";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/api/dashboard/:username", async (req, res) => {
    const { username } = req.params;
    const dashboard = await getUserDashboard(username);
    res.status(200).json(dashboard);
});

app.listen(PORT, () => {
    console.log(`BFF server running on http://localhost:${PORT}`);
    console.log(`Dashboard endpoint: GET /api/dashboard/:username`);
    console.log(`\nMake sure mock services are running on port 4000`);
});
