import { app } from './server';
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => console.log(`🔥 API on http://localhost:${PORT}`));
