const path = require('path')
const mod = require(path.join(process.cwd(), process.argv[2]))

const fn = mod.default || mod;

fn()
.then(() => process.exit(0))
.catch(err => {
	console.log(err);
	process.exit(1)
})