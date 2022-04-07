import { v4 as uuid } from 'uuid';
import { writeFile, readFileContents } from '../service/file.service';

import { useSearchParams,useParams } from 'react-router-dom';
export const getUsers = (req, res) => {
	const users = readFileContents();
	console.log(`Users in the database: ${users}`);
	
	res.send(users);
};

export const createUser = (req, res) => {
	const user = req.body;

	const users = readFileContents();
	users.push({ ...user, id: uuid() });
	writeFile(JSON.stringify(users));

	console.log(`User [${user.username}] added to the database.`);

	res.send(user).status(203);
};

export const getUser = (req, res) => {

	//const [searchParams] = useSearchParams();
	const users = readFileContents();
	
	
	const foundUser = users.filter((user) => user.id === req.params.id);//req.params.userid
	res.send(foundUser);
};

export const deleteUser = (req, res) => {
	console.log(`user with id ${req.params.id} has been deleted`);

	let users = readFileContents();
	users = users.filter((user) => user.id !== req.params.id);
	writeFile(JSON.stringify(users));
	res.send(req.params.id);
};

export const updateUser = (req, res) => {
	let users = readFileContents();
	let user = users.find((user) => user.id === req.params.id);
	users = users.filter((user) => user.id !== req.params.id);
	user = {id: user.id, ...req.body};
	users.push(user);
	writeFile(JSON.stringify(users));

	console.log(
		`User has been updated to ${req.body}`
	);
	res.send(user);
};
