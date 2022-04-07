import fs from 'fs';

const FILENAME = './bestDbEver.json';

export const writeFile = (data) => {
	let dataToWrite;
	if (typeof data !== 'string') {
		dataToWrite = JSON.stringify(data);
	} else {
		dataToWrite = data;
	}
	fs.writeFileSync(FILENAME, data);
};

export const readFileContents = () => {
	const fileContent = fs.readFileSync(FILENAME);
	if (!fileContent) {
		return null;
	}
	try {
		return JSON.parse(fileContent);
	} catch (err) {
		console.error('Could not parse file contents', fileContent, FILENAME);
		return null;
	}
};
