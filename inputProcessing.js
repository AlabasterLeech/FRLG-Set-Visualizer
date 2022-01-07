function parseInput(input){
	//set up the various fields we will use to store relevent info
	//parsed from the input string
	let species = "";
	let nickname;
	let gender = "";
	let item = "";
	let ability = "";
	let nature;
	let isShiny = false;
	let level = 100;
	const IVs = [31,31,31,31,31,31];
	const EVs = [0,0,0,0,0,0];
	const moves = [];

	//Break up the input into lines
	const lines = input.split("\n");

	//Parse the first line seperately because its the most complicated
	parseLine(lines[0],true);

	//Parse the rest of the lines
	for(let i = 1; i < lines.length; i++){
		parseLine(lines[i], false);
	}

	function parseLine (line, isFirstLine){
		if(isFirstLine){
			[line, item] = line.split(' @ ');
			item = item.trim();
			gender = '';
			if(line.endsWith(' (M)')) {
				gender = 'M';
				line = line.slice(0, -4);
			}
			if(line.endsWith(' (F)')) {
				gender = 'F';
				line = line.slice(0, -4);
			}
			let parenIndex = line.lastIndexOf(' (');
			if(line.charAt(line.length - 1) === ')' && parenIndex !== -1) {
				species = line.slice(parenIndex + 2, -1);
				nickname = line.slice(0, parenIndex);
			}
			else {
				species = line;
			}
		}
		else if(line.startsWith('Trait: ')){
			line = line.slice(7);
			ability = line.trim();
		}
		else if(line.startsWith('Ability: ')){
			line = line.slice(9);
			ability = line.trim();
		}
		else if(line.startsWith('Shiny: Yes')){
			isShiny = true;
		}
		else if(line.startsWith('Gigantamax: Yes') && !species.endsWith('-Gmax')){
			species += '-Gmax';
		}
		else if(line.startsWith('Level: ')) {
			line = line.slice(7);
			level = Number(line);
		}
		else if(line.match(/^[A-Za-z]+ (N|n)ature/)){
			let natureIndex = line.indexOf(' Nature');
			if (natureIndex === -1) natureIndex = line.indexOf(' nature');
			nature = line.substr(0, natureIndex);
		}
		else if(line.startsWith('- ')){
			line = line.slice(2);
			moves.push(line.trim());
		}
		else if(line.startsWith('EVs: ')){
			line = line.slice(5).toLowerCase();

			if(line.indexOf('hp') > -1){
				let indexOfHP = line.indexOf('hp');
				EVs[0] = Number(line.substring(0,indexOfHP));
				line = line.slice(line.substring(0,indexOfHP).length + 5)
			}

			if(line.indexOf('atk') > -1){
				let indexOfAtk = line.indexOf('atk');
				EVs[1] = Number(line.substring(0,indexOfAtk));
				line = line.slice(line.substring(0,indexOfAtk).length + 6)
			}

			if(line.indexOf('def') > -1){
				let indexOfDef = line.indexOf('def');
				EVs[2] = Number(line.substring(0,indexOfDef));
				line = line.slice(line.substring(0,indexOfDef).length + 6)
			}

			if(line.indexOf('spa') > -1){
				let indexOfSpa = line.indexOf('spa');
				EVs[3] = Number(line.substring(0,indexOfSpa));
				line = line.slice(line.substring(0,indexOfSpa).length + 6)
			}

			if(line.indexOf('spd') > -1){
				let indexOfSpd = line.indexOf('spd');
				EVs[4] = Number(line.substring(0,indexOfSpd));
				line = line.slice(line.substring(0,indexOfSpd).length + 6)
			}

			if(line.indexOf('spe') > -1){
				let indexOfSpe = line.indexOf('spe');
				EVs[5] = Number(line.substring(0,indexOfSpe));
			}
		}
		else if(line.startsWith('IVs: ')){
			line = line.slice(5).toLowerCase();

			if(line.indexOf('hp') > -1){
				let indexOfHP = line.indexOf('hp');
				IVs[0] = Number(line.substring(0,indexOfHP));
				line = line.slice(line.substring(0,indexOfHP).length + 5)
			}

			if(line.indexOf('atk') > -1){
				let indexOfAtk = line.indexOf('atk');
				IVs[1] = Number(line.substring(0,indexOfAtk));
				line = line.slice(line.substring(0,indexOfAtk).length + 6)
			}

			if(line.indexOf('def') > -1){
				let indexOfDef = line.indexOf('def');
				IVs[2] = Number(line.substring(0,indexOfDef));
				line = line.slice(line.substring(0,indexOfDef).length + 6)
			}

			if(line.indexOf('spa') > -1){
				let indexOfSpa = line.indexOf('spa');
				IVs[3] = Number(line.substring(0,indexOfSpa));
				line = line.slice(line.substring(0,indexOfSpa).length + 6)
			}

			if(line.indexOf('spd') > -1){
				let indexOfSpd = line.indexOf('spd');
				IVs[4] = Number(line.substring(0,indexOfSpd));
				line = line.slice(line.substring(0,indexOfSpd).length + 6)
			}

			if(line.indexOf('spe') > -1){
				let indexOfSpe = line.indexOf('spe');
				IVs[5] = Number(line.substring(0,indexOfSpe));
			}
		}
	}

	if(!(nickname)){
		nickname = species;
	}

	if(!(nature)){
		nature = "Serious";
	}

	const returns = [];
	returns.push(nickname);
	returns.push(species);
	returns.push(item);
	returns.push(gender);
	returns.push(ability);
	returns.push(isShiny);
	returns.push(nature);
	returns.push(level);
	returns.push(moves);
	returns.push(EVs);
	returns.push(IVs);

	return returns;
}
