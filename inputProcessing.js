let sampleInput = 'Sif (Zacian) @ Rusted Sword  \nAbility: Intrepid Sword  \nEVs: 252 Atk / 4 SpD / 252 Spe  \nJolly Nature  \n- Protect  \n- Play Rough  \n- Iron Head  \n- Sacred Sword';
let sampleInput2 = "HTV-2 (Whimsicott) (M) @ Mental Herb  \nAbility: Prankster  \nShiny: Yes  \nEVs: 252 HP / 4 SpA / 252 Spe  \nTimid Nature  \nIVs: 23 Atk  \n- Moonblast  \n- Tailwind  \n- Taunt  \n- Helping Hand";

console.log(sampleInput2);

let species;
let nickname;
let gender;
let item
let ability;
let nature;
const IVs = [31,31,31,31,31,31];
const EVs = [0,0,0,0,0,0];
let move1;
let move2;
let move3;
let move4;
const lines = sampleInput2.split("\n");

parseLine(lines[0],true);

//for(let i = 1; i < lines.length; i++){
	//parseLine(lines[i], false);
//}

function parseLine (line, isFirstLine){
	if(isFirstLine){
		[line, item] = line.split(' @ ');
		if (line.endsWith(' (M)')) {
    	gender = 'M';
      line = line.slice(0, -4);
    }
    if (line.endsWith(' (F)')) {
      gender = 'F';
      line = line.slice(0, -4);
    }
		let parenIndex = line.lastIndexOf(' (');
    if (line.charAt(line.length - 1) === ')' && parenIndex !== -1) {
      species = line.slice(parenIndex + 2, -1);
      nickname = line.slice(0, parenIndex);
      }
		else {
      species = line;
    }
	}
}

console.log(nickname);
console.log(species);
console.log(item);
console.log(gender);
