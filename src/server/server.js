import express, { json } from 'express';
import cors from 'cors';
import db from './config/db.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv'
dotenv.config();
import cookieParser from 'cookie-parser';
import auth from './middlewares/auth.js';
const app = express();
const port = 3000;


app.use(json());
app.use(cors({ origin: true, credentials: true }));
app.use(cookieParser());


app.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = (await db.query(`select username, password from t_user where username = $1 and password = $2;`, [username, password])).rows[0];
        if (!user)
            return res.status(400).json({ error: 'The credentials are wrong !' });
        const expir = 3600;
        const token = jwt.sign({ username }, process.env.JWTSECRET, {
            expiresIn: expir + 's',
        });
        res.cookie('token', token, { httpOnly: true, maxAge: expir * 1000 });
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong !' });
    }
});

app.post('/add-announcement', auth, async (req, res) => {
    try {
        const { title, description, date } = req.body;
        await db.query(`insert into t_announcement(title,description,date)values($1,$2,$3);`, [title, description, date]);
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong !' });
    }
});

app.get('/get-announcements', async (req, res) => {
    try {
        const announcements = (await db.query(`select * from t_announcement order by id desc;`)).rows;
        res.json({ announcements });
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong !' });
    }
})

app.delete('/delete-announcement/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(`delete from t_announcement where id = $1;`, [id]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong !' });
    }
});

app.put('/update-announcement', auth, async (req, res) => {
    const { id, title, description } = req.body;
    try {
        await db.query(`update t_announcement set title=$2, description=$3 where id = $1`, [id, title, description]);
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong !' });
    }
});

app.post('/add-player', auth, async (req, res) => {
    try {
        const { name, position, section, height } = req.body;
        await db.query(`insert into t_player (name,position,section,height)values($1, $2, $3, $4);`, [name, position, section, height]);
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong !' });
    }
});

app.get('/get-players/:section', async (req, res) => {
    try {
        const { section } = req.params;
        const players = (await db.query(`select * from t_player where section = $1;`, [section])).rows;
        res.send(players);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong !' });
    }
});

app.delete('/delete-player/:id', auth, async (req, res) => {
    const { id } = req.params;
    try {
        await db.query(`delete from t_player where id = $1;`, [id]);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Something went wrong !' });
    }
});

app.put('/update-player', auth, async (req, res) => {
    const { id, name, position, height } = req.body;
    try {
        await db.query(`update t_player set name = $2, position = $3, height = $4 where id = $1`, [id, name, position, parseInt(height)]);
        res.sendStatus(200);
    } catch (error) {
        return res.status(500).json({ error: 'Something went wrong !' });
    }
});

app.get('/session', auth, (_, res) => {
    res.sendStatus(200);
});

app.get('/clear-session', (_, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
