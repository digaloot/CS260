const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();

const authCookieName = 'token';

// let users = {};
let users = [];
let people = [];
let dates = [];

// The service port. In production the front-end code is statically hosted by the service on the same port.
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// JSON body parsing using built-in middleware
app.use(express.json());

// Use the cookie parser middleware for tracking authentication tokens
app.use(cookieParser());

// Serve up the front-end static content hosting
app.use(express.static('public'));

// Router for service endpoints
var apiRouter = express.Router();
app.use(`/api`, apiRouter);





// CreateAuth a new user
apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.myName, req.body.email, req.body.password);
        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }
});

// GetAuth login an existing user
apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            setAuthCookie(res, user.token);
            res.send({ email: user.email });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});
  
// DeleteAuth logout a user
apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        delete user.token;
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});
  
// Middleware to verify that the user is authorized to call an endpoint
const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    // console.log(user)
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};
  



// GetPeople
apiRouter.get('/people', verifyAuth, (_req, res) => {
    res.send(people);
});
 
// Get people filtered by the username
apiRouter.post('/peopleFiltered', verifyAuth, async (req, res) => {
    // console.log(req.body)
    const newPeople = await findPeople("userNome", req.body.userNome);
    res.send(newPeople);
});

// SubmitPerson
apiRouter.post('/addPerson', verifyAuth, (req, res) => {
    people.push(req.body);
    res.send(people);
});

// DeletePerson
apiRouter.delete('/deletePerson', verifyAuth, async (req, res) => {
    const newPeople = people.filter((person) => 
        JSON.stringify(person) != JSON.stringify(req.body)
    );
    people = newPeople
    let newDates = await findAltDates("nome", req.body.nome, "userNome", req.body.userNome)
    dates = newDates
    res.send(people);
});
    




// GetDates
apiRouter.get('/dates', verifyAuth, (req, res) => {
    res.send(dates);
});

// Get dates filtered by the important person and username
apiRouter.post('/datesFiltered', verifyAuth, async (req, res) => {
    const newDates = await findDates("nome", req.body.nome, "userNome", req.body.userNome);
    res.send(newDates);
});
    
// SubmitDate
apiRouter.post('/addDate', verifyAuth, (req, res) => {
    dates.push(req.body);
    res.send(dates);
});

// DeleteDate
apiRouter.delete('/deleteDate', verifyAuth, (req, res) => {
    const newDates = dates.filter((date) => 
        JSON.stringify(date) != JSON.stringify(req.body)
    );
    dates = newDates
    res.send(dates);
});
  




// Default error handler
app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

// Return the application's default page if the path is unknown
app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});





async function createUser(myName, email, password) {
    const passwordHash = await bcrypt.hash(password, 10);
    const user = {
        myName: myName,
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    users.push(user);
    return user;
}
  
async function findUser(field, value) {
    // console.log("findUser")
    // console.log(value)
    // console.log(users)
    if (!value) return null;
    return users.find((u) => {
        if(u[field] === undefined) return false;
        return u[field].toLowerCase() === value.toLowerCase();
    })
}

async function findPeople(field1, value1) {
    // console.log(value1)
    // console.log(people)
    if (!value1) return null;
    return people.filter((u) => 
        u[field1].toLowerCase() === value1.toLowerCase());
}

async function findDates(field1, value1, field2, value2) {
    if (!value1) return null;
    return dates.filter((u) => 
        u[field1].toLowerCase() === value1.toLowerCase() 
        && u[field2].toLowerCase() === value2.toLowerCase()
    );
}

async function findAltDates(field1, value1, field2, value2) {
    if (!value1) return null;
    return dates.filter((u) => 
        u[field1].toLowerCase() !== value1.toLowerCase() 
        || u[field2].toLowerCase() !== value2.toLowerCase()
    );
}

// setAuthCookie in the HTTP response
function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});