let sampleInput = 'Sif (Zacian) @ Rusted Sword  \nAbility: Intrepid Sword  \nEVs: 252 Atk / 4 SpD / 252 Spe  \nJolly Nature  \n- Protect  \n- Play Rough  \n- Iron Head  \n- Sacred Sword';
let sampleInput2 = "HTV-2 (Whimsicott) (M) @ Mental Herb  \nAbility: Prankster  \nShiny: Yes  \nEVs: 252 HP / 4 SpA / 252 Spe  \nTimid Nature  \nIVs: 23 Atk  \n- Moonblast  \n- Tailwind  \n- Taunt  \n- Helping Hand";
let sampleInput3 = 'CREATINE (Grimmsnarl-Gmax) @ Light Clay  \nAbility: Prankster  \nLevel: 53  \nShiny: Yes  \nEVs: 12 HP / 20 Atk / 4 Def / 12 SpA / 252 SpD / 208 Spe  \nQuiet Nature  \nIVs: 15 HP / 14 Atk / 12 Def / 11 SpA / 10 SpD / 9 Spe  \n- Light Screen  \n- Reflect  \n- Darkest Lariat  \n- Spirit Break';

//set up the various fields we will use to store relevent info
//parsed from the input string
let species;
let nickname;
let gender;
let item;
let ability;
let nature;
let isShiny = false;
let level = 100;
const IVs = [31,31,31,31,31,31];
const EVs = [0,0,0,0,0,0];
const moves = [];

//Break up the input into lines
const lines = sampleInput3.split("\n");

//Parse the first line seperately because its the most complicated
parseLine(lines[0],true);

//Parse the rest of the lines
for(let i = 1; i < lines.length; i++){
	parseLine(lines[i], false);
}

function parseLine (line, isFirstLine){
	if(isFirstLine){
		[line, item] = line.split(' @ ');
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

console.log(nickname);
console.log(species);
console.log(item);
console.log(gender);
console.log(ability);
console.log(isShiny);
console.log(nature);
console.log(level);
console.log(moves);
console.log(EVs);
console.log(IVs);
