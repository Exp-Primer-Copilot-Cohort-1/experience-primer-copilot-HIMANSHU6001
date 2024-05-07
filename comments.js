// create a web server
// create a simple form
// when the form is submitted, check if the comment is spam
// if it is spam, display an error message
// if it is not spam, save the comment to a file
// and display a success message
// also display a list of all comments

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const axios = require('axios');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send(`
        <form method="POST" action="/comment">
            <input type="text" name="comment">
            <button type="submit">Submit</button>
        </form>
    `);
});

app.post('/comment', async (req, res) => {
    const comment = req.body.comment;
    const spam = await isSpam(comment);

    if (spam) {
        res.send('Error: Comment is spam');
    } else {
        const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
        comments.push(comment);
        fs.writeFileSync('comments.json', JSON.stringify(comments));
        res.send('Success: Comment saved');
    }
});

app.get('/comments', (req, res) => {
    const comments = JSON.parse(fs.readFileSync('comments.json', 'utf8'));
    res.send(comments);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});


