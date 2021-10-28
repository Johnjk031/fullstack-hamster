const express = require('express')
const router = express.Router()
const getAllScript = require('../scripts/getAllData')


// returns true if all hamster keys are valid

function isHamsterObject(maybe) {
	if( (typeof maybe) !== 'object' ) {
		return false
	}

	let keys = Object.keys(maybe) 
	if( !keys.includes('name') || !keys.includes('age') || !keys.includes('favFood') || !keys.includes('loves') || !keys.includes('imgName') || !keys.includes('wins') || !keys.includes('defeats') || !keys.includes('games') ) {
		return false
	}

	return true
}

// returns true if array2 is a subset of array1

function isSubset(array1, array2) {
	
	return array2.every(function (element) {
	  return array1.includes(element);
	});
  }


// all hamster keys stored in array 

const currentValue = ['name', 'age', 'favFood', 'loves', 'imgName', 'wins', 'defeats', 'games']

// return true if any object keys are valid

function isIncluded(maybe) {
	if( (typeof maybe) !== 'object' ) {
		return false
	}

	let keys = Object.keys(maybe) 
	if( keys.includes('name') || keys.includes('age') || keys.includes('favFood') || keys.includes('loves') || keys.includes('imgName') || keys.includes('wins') || keys.includes('defeats') || keys.includes('games') ) {
		return true
	}

	return false
}






router.get('/', async (req, res) => {
	let array = await getAllScript.getAll()
	res.status(200).send(array)
})

router.get('/random', async (req, res) => {
	let random = await getAllScript.getRandom()
	res.send(random)
})

router.get('/cutest', async (req, res) => {
	const possibleID = await getAllScript.getCutest()
	res.send(possibleID)
})


router.get('/:id', async (req, res) => {
	const possibleID = await getAllScript.getOne(req.params.id)
	let reqUrl = req.params.id
	let array = await getAllScript.getAllId()
	if (!array.includes(reqUrl)) {
        res.sendStatus(404) 
	}
	else {
		res.send(possibleID)
	}
})



router.post('/', async (req, res) => {
	let postedObj = req.body
	if (!isHamsterObject(postedObj)) {
		res.sendStatus(400)
	}
	else {
		res.send(await getAllScript.addOne(postedObj))
	}
})



router.put('/:id', async (req, res) => {
    console.log('put function')
	const postedObj = req.body
	let reqUrl = req.params.id
	let array = await getAllScript.getAllId()

   let bodyReqArray = Object.getOwnPropertyNames(postedObj)
  

   
  if(!isSubset(currentValue, bodyReqArray) || (!isIncluded(postedObj))) {
	console.log('here it is', postedObj)
	 res.sendStatus(400)
  }

	else if( !array.includes(reqUrl)) {
		console.log('no id')
		res.sendStatus(404)
	}

	else {
		
		console.log('put / ok')
		await getAllScript.updateOne(req.params.id, postedObj)
		res.sendStatus(200)
	}
})

router.delete('/:id', async (req, res) => {
	let reqUrl = req.params.id
	let array = await getAllScript.getAllId()

	if( !array.includes(reqUrl)) {
		res.sendStatus(404)
	}
	else {
		await getAllScript.deleteOne(reqUrl)
		res.sendStatus(200)
	}
})




module.exports = router;
