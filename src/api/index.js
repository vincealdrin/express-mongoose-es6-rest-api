import { Router } from 'express';
import { version } from '../../package.json';
import facets from './facets';
import todos from './todos';

export default ({ config, db }) => {
	const api = Router();

	// mount the facets resource
	api.use('/facets', facets({ config, db }));

	// mount the facets resource
	api.use('/todos', todos);
	// todos.use('/:id/:field', (req, res) => res.send(req.params));


	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	return api;
}
