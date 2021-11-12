const express = require('express')
const router = express.Router()
const getAllScript = require('../scripts/getAllData')


// returns true if all match keys are valid

function isMatchObject(maybe) {
	if( (typeof maybe) !== 'object' ) {
		return false
	}

	let keys = Object.keys(maybe) 
	if( !keys.includes('loserId') || !keys.includes('winnerId') ) {
		return false
	}

	return true
}


router.get('/:id', async (req, res) => {
	const possibleID = await getAllScript.getMatchObj(req.params.id)
	let reqUrl = req.params.id
	let array = await getAllScript.getAllMatchId()
	if (!array.includes(reqUrl)) {
        res.sendStatus(404) 
	}
	else {
        res.status(200).send(possibleID)
        console.log('successsss')
	}
})

router.get('/matchWinners/:id', async (req, res) => {
    let id = req.params.id
	let array = await getAllScript.getOneMatchWinner(id)
	if (array.length <= 0) {
		res.status(404).send([])
	} 
	else {
		res.status(200).send(array)
	}
})


router.get('/', async (req, res) => {
	let array = await getAllScript.getAllMatches()
	res.status(200).send(array)
})






router.post('/', async (req, res) => {
    let postedObj = req.body
    let idArray = await getAllScript.getAllId()

let postedObjectValues = Object.values(postedObj)



console.log('postedobjArray: ', postedObjectValues)

console.log(postedObjectValues.every( ai => idArray.includes(ai) ))

	if (!isMatchObject(postedObj)) {
        res.sendStatus(400)
        console.log(Object.values(postedObj))
    }
  //  else if(!postedObjectValues.every( ai => idArray.includes(ai) )) {
  //      res.sendStatus(400)
  //  }
    
	else {
		res.send(await getAllScript.addOneMatch(postedObj))
	}
})

router.delete('/:id', async (req, res) => {
	let reqUrl = req.params.id
	let array = await getAllScript.getAllMatchId()

	if( !array.includes(reqUrl)) {
		res.sendStatus(404)
	}
	else {
		await getAllScript.deleteOneMatch(reqUrl)
		res.sendStatus(200)
	}
})

module.exports = router;
