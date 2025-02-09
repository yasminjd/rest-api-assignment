const express = require('express');
const app = express();
const port = 3000;
const { v4: uuidv4 } = require('uuid'); // For generating unique IDs

// Middleware to parse JSON bodies
app.use(express.json());

// In-memory storage for users
const users = [];

// **************************************************************
// Implement the POST /users endpoint (Create a new user)
app.post('/users', (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const newUser = {
        id: uuidv4(),
        name,
        email,
    };

    users.push(newUser);
    res.status(201).json(newUser);
});

// Implement the GET /users/:id endpoint (Retrieve a user by ID)
app.get('/users/:id', (req, res) => {
    const { id } = req.params;

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(user);
});

// Implement the PUT /users/:id endpoint (Update a user by ID)
app.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }

    const user = users.find((user) => user.id === id);

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    user.name = name;
    user.email = email;
    res.status(200).json(user);
});

// Implement the DELETE /users/:id endpoint (Delete a user by ID)
app.delete('/users/:id', (req, res) => {
    const { id } = req.params;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'User not found' });
    }

    users.splice(userIndex, 1);
    res.status(204).send();
});

// Global 404 handler for unmatched routes
app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

// Do not touch the code below this comment
// **************************************************************

// Start the server (only if not in test mode)
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        console.log(`Server running at http://localhost:${port}`);
    });
}

module.exports = app; // Export the app for testing
