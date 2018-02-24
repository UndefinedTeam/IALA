import Lists from './lists'
import Session from './sessions'
import Tasks from './tasks'
import User from './user'
import Yelp from './yelp'

const API = process.env.NODE_ENV === 'production' ? 'https://iala.herokuapp.com/api' : 'http://localhost:3000/api'

export default function() {
	return {
		Lists: new Lists({base: API}),
		Session: new Session({base: API}),
		Tasks: new Tasks({base: API}),
		User: new User({base: API}),
		Yelp: new Yelp({base: API})
	}
}
