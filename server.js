const express = require('express');
const app = express();
const PORT = 8000;

// app.use(express.static('public))
app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    // res.sendFile(path.join(__dirname, '/public', index.html))
    res.sendFile('index.html');
});

app.listen(PORT, () => {
    console.log(`Snake-Game-Snap server listening on PORT ${PORT}`);
});