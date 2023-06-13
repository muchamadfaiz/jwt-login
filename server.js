const express = require('express');
const app = express();
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();


// Simulasi hasil dari metode 'findByPk' -> sebuah instance dari model tersebut yg merepresentasikan baris pengguna dari database
const data = {
    users: [
        {
            id: 1,
            email: 'user1@gmail.com',
            password: 'password1',
            createdAt: "2023-06-12T06:00:00.000Z",
            updatedAt: "2023-06-12T06:00:00.000Z"
        },
        {
            id: 2,
            email: 'user2@gmail.com',
            password: 'password2',
            createdAt: "2023-06-12T06:00:00.000Z",
            updatedAt: "2023-06-12T06:00:00.000Z"
        },
    ]
};

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const user = data.users.find(user => user.email === email && user.password === password)

    if (user) {
        // Creating JWT Token
        const token = jwt.sign({
            userId: user.id,
            userEmail: user.email
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '50s'
        }) //jwt.sign(payload, secretkey, option)
        res.status(200).json({
            status: 200,
            message: 'Login Successfull',
            user: {
                id: user.id,
                email: user.email,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
            token // sending token to client
        });
    } else {
        res.status(400).json({
            status: 400,
            message: 'Invalid email or password',
        })
    }
}
)

// Use express.json middleware to parse JSON requests become object JS
app.use(express.json())


app.use('/', router);



const PORT = process.env.PORT

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`)
})