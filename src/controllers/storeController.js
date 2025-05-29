const db = require('../config/db')

const showGames = (req, res) => {
	const query = 'SELECT * FROM tb_Juegos WHERE Precio > 0.00'
	db.query(query, (err, results) => {
		if (err) {
			console.log("no s epudo obtener la lista de juegos");
			return 0;
		}

		res.json(results)
		console.log(results)

	})
}

module.exports = showGames