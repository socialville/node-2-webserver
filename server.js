const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
var app = express();

//tell express we want to use partials
hbs.registerPartials(__dirname + '/views/partials');

//tell express which view engine we want to use
app.set('view engine', 'hbs');

//serve some documents
//setup static directory
app.use(express.static(__dirname + '/public'));

//register middleware
app.use((req, res, next) => {
    var now = new Date().toString();

    //console.log(`${now}: ${req.method} ${req.url}`);
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err)
        {
            console.log('Unaable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

//register a helper
//needs two parameters
//first the name of the helper
//second the function to execute
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
}); 

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
});

//define a route handler
app.get('/', (req, res) => {
    //respond
    //res.send('<h1>Hello Express</h1>');

    //respond with json
    // res.send({
    //     name: 'Luis',
    //     likes: [
    //         'reading', 'gaming'
    //     ]
    // });

    //render a template you might have setup
    res.render('home.hbs', {
        pageTitle: 'Welcome page',
        welcomeMessage: 'Welcome to site ' + new Date().getUTCDate(),
        //commented out because we're using a helper 
        //currentYear: new Date().getFullYear()
    });

});

//create second route
app.get('/about', (req, res) => {
    //res.send('About page');

    //render a template you might have setup
    res.render('about.hbs', {
        pageTitle: 'About page'
        //currentYear: new Date().getFullYear()
    });
});

//create a projects handler
app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects page',
        welcomeMessage: 'Welcome to my projects ' + new Date().getFullYear()
    });
});

//create route for bad links
app.get('/bad', (req, res) => {
    //res.send('Could not find what your looking for');

    res.send({
        errorMessage: 'Unable to handle request'
    });
});

//bind app to a port

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);

});