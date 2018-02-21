import Lists from './lists'

const API = process.env.ENV === 'production' ? '/api' : 'http://localhost:3001'

export {
	Lists: new Lists({base: API}),
}
