// require('dotenv').config();
// const REDIS_PORT = process.env.REDIS_PORT || 5000

// let client = require('redis').createClient(REDIS_PORT);

// const cache = (req, res, next) => {
//     const { username } = req.params;
//
//     client.get(username, (err, data) => {
//         if (err) throw err;
//
//         if (data !== null) {
//             res.send(setResponse(username, data));
//         } else {
//             next();
//         }
//     });
// }