const database = require('../connect.js')
const connect = database.connect
const db = connect()
const DATA = 'data'
const MATCHES = 'matches'


// Get all hamster objects
async function getAll() {
	const dataRef = db.collection(DATA)
	const dataSnapshot = await dataRef.get()

	if( dataSnapshot.empty ) {
		return []
	}

	const array = []

	await dataSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})
	return array
}


// Get all hamster id's 
async function getAllId() {

	const dataRef = db.collection(DATA)
	const dataSnapshot = await dataRef.get()

	if( dataSnapshot.empty ) {
		return []
	}

	const array = []

	await dataSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data.id)
	})
	return array
}

// get the hamster with most wins
async function getCutest() {

	const dataRef = db.collection(DATA)
	const dataSnapshot = await dataRef.get()

	if( dataSnapshot.empty ) {
		return []
	}

	const array = []

	await dataSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})
	
	const amounts = array.map((a) => a.wins)
const highestAmount = Math.max(...amounts);

const cutest = array.filter(arr => arr.wins - arr.defeats === highestAmount)

	return cutest
}






// get a random hamster object

async function getRandom() {

	const dataRef = db.collection(DATA)
		const dataSnapshot = await dataRef.get()

	if( dataSnapshot.empty ) {
		return []
	}

	const array = []
	
	await dataSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})
	const randomElement = array[Math.floor(Math.random() * array.length)]
	return randomElement
}


// Get a hamsterobject with the requested id

async function getOne(id) {
	const docId = id 

	const docSnapshot = await db.collection(DATA).doc(docId).get()

	if( !docSnapshot.exists ) {
		console.log('Could not find him!');
		return
	}
	const data = await docSnapshot.data()
	console.log('Found: ', data);
	return data
}

// add a hamster object

async function addOne(object) {

	const docRef = await db.collection(DATA).add(object)
	
    var mystr = `{ "id":"${docRef.id}" }` 
    var myobj = JSON.parse(mystr);
	
	console.log('Added document with the id ' + docRef.id);
console.log(typeof myobj)
	return myobj
}





// update a hamster object
 function updateOne(id, object) {
	const docRef = db.collection(DATA).doc(id)
	docRef.update(object)
}

//delete a hamster object

async function deleteOne(id) {
	const docId = id 

	const docRef = db.collection(DATA).doc(docId)
	const docSnapshot = await docRef.get()
	const result = await docRef.delete()
}



////////////// MATCHES OBJECT ////////////////////////


// get all match objects

async function getAllMatches() {
	const matchesRef = db.collection(MATCHES)
	const matchesSnapshot = await matchesRef.get()

	if( matchesSnapshot.empty ) {
		return []
	}

	const array = []

	await matchesSnapshot.forEach(async matchesRef => {
		const data = await matchesRef.data()
		data.id = matchesRef.id
		array.push(data)
	})
	return array
}

// get a specific match object
async function getMatchObj() {

	const matchRef = db.collection(MATCHES)
	const matchSnapshot = await matchRef.get()

	if( matchSnapshot.empty ) {
		return {}
	}

	let result = {}

	await matchSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		result = data
	})

	return result
}

// get all id's from matchobject

async function getAllMatchId() {

	const idRef = db.collection(MATCHES)
	const idSnapshot = await idRef.get()

	if( idSnapshot.empty ) {
		return []
	}

	const array = []

	await idSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data.id)
	})
	return array
}






// get all match object the selected hamster id have won

async function getOneMatchWinner(id) {

let docId = id

console.log('docId are: ', docId)
	
	// all the matchobjects
	const matchesRef = db.collection(MATCHES)
	const matchesSnapshot = await matchesRef.get()

	if( matchesSnapshot.empty ) {
		return []
	}

	const array = []

	

	await matchesSnapshot.forEach(async matchesRef => {
		const data = await matchesRef.data()
		data.id = matchesRef.id
		array.push(data)
		
	})
	// filter out the matches that selected hamster id have won
	let newArray = array.filter(shot => shot.winnerId === docId)
	console.log(newArray)

try {
	return newArray

}
	catch(err) {
		console.log(err)
	}
	
}


// add one match & return the object directly

async function addOneMatch(object) {

	const docRef = await db.collection(MATCHES).add(object)
	
    var mystr = `{ "id":"${docRef.id}" }` 
    var myobj = JSON.parse(mystr);
	
	console.log('Added document with the id ' + docRef.id);
return myobj
}

// delete one match 

async function deleteOneMatch(id) {
	const docId = id 

	const docRef = db.collection(MATCHES).doc(docId)
	const docSnapshot = await docRef.get()
	const result = await docRef.delete()
}


// get the top five most defeted 

async function getFiveLowest() {

	//// MATCHES DATA //////////

	const idRef = db.collection(MATCHES)
	const idSnapshot = await idRef.get()

	if( idSnapshot.empty ) {
		return []
	}

	const loserArray = []

	await idSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		loserArray.push(data.loserId)
	})


	///// HAMSTER DATA  ////////
	const dataRef = db.collection(DATA)
	const dataSnapshot = await dataRef.get()

	if( dataSnapshot.empty ) {
		return []
	}

	const array = []

	await dataSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})


	// filter out the hamster data that have participated in any matches
	let newArray = array.filter(arr => loserArray.includes(arr.id))
	
	// sort new array after most defeats
	newArray.sort((wins, lost) => lost.defeats - wins.defeats);

    //  slice out the first five
	const resultArray = newArray.slice(0, 5) 

console.log(resultArray)

return resultArray

}


// get the top five winners

async function getFiveHighest() {

		//// MATCHES DATA //////////

	const idRef = db.collection(MATCHES)
	const idSnapshot = await idRef.get()

	if( idSnapshot.empty ) {
		return []
	}

	const winnerArray = []

	await idSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		winnerArray.push(data.loserId)
	})


	///// HAMSTER DATA  ////////
	const dataRef = db.collection(DATA)
	const dataSnapshot = await dataRef.get()

	if( dataSnapshot.empty ) {
		return []
	}

	const array = []

	await dataSnapshot.forEach(async docRef => {
		const data = await docRef.data()
		data.id = docRef.id
		array.push(data)
	})

	// filter out the hamster data that have participated in any matches
	let newArray = array.filter(shot => winnerArray.includes(shot.id))
	
   // sort new array after most wins
	newArray.sort((firstItem, secondItem) => secondItem.wins - firstItem.wins);

   //  slice out the first five
	const resultArray = newArray.slice(0, 5) 

console.log(resultArray)

return resultArray

}








module.exports = {
// /Hamsters
getAll, getRandom, getOne, addOne, updateOne, getAllId, deleteOne, getCutest,
// /Matches
getAllMatches, getMatchObj, getAllMatchId, addOneMatch, deleteOneMatch, getOneMatchWinner, getFiveLowest, getFiveHighest
}