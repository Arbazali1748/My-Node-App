import app from "./index.js";

const PORT = process.env.Port || process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
