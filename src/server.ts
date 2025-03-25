import app from './app';
import { testConnection } from './database/database';

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
    console.log(`🚀 Server running on port: ${PORT}`);
    await testConnection();
});
