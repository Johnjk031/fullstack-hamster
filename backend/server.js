const express = require('express')
const app = express()
const hamsterRouter = require('./src/routes/methods.js')
const matchRouter = require('./src/routes/matches')
const cors = require('cors')
const getAllScript = require('./src/scripts/getAllData')



const PORT = process.env.PORT || 1337

console.log('test')

app.use(cors())
app.use( express.urlencoded({ extended: true }) )
app.use( express.json() )


app.use((req, res, next) => {
	console.log(`${req.method}  ${req.url}`, req.body);
	next()
})

app.get('/', (req, res) => {
	res.send('hello world from john')
})

app.get('/matchWinners/:id', async (req, res) => {
    let id = req.params.id
	let array = await getAllScript.getOneMatchWinner(id)
	if (array.length <= 0) {
		res.sendStatus(404)
	} 
	else {
		res.status(200).send(array)
	}
})

app.get('/losers', async (req, res) => {
	let array = await getAllScript.getFiveLowest()
	res.status(200).send(array)
})

app.get('/winners', async (req, res) => {
	let array = await getAllScript.getFiveHighest()
	res.status(200).send(array)
})

app.use('/hamsters', hamsterRouter)
app.use('/matches', matchRouter)


app.listen(PORT, () => {
	console.log(`Server listening on localhost:${PORT}.`);
})