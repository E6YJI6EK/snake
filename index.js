const path = require('path')
const express = require('express')

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'static')));
app.get('/', (request, response) => {
	response.sendFile(path.resolve('index.html'))
})

app.listen(PORT, () => {
	console.log('Server is running')
})