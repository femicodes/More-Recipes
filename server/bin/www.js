// Application entry

import http from 'http';
import app from '../app';


const port = parseInt(process.env.PORT, 10) || 80;
app.set('port', port);

const server = http.createServer(app);

// Start server ! 
server.listen(port, () => console.log(`Navigate your browser to 127.0.0.1:${port}`));

