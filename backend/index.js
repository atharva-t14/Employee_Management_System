const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const salaryRoutes = require('./routes/salary');
const leavesRoutes = require('./routes/leaves');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/employee_management', {});

app.use('/api/auth', authRoutes);
app.use('/api/salary', salaryRoutes);
app.use('/api/leaves', leavesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



/*
const express = require('express');
const app = express();
const port = 3000;
const db = require('./db');
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/employees', (req, res) => {
    db.query('SELECT * FROM EMPLOYEE', (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});


app.post('/getEmployeeId', (req, res) => {
    const { email } = req.body;
    db.query('SELECT EMPLOYEE_ID FROM EMPLOYEE WHERE EMAIL = ?', [email], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            res.json({ employeeId: results[0].EMPLOYEE_ID });
        } else {
            res.status(404).send('Employee not found');
        }
    });
});



app.get('/profile/:id', (req, res) => {
    db.query('SELECT * FROM EMPLOYEE where EMPLOYEE_ID = ?', [req.params.id], (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            res.json(results[0]);
        } else {
            res.status(404).send('Profile not found');
        }
    });
})


app.get('/salary/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await db.query(
            'SELECT SICK_LEAVES_ALLOTED, SICK_LEAVES_TAKEN, CASUAL_LEAVES_ALLOTED, CASUAL_LEAVES_TAKEN FROM SALARY WHERE EMPLOYEE_ID = $1',
            [id]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching salary data:', error);
        res.status(500).send('Server error');
    }
});


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
*/