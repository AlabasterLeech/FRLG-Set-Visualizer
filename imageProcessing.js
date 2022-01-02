const jimp = require('jimp');
const fs = require('fs');
const fetch = require('node-fetch');

const pkNumLookup = {
  bulbasaur: "1",
  ivysaur: "2",
  venusaur: "3",
  charmander: "4",
  charmeleon: "5",
  charizard: "6",
  squirtle: "7",
  wartortle: "8",
  blastoise: "9",
  caterpie: "10",
  metapod: "11",
  butterfree: "12",
  weedle: "13",
  kakuna: "14",
  beedrill: "15",
  pidgey: "16",
  pidgeotto: "17",
  pidgeot: "18",
  rattata: "19",
  raticate: "20",
  spearow: "21",
  fearow: "22",
  ekans: "23",
  arbok: "24",
  pikachu: "25",
  raichu: "26",
  sandshrew: "27",
  sandslash: "28",
  nidoranf: "29",
  nidorina: "30",
  nidoqueen: "31",
  nidoranm: "32",
  nidorino: "33",
  nidoking: "34",
  clefairy: "35",
  clefable: "36",
  vulpix: "37",
  ninetales: "38",
  jigglypuff: "39",
  wigglytuff: "40",
  zubat: "41",
  golbat: "42",
  oddish: "43",
  gloom: "44",
  vileplume: "45",
  paras: "46",
  parasect: "47",
  venonat: "48",
  venomoth: "49",
  diglett: "50",
  dugtrio: "51",
  meowth: "52",
  persian: "53",
  psyduck: "54",
  golduck: "55",
  mankey: "56",
  primeape: "57",
  growlithe: "58",
  growlithe: "58",
  arcanine: "59",
  poliwag: "60",
  poliwhirl: "61",
  poliwrath: "62",
  abra: "63",
  kadabra: "64",
  alakazam: "65",
  machop: "66",
  machoke: "67",
  machamp: "68",
  bellsprout: "69",
  weepinbell: "70",
  victreebel: "71",
  tentacool: "72",
  tentacruel: "73",
  geodude: "74",
  graveler: "75",
  golem: "76",
  ponyta: "77",
  rapidash: "78",
  slowpoke: "79",
  slowbro: "80",
  magnemite: "81",
  magneton: "82",
  farfetchd: "83",
  doduo: "84",
  dodrio: "85",
  seel: "86",
  dewgong: "87",
  grimer: "88",
  muk: "89",
  shellder: "90",
  cloyster: "91",
  gastly: "92",
  haunter: "93",
  gengar: "94",
  onix: "95",
  drowzee: "96",
  hypno: "97",
  krabby: "98",
  kingler: "99",
  voltorb: "100",
  electrode: "101",
  exeggcute: "102",
  exeggutor: "103",
  cubone: "104",
  marowak: "105",
  hitmonlee: "106",
  hitmonchan: "107",
  lickitung: "108",
  koffing: "109",
  weezing: "110",
  rhyhorn: "111",
  rhydon: "112",
  chansey: "113",
  tangela: "114",
  kangaskhan: "115",
  horsea: "116",
  seadra: "117",
  goldeen: "118",
  seaking: "119",
  staryu: "120",
  starmie: "121",
  mrmime: "122",
  scyther: "123",
  jynx: "124",
  electabuzz: "125",
  magmar: "126",
  pinsir: "127",
  tauros: "128",
  magikarp: "129",
  gyarados: "130",
  lapras: "131",
  ditto: "132",
  eevee: "133",
  vaporeon: "134",
  jolteon: "135",
  flareon: "136",
  porygon: "137",
  omanyte: "138",
  omastar: "139",
  kabuto: "140",
  kabutops: "141",
  aerodactyl: "142",
  snorlax: "143",
  articuno: "144",
  zapdos: "145",
  moltres: "146",
  dratini: "147",
  dragonair: "148",
  dragonite: "149",
  mewtwo: "150",
  mew: "151",
  chikorita: "152",
  bayleef: "153",
  meganium: "154",
  cyndaquil: "155",
  quilava: "156",
  typhlosion: "157",
  totodile: "158",
  croconaw: "159",
  feraligatr: "160",
  sentret: "161",
  furret: "162",
  hoothoot: "163",
  noctowl: "164",
  ledyba: "165",
  ledian: "166",
  spinarak: "167",
  ariados: "168",
  crobat: "169",
  chinchou: "170",
  lanturn: "171",
  pichu: "172",
  cleffa: "173",
  igglybuff: "174",
  togepi: "175",
  togetic: "176",
  natu: "177",
  xatu: "178",
  mareep: "179",
  flaaffy: "180",
  ampharos: "181",
  bellossom: "182",
  marill: "183",
  azumarill: "184",
  sudowoodo: "185",
  politoed: "186",
  hoppip: "187",
  skiploom: "188",
  jumpluff: "189",
  aipom: "190",
  sunkern: "191",
  sunflora: "192",
  yanma: "193",
  wooper: "194",
  quagsire: "195",
  espeon: "196",
  umbreon: "197",
  murkrow: "198",
  slowking: "199",
  misdreavus: "200",
  unown: "201-a",
  unowna: "201-a",
  unownb: "201-b",
  unownc: "201-c",
  unownd: "201-d",
  unowne: "201-e",
  unownf: "201-f",
  unowng: "201-g",
  unownh: "201-h",
  unowni: "201-i",
  unownj: "201-j",
  unownk: "201-k",
  unownl: "201-l",
  unownm: "201-m",
  unownn: "201-n",
  unowno: "201-o",
  unownp: "201-p",
  unownq: "201-q",
  unownr: "201-r",
  unowns: "201-s",
  unownt: "201-t",
  unownu: "201-u",
  unownv: "201-v",
  unownx: "201-x",
  unowny: "201-y",
  unownz: "201-z",
  wobbuffet: "202",
  girafarig: "203",
  pineco: "204",
  forretress: "205",
  dunsparce: "206",
  gligar: "207",
  steelix: "208",
  snubbull: "209",
  granbull: "210",
  qwilfish: "211",
  scizor: "212",
  shuckle: "213",
  heracross: "214",
  sneasel: "215",
  teddiursa: "216",
  ursaring: "217",
  slugma: "218",
  magcargo: "219",
  swinub: "220",
  piloswine: "221",
  corsola: "222",
  remoraid: "223",
  octillery: "224",
  delibird: "225",
  mantine: "226",
  skarmory: "227",
  houndour: "228",
  houndoom: "229",
  kingdra: "230",
  phanpy: "231",
  donphan: "232",
  porygon2: "233",
  stantler: "234",
  smeargle: "235",
  tyrogue: "236",
  hitmontop: "237",
  smoochum: "238",
  elekid: "239",
  magby: "240",
  miltank: "241",
  blissey: "242",
  raikou: "243",
  entei: "244",
  suicune: "245",
  larvitar: "246",
  pupitar: "247",
  tyranitar: "248",
  lugia: "249",
  hooh: "250",
  celebi: "251",
  treecko: "252",
  grovyle: "253",
  sceptile: "254",
  torchic: "255",
  combusken: "256",
  blaziken: "257",
  mudkip: "258",
  marshtomp: "259",
  swampert: "260",
  poochyena: "261",
  mightyena: "262",
  zigzagoon: "263",
  linoone: "264",
  wurmple: "265",
  silcoon: "266",
  beautifly: "267",
  cascoon: "268",
  dustox: "269",
  lotad: "270",
  lombre: "271",
  ludicolo: "272",
  seedot: "273",
  nuzleaf: "274",
  shiftry: "275",
  taillow: "276",
  swellow: "277",
  wingull: "278",
  pelipper: "279",
  ralts: "280",
  kirlia: "281",
  gardevoir: "282",
  surskit: "283",
  masquerain: "284",
  shroomish: "285",
  breloom: "286",
  slakoth: "287",
  vigoroth: "288",
  slaking: "289",
  nincada: "290",
  ninjask: "291",
  shedinja: "292",
  whismur: "293",
  loudred: "294",
  exploud: "295",
  makuhita: "296",
  hariyama: "297",
  azurill: "298",
  nosepass: "299",
  skitty: "300",
  delcatty: "301",
  sableye: "302",
  mawile: "303",
  aron: "304",
  lairon: "305",
  aggron: "306",
  meditite: "307",
  medicham: "308",
  electrike: "309",
  manectric: "310",
  plusle: "311",
  minun: "312",
  volbeat: "313",
  illumise: "314",
  roselia: "315",
  gulpin: "316",
  swalot: "317",
  carvanha: "318",
  sharpedo: "319",
  wailmer: "320",
  wailord: "321",
  numel: "322",
  camerupt: "323",
  torkoal: "324",
  spoink: "325",
  grumpig: "326",
  spinda: "327",
  trapinch: "328",
  vibrava: "329",
  flygon: "330",
  cacnea: "331",
  cacturne: "332",
  swablu: "333",
  altaria: "334",
  zangoose: "335",
  seviper: "336",
  lunatone: "337",
  solrock: "338",
  barboach: "339",
  whiscash: "340",
  corphish: "341",
  crawdaunt: "342",
  baltoy: "343",
  claydol: "344",
  lileep: "345",
  cradily: "346",
  anorith: "347",
  armaldo: "348",
  feebas: "349",
  milotic: "350",
  castform: "351",
  castformrainy: "351-rainy",
  castformsunny: "351-sunny",
  castformsnowy: "351-snowy",
  kecleon: "352",
  shuppet: "353",
  banette: "354",
  duskull: "355",
  dusclops: "356",
  tropius: "357",
  chimecho: "358",
  absol: "359",
  wynaut: "360",
  snorunt: "361",
  glalie: "362",
  spheal: "363",
  sealeo: "364",
  walrein: "365",
  clamperl: "366",
  huntail: "367",
  gorebyss: "368",
  relicanth: "369",
  luvdisc: "370",
  bagon: "371",
  shelgon: "372",
  salamence: "373",
  beldum: "374",
  metang: "375",
  metagross: "376",
  regirock: "377",
  regice: "378",
  registeel: "379",
  latias: "380",
  latios: "381",
  kyogre: "382",
  groudon: "383",
  rayquaza: "384",
  jirachi: "385",
  deoxys: "386",
  deoxysnormal: "386",
  deoxysattack: "386-attack",
  deoxysdefense: "386-defense",
  deoxysspeed: "386-speed",
};

const typeLookup = {
  pound: "normal",
  karatechop: "fighting",
  doubleslap: "normal",
  cometpunch: "normal",
  megapunch: "normal",
  payday: "normal",
  firepunch: "fire",
  icepunch: "ice",
  thunderpunch: "electric",
  scratch: "normal",
  visegrip: "normal",
  guillotine: "normal",
  razorwind: "normal",
  swordsdance: "normal",
  cut: "normal",
  gust: "flying",
  wingattack: "flying",
  whirlwind: "normal",
  fly: "flying",
  bind: "normal",
  slam: "normal",
  vinewhip: "grass",
  stomp: "normal",
  doublekick: "fighting",
  megakick: "normal",
  jumpkick: "fighting",
  rollingkick: "fighting",
  sandattack: "ground",
  headbutt: "normal",
  hornattack: "normal",
  furyattack: "normal",
  horndrill: "normal",
  tackle: "normal",
  bodyslam: "normal",
  wrap: "normal",
  takedown: "normal",
  thrash: "normal",
  doubleedge: "normal",
  tailwhip: "normal",
  poisonsting: "poison",
  twineedle: "bug",
  pinmissile: "bug",
  leer: "normal",
  bite: "dark",
  growl: "normal",
  roar: "normal",
  sing: "normal",
  supersonic: "normal",
  sonicboom: "normal",
  disable: "normal",
  acid: "poison",
  ember: "fire",
  flamethrower: "fire",
  mist: "ice",
  watergun: "water",
  hydropump: "water",
  surf: "water",
  icebeam: "ice",
  blizzard: "ice",
  psybeam: "psychic",
  bubblebeam: "water",
  aurorabeam: "ice",
  hyperbeam: "normal",
  peck: "flying",
  drillpeck: "flying",
  submission: "fighting",
  lowkick: "fighting",
  counter: "fighting",
  seismictoss: "fighting",
  strength: "normal",
  absorb: "grass",
  megadrain: "grass",
  leechseed: "grass",
  growth: "normal",
  razorleaf: "grass",
  solarbeam: "grass",
  poisonpowder: "poison",
  stunspore: "grass",
  sleeppowder: "grass",
  petaldance: "grass",
  stringshot: "bug",
  dragonrage: "dragon",
  firespin: "fire",
  thundershock: "electric",
  thunderbolt: "electric",
  thunderwave: "electric",
  thunder: "electric",
  rockthrow: "rock",
  earthquake: "ground",
  fissure: "ground",
  dig: "ground",
  toxic: "poison",
  confusion: "psychic",
  psychic: "psychic",
  hypnosis: "psychic",
  meditate: "psychic",
  agility: "psychic",
  quickattack: "normal",
  rage: "normal",
  teleport: "psychic",
  nightshade: "ghost",
  mimic: "normal",
  screech: "normal",
  doubleteam: "normal",
  recover: "normal",
  harden: "normal",
  minimize: "normal",
  smokescreen: "normal",
  confuseray: "ghost",
  withdraw: "water",
  defensecurl: "normal",
  barrier: "psychic",
  lightscreen: "psychic",
  haze: "ice",
  reflect: "psychic",
  focusenergy: "normal",
  bide: "normal",
  metronome: "normal",
  mirrormove: "flying",
  selfdestruct: "normal",
  eggbomb: "normal",
  lick: "ghost",
  smog: "poison",
  sludge: "poison",
  boneclub: "ground",
  fireblast: "fire",
  waterfall: "water",
  clamp: "water",
  swift: "normal",
  skullbash: "normal",
  spikecannon: "normal",
  constrict: "normal",
  amnesia: "psychic",
  kinesis: "psychic",
  softboiled: "normal",
  highjumpkick: "fighting",
  glare: "normal",
  dreameater: "psychic",
  poisongas: "poison",
  barrage: "normal",
  leechlife: "bug",
  lovelykiss: "normal",
  skyattack: "flying",
  transform: "normal",
  bubble: "water",
  dizzypunch: "normal",
  spore: "grass",
  flash: "normal",
  psywave: "psychic",
  splash: "normal",
  acidarmor: "poison",
  crabhammer: "water",
  explosion: "normal",
  furyswipes: "normal",
  bonemerang: "ground",
  rest: "psychic",
  rockslide: "rock",
  hyperfang: "normal",
  sharpen: "normal",
  conversion: "normal",
  triattack: "normal",
  superfang: "normal",
  slash: "normal",
  substitute: "normal",
  struggle: "normal",
  sketch: "normal",
  triplekick: "fighting",
  thief: "dark",
  spiderweb: "bug",
  mindreader: "normal",
  nightmare: "ghost",
  flamewheel: "fire",
  snore: "normal",
  curse: "ghost",
  flail: "normal",
  conversion2: "normal",
  aeroblast: "flying",
  cottonspore: "grass",
  reversal: "fighting",
  spite: "ghost",
  powdersnow: "ice",
  protect: "normal",
  machpunch: "fighting",
  scaryface: "normal",
  feintattack: "dark",
  sweetkiss: "fairy",
  bellydrum: "normal",
  sludgebomb: "poison",
  mudslap: "ground",
  octazooka: "water",
  spikes: "ground",
  zapcannon: "electric",
  foresight: "normal",
  destinybond: "ghost",
  perishsong: "normal",
  icywind: "ice",
  detect: "fighting",
  bonerush: "ground",
  lockon: "normal",
  outrage: "dragon",
  sandstorm: "rock",
  gigadrain: "grass",
  endure: "normal",
  charm: "fairy",
  rollout: "rock",
  falseswipe: "normal",
  swagger: "normal",
  milkdrink: "normal",
  spark: "electric",
  furycutter: "bug",
  steelwing: "steel",
  meanlook: "normal",
  attract: "normal",
  sleeptalk: "normal",
  healbell: "normal",
  return: "normal",
  present: "normal",
  frustration: "normal",
  safeguard: "normal",
  painsplit: "normal",
  sacredfire: "fire",
  magnitude: "ground",
  dynamicpunch: "fighting",
  megahorn: "bug",
  dragonbreath: "dragon",
  batonpass: "normal",
  encore: "normal",
  pursuit: "dark",
  rapidspin: "normal",
  sweetscent: "normal",
  irontail: "steel",
  metalclaw: "steel",
  vitalthrow: "fighting",
  morningsun: "normal",
  synthesis: "grass",
  moonlight: "fairy",
  hiddenpower: "normal",
  hiddenpowerice: "ice",
  hiddenpowergrass: "grass",
  hiddenpowerwater: "water",
  hiddenpowerfire: "fire",
  hiddenpowerground: "ground",
  hiddenpowerrock: "rock",
  hiddenpowersteel: "steel",
  hiddenpowerdragon: "dragon",
  hiddenpowerpoison: "poison",
  hiddenpowerghost: "ghost",
  hiddenpowerbug: "bug",
  hiddenpowerdark: "dark",
  hiddenpowerpsychic: "psychic",
  hiddenpowerflying: "flying",
  hiddenpowerelectric: "electric",
  crosschop: "fighting",
  twister: "dragon",
  raindance: "water",
  sunnyday: "fire",
  crunch: "dark",
  mirrorcoat: "psychic",
  psychup: "normal",
  extremespeed: "normal",
  ancientpower: "rock",
  shadowball: "ghost",
  futuresight: "psychic",
  rocksmash: "fighting",
  whirlpool: "water",
  beatup: "dark",
  fakeout: "normal",
  uproar: "normal",
  stockpile: "normal",
  spitup: "normal",
  swallow: "normal",
  heatwave: "fire",
  hail: "ice",
  torment: "dark",
  flatter: "dark",
  willowisp: "fire",
  memento: "dark",
  facade: "normal",
  focuspunch: "fighting",
  smellingsalts: "normal",
  followme: "normal",
  naturepower: "normal",
  charge: "electric",
  taunt: "dark",
  helpinghand: "normal",
  trick: "psychic",
  roleplay: "psychic",
  wish: "normal",
  assist: "normal",
  ingrain: "grass",
  superpower: "fighting",
  magiccoat: "psychic",
  recycle: "normal",
  revenge: "fighting",
  brickbreak: "fighting",
  yawn: "normal",
  knockoff: "dark",
  endeavor: "normal",
  eruption: "fire",
  skillswap: "psychic",
  imprison: "psychic",
  refresh: "normal",
  grudge: "ghost",
  snatch: "dark",
  secretpower: "normal",
  dive: "water",
  armthrust: "fighting",
  camouflage: "normal",
  tailglow: "bug",
  lusterpurge: "psychic",
  mistball: "psychic",
  featherdance: "flying",
  teeterdance: "normal",
  blazekick: "fire",
  mudsport: "ground",
  iceball: "ice",
  needlearm: "grass",
  slackoff: "normal",
  hypervoice: "normal",
  poisonfang: "poison",
  crushclaw: "normal",
  blastburn: "fire",
  hydrocannon: "water",
  meteormash: "steel",
  astonish: "ghost",
  weatherball: "normal",
  aromatherapy: "grass",
  faketears: "dark",
  aircutter: "flying",
  overheat: "fire",
  odorsleuth: "normal",
  rocktomb: "rock",
  silverwind: "bug",
  metalsound: "steel",
  grasswhistle: "grass",
  tickle: "normal",
  cosmicpower: "psychic",
  waterspout: "water",
  signalbeam: "bug",
  shadowpunch: "ghost",
  extrasensory: "psychic",
  skyuppercut: "fighting",
  sandtomb: "ground",
  sheercold: "ice",
  muddywater: "water",
  bulletseed: "grass",
  aerialace: "flying",
  iciclespear: "ice",
  irondefense: "steel",
  block: "normal",
  howl: "normal",
  dragonclaw: "dragon",
  frenzyplant: "grass",
  bulkup: "fighting",
  bounce: "flying",
  mudshot: "ground",
  poisontail: "poison",
  covet: "normal",
  volttackle: "electric",
  magicalleaf: "grass",
  watersport: "water",
  calmmind: "psychic",
  leafblade: "grass",
  dragondance: "dragon",
  rockblast: "rock",
  shockwave: "electric",
  waterpulse: "water",
  doomdesire: "steel",
  psychoboost: "psychic",
  roost: "flying",
  gravity: "psychic",
  miracleeye: "psychic",
  wakeupslap: "fighting",
  hammerarm: "fighting",
  gyroball: "steel",
  healingwish: "psychic",
  brine: "water",
  naturalgift: "normal",
  feint: "normal",
  pluck: "flying",
  tailwind: "flying",
  acupressure: "normal",
  metalburst: "steel",
  uturn: "bug",
  closecombat: "fighting",
  payback: "dark",
  assurance: "dark",
  embargo: "dark",
  fling: "dark",
  psychoshift: "psychic",
  trumpcard: "normal",
  healblock: "psychic",
  wringout: "normal",
  powertrick: "psychic",
  gastroacid: "poison",
  luckychant: "normal",
  mefirst: "normal",
  copycat: "normal",
  powerswap: "psychic",
  guardswap: "psychic",
  punishment: "dark",
  lastresort: "normal",
  worryseed: "grass",
  suckerpunch: "dark",
  toxicspikes: "poison",
  heartswap: "psychic",
  aquaring: "water",
  magnetrise: "electric",
  flareblitz: "fire",
  forcepalm: "fighting",
  aurasphere: "fighting",
  rockpolish: "rock",
  poisonjab: "poison",
  darkpulse: "dark",
  nightslash: "dark",
  aquatail: "water",
  seedbomb: "grass",
  airslash: "flying",
  xscissor: "bug",
  bugbuzz: "bug",
  dragonpulse: "dragon",
  dragonrush: "dragon",
  powergem: "rock",
  drainpunch: "fighting",
  vacuumwave: "fighting",
  focusblast: "fighting",
  energyball: "grass",
  bravebird: "flying",
  earthpower: "ground",
  switcheroo: "dark",
  gigaimpact: "normal",
  nastyplot: "dark",
  bulletpunch: "steel",
  avalanche: "ice",
  iceshard: "ice",
  shadowclaw: "ghost",
  thunderfang: "electric",
  icefang: "ice",
  firefang: "fire",
  shadowsneak: "ghost",
  mudbomb: "ground",
  psychocut: "psychic",
  zenheadbutt: "psychic",
  mirrorshot: "steel",
  flashcannon: "steel",
  rockclimb: "normal",
  defog: "flying",
  trickroom: "psychic",
  dracometeor: "dragon",
  discharge: "electric",
  lavaplume: "fire",
  leafstorm: "grass",
  powerwhip: "grass",
  rockwrecker: "rock",
  crosspoison: "poison",
  gunkshot: "poison",
  ironhead: "steel",
  magnetbomb: "steel",
  stoneedge: "rock",
  captivate: "normal",
  stealthrock: "rock",
  grassknot: "grass",
  chatter: "flying",
  judgment: "normal",
  bugbite: "bug",
  chargebeam: "electric",
  woodhammer: "grass",
  aquajet: "water",
  attackorder: "bug",
  defendorder: "bug",
  healorder: "bug",
  headsmash: "rock",
  doublehit: "normal",
  roaroftime: "dragon",
  spacialrend: "dragon",
  lunardance: "psychic",
  crushgrip: "normal",
  magmastorm: "fire",
  darkvoid: "dark",
  seedflare: "grass",
  ominouswind: "ghost",
  shadowforce: "ghost",
  honeclaws: "dark",
  wideguard: "rock",
  guardsplit: "psychic",
  powersplit: "psychic",
  wonderroom: "psychic",
  psyshock: "psychic",
  venoshock: "poison",
  autotomize: "steel",
  ragepowder: "bug",
  telekinesis: "psychic",
  magicroom: "psychic",
  smackdown: "rock",
  stormthrow: "fighting",
  flameburst: "fire",
  sludgewave: "poison",
  quiverdance: "bug",
  heavyslam: "steel",
  synchronoise: "psychic",
  electroball: "electric",
  soak: "water",
  flamecharge: "fire",
  coil: "poison",
  lowsweep: "fighting",
  acidspray: "poison",
  foulplay: "dark",
  simplebeam: "normal",
  entrainment: "normal",
  afteryou: "normal",
  round: "normal",
  echoedvoice: "normal",
  chipaway: "normal",
  clearsmog: "poison",
  storedpower: "psychic",
  quickguard: "fighting",
  allyswitch: "psychic",
  scald: "water",
  shellsmash: "normal",
  healpulse: "psychic",
  hex: "ghost",
  skydrop: "flying",
  shiftgear: "steel",
  circlethrow: "fighting",
  incinerate: "fire",
  quash: "dark",
  acrobatics: "flying",
  reflecttype: "normal",
  retaliate: "normal",
  finalgambit: "fighting",
  bestow: "normal",
  inferno: "fire",
  waterpledge: "water",
  firepledge: "fire",
  grasspledge: "grass",
  voltswitch: "electric",
  strugglebug: "bug",
  bulldoze: "ground",
  frostbreath: "ice",
  dragontail: "dragon",
  workup: "normal",
  electroweb: "electric",
  wildcharge: "electric",
  drillrun: "ground",
  dualchop: "dragon",
  heartstamp: "psychic",
  hornleech: "grass",
  sacredsword: "fighting",
  razorshell: "water",
  heatcrash: "fire",
  leaftornado: "grass",
  steamroller: "bug",
  cottonguard: "grass",
  nightdaze: "dark",
  psystrike: "psychic",
  tailslap: "normal",
  hurricane: "flying",
  headcharge: "normal",
  geargrind: "steel",
  searingshot: "fire",
  technoblast: "normal",
  relicsong: "normal",
  secretsword: "fighting",
  glaciate: "ice",
  boltstrike: "electric",
  blueflare: "fire",
  fierydance: "fire",
  freezeshock: "ice",
  iceburn: "ice",
  snarl: "dark",
  iciclecrash: "ice",
  vcreate: "fire",
  fusionflare: "fire",
  fusionbolt: "electric",
  flyingpress: "fighting",
  matblock: "fighting",
  belch: "poison",
  rototiller: "ground",
  stickyweb: "bug",
  fellstinger: "bug",
  phantomforce: "ghost",
  trickortreat: "ghost",
  nobleroar: "normal",
  iondeluge: "electric",
  paraboliccharge: "electric",
  forestscurse: "grass",
  petalblizzard: "grass",
  freezedry: "ice",
  disarmingvoice: "fairy",
  partingshot: "dark",
  topsyturvy: "dark",
  drainingkiss: "fairy",
  craftyshield: "fairy",
  flowershield: "fairy",
  grassyterrain: "grass",
  mistyterrain: "fairy",
  electrify: "electric",
  playrough: "fairy",
  fairywind: "fairy",
  moonblast: "fairy",
  boomburst: "normal",
  fairylock: "fairy",
  kingsshield: "steel",
  playnice: "normal",
  confide: "normal",
  diamondstorm: "rock",
  steameruption: "water",
  hyperspacehole: "psychic",
  watershuriken: "water",
  mysticalfire: "fire",
  spikyshield: "grass",
  aromaticmist: "fairy",
  eerieimpulse: "electric",
  venomdrench: "poison",
  powder: "bug",
  geomancy: "fairy",
  magneticflux: "electric",
  happyhour: "normal",
  electricterrain: "electric",
  dazzlinggleam: "fairy",
  celebrate: "normal",
  holdhands: "normal",
  babydolleyes: "fairy",
  nuzzle: "electric",
  holdback: "normal",
  infestation: "bug",
  poweruppunch: "fighting",
  oblivionwing: "flying",
  thousandarrows: "ground",
  thousandwaves: "ground",
  landswrath: "ground",
  lightofruin: "fairy",
  originpulse: "water",
  precipiceblades: "ground",
  dragonascent: "flying",
  hyperspacefury: "dark",
  breakneckblitz: "normal",
  alloutpummeling: "fighting",
  supersonicskystrike: "flying",
  aciddownpour: "poison",
  aciddownpour: "poison",
  tectonicrage: "ground",
  tectonicrage: "ground",
  continentalcrush: "rock",
  continentalcrush: "rock",
  savagespinout: "bug",
  neverendingnightmare: "ghost",
  corkscrewcrash: "steel",
  infernooverdrive: "fire",
  hydrovortex: "water",
  bloomdoom: "grass",
  gigavolthavoc: "electric",
  shatteredpsyche: "psychic",
  subzeroslammer: "ice",
  devastatingdrake: "dragon",
  blackholeeclipse: "dark",
  twinkletackle: "fairy",
  catastropika: "electric",
  shoreup: "ground",
  firstimpression: "bug",
  banefulbunker: "poison",
  spiritshackle: "ghost",
  darkestlariat: "dark",
  sparklingaria: "water",
  icehammer: "ice",
  floralhealing: "fairy",
  highhorsepower: "ground",
  strengthsap: "grass",
  solarblade: "grass",
  leafage: "grass",
  spotlight: "normal",
  toxicthread: "poison",
  laserfocus: "normal",
  gearup: "steel",
  throatchop: "dark",
  pollenpuff: "bug",
  anchorshot: "steel",
  psychicterrain: "psychic",
  lunge: "bug",
  firelash: "fire",
  powertrip: "dark",
  burnup: "fire",
  speedswap: "psychic",
  smartstrike: "steel",
  purify: "poison",
  revelationdance: "normal",
  coreenforcer: "dragon",
  tropkick: "grass",
  instruct: "psychic",
  beakblast: "flying",
  clangingscales: "dragon",
  dragonhammer: "dragon",
  brutalswing: "dark",
  auroraveil: "ice",
  sinisterarrowraid: "ghost",
  maliciousmoonsault: "dark",
  oceanicoperetta: "water",
  guardianofalola: "fairy",
  soulstealing7starstrike: "ghost",
  stokedsparksurfer: "electric",
  pulverizingpancake: "normal",
  extremeevoboost: "normal",
  genesissupernova: "psychic",
  shelltrap: "fire",
  fleurcannon: "fairy",
  psychicfangs: "psychic",
  stompingtantrum: "ground",
  shadowbone: "ghost",
  accelerock: "rock",
  liquidation: "water",
  prismaticlaser: "psychic",
  spectralthief: "ghost",
  sunsteelstrike: "steel",
  moongeistbeam: "ghost",
  tearfullook: "normal",
  zingzap: "electric",
  naturesmadness: "fairy",
  multiattack: "normal",
  mindblown: "fire",
  plasmafists: "electric",
  photongeyser: "psychic",
  lightthatburnsthesky: "psychic",
  searingsunrazesmash: "steel",
  menacingmoonrazemaelstrom: "ghost",
  letssnuggleforever: "fairy",
  splinteredstormshards: "rock",
  clangoroussoulblaze: "dragon",
  zippyzap: "electric",
  splishysplash: "water",
  floatyfall: "flying",
  pikapapow: "electric",
  bouncybubble: "water",
  buzzybuzz: "electric",
  sizzlyslide: "fire",
  glitzyglow: "psychic",
  baddybad: "dark",
  sappyseed: "grass",
  freezyfrost: "ice",
  sparklyswirl: "fairy",
  veeveevolley: "normal",
  doubleironbash: "steel",
  maxguard: "normal",
  dynamaxcannon: "dragon",
  snipeshot: "water",
  jawlock: "dark",
  stuffcheeks: "normal",
  noretreat: "fighting",
  tarshot: "rock",
  magicpowder: "psychic",
  dragondarts: "dragon",
  teatime: "normal",
  octolock: "fighting",
  boltbeak: "electric",
  fishiousrend: "water",
  courtchange: "normal",
  maxflare: "fire",
  maxflutterby: "bug",
  maxlightning: "electric",
  maxstrike: "normal",
  maxknuckle: "fighting",
  maxphantasm: "ghost",
  maxhailstorm: "ice",
  maxooze: "poison",
  maxgeyser: "water",
  maxairstream: "flying",
  maxstarfall: "fairy",
  maxwyrmwind: "dragon",
  maxmindstorm: "psychic",
  maxrockfall: "rock",
  maxquake: "ground",
  maxdarkness: "dark",
  maxovergrowth: "grass",
  maxsteelspike: "steel",
  clangoroussoul: "dragon",
  bodypress: "fighting",
  decorate: "fairy",
  drumbeating: "grass",
  snaptrap: "grass",
  pyroball: "fire",
  behemothblade: "steel",
  behemothbash: "steel",
  aurawheel: "electric",
  breakingswipe: "dragon",
  branchpoke: "grass",
  overdrive: "electric",
  appleacid: "grass",
  gravapple: "grass",
  spiritbreak: "fairy",
  strangesteam: "fairy",
  lifedew: "water",
  obstruct: "dark",
  falsesurrender: "dark",
  meteorassault: "fighting",
  eternabeam: "dragon",
  steelbeam: "steel",
  expandingforce: "psychic",
  steelroller: "steel",
  scaleshot: "dragon",
  meteorbeam: "rock",
  shellsidearm: "poison",
  mistyexplosion: "fairy",
  grassyglide: "grass",
  risingvoltage: "electric",
  terrainpulse: "normal",
  skittersmack: "bug",
  burningjealousy: "fire",
  lashout: "dark",
  poltergeist: "ghost",
  corrosivegas: "poison",
  coaching: "fighting",
  flipturn: "water",
  tripleaxel: "ice",
  dualwingbeat: "flying",
  scorchingsands: "ground",
  junglehealing: "grass",
  wickedblow: "dark",
  surgingstrikes: "water",
  thundercage: "electric",
  dragonenergy: "dragon",
  freezingglare: "psychic",
  fierywrath: "dark",
  thunderouskick: "fighting",
  glaciallance: "ice",
  astralbarrage: "ghost",
  eeriespell: "psychic",
};

const typeMap = (type) => typeLookup[type] || "???";

const numMap = (num) => pkNumLookup[num] || "notPresent"

async function constructDarkText(input){
  if(!(typeof(input) === "string"))
  return;
  else {
    const letters = [];
    const widths = [];
    for(let i = 0; i < input.length; i++){
      let imgPath = 'images/fonts/dark/' + input.codePointAt(i) + '.png';
      if(fs.existsSync(imgPath)){
        const image = await jimp.read(imgPath);
        await widths.push(image.bitmap.width);
        await letters.push(image);
      }
      else{
        const image = await jimp.read('images/fonts/dark/32.png');
        await widths.push(image.bitmap.width);
        await letters.push(image);
      }
    }

    let sumWidths = 0;
    for(let i = 0; i < widths.length; i++){
      sumWidths += widths[i];
    }

    let newTextImage = new jimp(sumWidths,14)
    let curWidth = 0;
    for(let i = 0; i < letters.length; i++){
      await newTextImage.composite(letters[i], curWidth, 0);
      curWidth += widths[i];
    }

    return newTextImage;
  }
}

async function constructLightText(input){
  if(!(typeof(input) === "string"))
  return;
  else {
    const letters = [];
    const widths = [];
    for(let i = 0; i < input.length; i++){
      let imgPath = 'images/fonts/light/' + input.codePointAt(i) + '.png';
      if(fs.existsSync(imgPath)){
        const image = await jimp.read(imgPath);
        await widths.push(image.bitmap.width);
        await letters.push(image);
      }
      else{
        const image = await jimp.read('images/fonts/dark/32.png');
        await widths.push(image.bitmap.width);
        await letters.push(image);
      }
    }

    let sumWidths = 0;
    for(let i = 0; i < widths.length; i++){
      sumWidths += widths[i];
    }

    let newTextImage = new jimp(sumWidths,14)
    let curWidth = 0;
    for(let i = 0; i < letters.length; i++){
      await newTextImage.composite(letters[i], curWidth, 0);
      curWidth += widths[i];
    }

    return newTextImage;
  }
}

//Clears the temporary files that are used in constructing the output.
//Should only be called after construction is complete.
function clearTemp(){
  fs.readdir('images/temp/', (err, files) => {
    if (err) {
      throw err;
    }
    else{
      for(let i = 0; i < files.length; i++){
        fs.unlink('images/temp/' + files[i], (err) => {
          if (err) {
            throw err;
          }
          else{
            console.log("File is deleted.");
          }
        });
      }
    }
  });
}

//Accepts an array of inputs, if they aren't in the correct order
//stuff won't end well. The intended order and types are listed below
//inputs[0]: nickname (string)
//inputs[1]: species (string)
//inputs[2]: item (string)
//inputs[3]: gender (string)
//inputs[4]: ability (string)
//inputs[5]: isShiny (boolean)
//inputs[6]: nature (string)
//inputs[7]: level (int)
//inputs[8]: moves (array of strings)
//inputs[9]: EVs (array of ints)
//inputs[10]: IVs (array of ints)
async function constructImage(inputs){
  var itemImg;
  var itemIcon;
  var moveImgs = [];
  var abilityImg;
  var currentStatImg;

  inputs[6] = inputs[6].toLowerCase();

  //Shinyness
  var base = new jimp(240,160);
  if(inputs[5]){
    base = await jimp.read('images/shinybackground.png');
  }
  else {
    base = await jimp.read('images/background.png');
  }

  //Item
  //Some item names are too long and therefore have hardcoded abbreviations
  if(inputs[2]){
    if(inputs[2].toLowerCase() === "never-melt ice"){
      itemImg = await constructDarkText("NVR-MELT ICE");
    }
    else if(inputs[2].toLowerCase() === "weakness policy"){
      itemImg = await constructDarkText("WEAKNESS POL.");
    }
    else if(inputs[2].toLowerCase() === "fighting memory"){
      itemImg = await constructDarkText("FIGHTING MEM.");
    }
    else if(inputs[2].toLowerCase() === "deep sea scale"){
      itemImg = await constructDarkText("DEEP SEA SCL.");
    }
    else if(inputs[2].toLowerCase() === "deep sea tooth"){
      itemImg = await constructDarkText("DEEP SEA TTH.");
    }
    else if(inputs[2].toLowerCase() === "safety goggles"){
      itemImg = await constructDarkText("SAFETY GGLS.");
    }
    else if(inputs[2].toLowerCase() === "ultranecrozium z"){
      itemImg = await constructDarkText("ULT.NECROZ. Z");
    }
    else if(inputs[2].toLowerCase() === "protective pads"){
      itemImg = await constructDarkText("PROTCTV. PADS");
    }
    else if(inputs[2].toLowerCase() === "psychic memory"){
      itemImg = await constructDarkText("PSYCHIC MEM.");
    }
    else if(inputs[2].toLowerCase() === "electric memory"){
      itemImg = await constructDarkText("ELECTRIC MEM.");
    }
    else if(inputs[2].toLowerCase() === "terrain extender"){
      itemImg = await constructDarkText("TERRAIN XTNDR.");
    }
    else{
      itemImg = await constructDarkText(inputs[2].toUpperCase());
    }
    if (fs.existsSync('images/items/' + inputs[2].replace(/\s+/g, '').toLowerCase() + '.png')){
      itemIcon = await jimp.read('images/items/' + inputs[2].replace(/\s+/g, '').toLowerCase() + '.png');
    }
    else{
      itemIcon = await jimp.read('images/items/error.png');
    }
  }
  else{
    itemImg = await constructDarkText('NONE');
    itemIcon = await jimp.read('images/items/noitem.png');
  }

  //Ability
  if(inputs[4]){
    abilityImg = await constructDarkText(inputs[4].toUpperCase());
  }
  else{
    abilityImg = await constructDarkText('-');
  }

  //Species name
  let specNameImg = await constructLightText(inputs[1].toUpperCase());

  //Moves
  for(let i = 0; i < inputs[8].length; i++){
    if(inputs[8][i].toLowerCase().startsWith("hidden power")){
      moveImgs.push(await constructDarkText('HIDDEN POWER'));
    }
    else{
      moveImgs.push(await constructDarkText(inputs[8][i].toUpperCase()));
    }
  }

  //Stats
  if(inputs[6] === 'lonely'){
    await base.composite((await jimp.read('images/stats/atkup.png')), 124 , 43);
    inputs[9][1] = "+" + inputs[9][1];

    await base.composite((await jimp.read('images/stats/defdown.png')), 124 , 55);
    inputs[9][2] = "-" + inputs[9][2];
  }
  else if(inputs[6] === 'adamant'){
    await base.composite((await jimp.read('images/stats/atkup.png')), 124 , 43);
    inputs[9][1] = "+" + inputs[9][1];

    await base.composite((await jimp.read('images/stats/spadown.png')), 124 , 67);
    inputs[9][3] = "-" + inputs[9][3];
  }
  else if(inputs[6] === 'naughty'){
    await base.composite((await jimp.read('images/stats/atkup.png')), 124 , 43);
    inputs[9][1] = "+" + inputs[9][1];

    await base.composite((await jimp.read('images/stats/spddown.png')), 124 , 79);
    inputs[9][4] = "-" + inputs[9][4];
  }
  else if(inputs[6] === 'brave'){
    await base.composite((await jimp.read('images/stats/atkup.png')), 124 , 43);
    inputs[9][1] = "+" + inputs[9][1];

    await base.composite((await jimp.read('images/stats/spedown.png')), 124 , 91);
    inputs[9][5] = "-" + inputs[9][5];
  }
  else if(inputs[6] === 'bold'){
    await base.composite((await jimp.read('images/stats/defup.png')), 124 , 55);
    inputs[9][2] = "+" + inputs[9][2];

    await base.composite((await jimp.read('images/stats/atkdown.png')), 124 , 43);
    inputs[9][1] = "-" + inputs[9][1];
  }
  else if(inputs[6] === 'impish'){
    await base.composite((await jimp.read('images/stats/defup.png')), 124 , 55);
    inputs[9][2] = "+" + inputs[9][2];

    await base.composite((await jimp.read('images/stats/spadown.png')), 124 , 67);
    inputs[9][3] = "-" + inputs[9][3];
  }
  else if(inputs[6] === 'lax'){
    await base.composite((await jimp.read('images/stats/defup.png')), 124 , 55);
    inputs[9][2] = "+" + inputs[9][2];

    await base.composite((await jimp.read('images/stats/spddown.png')), 124 , 79);
    inputs[9][4] = "-" + inputs[9][4];
  }
  else if(inputs[6] === 'relaxed'){
    await base.composite((await jimp.read('images/stats/defup.png')), 124 , 55);
    inputs[9][2] = "+" + inputs[9][2];

    await base.composite((await jimp.read('images/stats/spedown.png')), 124 , 91);
    inputs[9][5] = "-" + inputs[9][5];
  }
  else if(inputs[6] === 'modest'){
    await base.composite((await jimp.read('images/stats/spaup.png')), 124 , 67);
    inputs[9][3] = "+" + inputs[9][3];

    await base.composite((await jimp.read('images/stats/atkdown.png')), 124 , 43);
    inputs[9][1] = "-" + inputs[9][1];
  }
  else if(inputs[6] === 'mild'){
    await base.composite((await jimp.read('images/stats/spaup.png')), 124 , 67);
    inputs[9][3] = "+" + inputs[9][3];

    await base.composite((await jimp.read('images/stats/defdown.png')), 124 , 55);
    inputs[9][2] = "-" + inputs[9][2];
  }
  else if(inputs[6] === 'rash'){
    await base.composite((await jimp.read('images/stats/spaup.png')), 124 , 67);
    inputs[9][3] = "+" + inputs[9][3];

    await base.composite((await jimp.read('images/stats/spddown.png')), 124 , 79);
    inputs[9][4] = "-" + inputs[9][4];
  }
  else if(inputs[6] === 'quiet'){
    await base.composite((await jimp.read('images/stats/spaup.png')), 124 , 67);
    inputs[9][3] = "+" + inputs[9][3];

    await base.composite((await jimp.read('images/stats/spedown.png')), 124 , 91);
    inputs[9][5] = "-" + inputs[9][5];
  }
  else if(inputs[6] === 'calm'){
    await base.composite((await jimp.read('images/stats/spdup.png')), 124 , 79);
    inputs[9][4] = "+" + inputs[9][4];

    await base.composite((await jimp.read('images/stats/atkdown.png')), 124 , 43);
    inputs[9][1] = "-" + inputs[9][1];
  }
  else if(inputs[6] === 'gentle'){
    await base.composite((await jimp.read('images/stats/spdup.png')), 124 , 79);
    inputs[9][4] = "+" + inputs[9][4];

    await base.composite((await jimp.read('images/stats/defdown.png')), 124 , 55);
    inputs[9][2] = "-" + inputs[9][2];
  }
  else if(inputs[6] === 'careful'){
    await base.composite((await jimp.read('images/stats/spdup.png')), 124 , 79);
    inputs[9][4] = "+" + inputs[9][4];

    await base.composite((await jimp.read('images/stats/spadown.png')), 124 , 67);
    inputs[9][3] = "-" + inputs[9][3];
  }
  else if(inputs[6] === 'sassy'){
    await base.composite((await jimp.read('images/stats/spdup.png')), 124 , 79);
    inputs[9][4] = "+" + inputs[9][4];

    await base.composite((await jimp.read('images/stats/spedown.png')), 124 , 91);
    inputs[9][5] = "-" + inputs[9][5];
  }
  else if(inputs[6] === 'timid'){
    await base.composite((await jimp.read('images/stats/speup.png')), 124 , 91);
    inputs[9][5] = "+" + inputs[9][5];

    await base.composite((await jimp.read('images/stats/atkdown.png')), 124 , 43);
    inputs[9][1] = "-" + inputs[9][1];
  }
  else if(inputs[6] === 'hasty'){
    await base.composite((await jimp.read('images/stats/speup.png')), 124 , 91);
    inputs[9][5] = "+" + inputs[9][5];

    await base.composite((await jimp.read('images/stats/defdown.png')), 124 , 55);
    inputs[9][2] = "-" + inputs[9][2];
  }
  else if(inputs[6] === 'jolly'){
    await base.composite((await jimp.read('images/stats/speup.png')), 124 , 91);
    inputs[9][5] = "+" + inputs[9][5];

    await base.composite((await jimp.read('images/stats/spddown.png')), 124 , 67);
    inputs[9][3] = "-" + inputs[9][3];
  }
  else if(inputs[6] === 'naive'){
    await base.composite((await jimp.read('images/stats/speup.png')), 124 , 91);
    inputs[9][5] = "+" + inputs[9][5];

    await base.composite((await jimp.read('images/stats/spedown.png')), 124 , 79);
    inputs[9][4] = "-" + inputs[9][4];
  }

  //IVs and EVs
  let statWidth = 0;
  for(let i = 0; i < inputs[9].length; i++){
    currentStatImg = await constructDarkText(inputs[9][i].toString());
    statWidth = currentStatImg.bitmap.width;
    await base.composite(currentStatImg, 236 - statWidth, 30 + 12*i);

    currentStatImg = await constructDarkText(inputs[10][i].toString());
    statWidth = currentStatImg.bitmap.width;
    await base.composite(currentStatImg, 202 - statWidth, 30 + 12*i);
  }

  //Pokemon Sprite
  if(inputs[1].toLowerCase().endsWith("-mega")){
    inputs[1] = inputs[1].substring(0,inputs[1].toLowerCase().indexOf("-mega"));
  }
  if(inputs[1].toLowerCase().endsWith("-gmax")){
    inputs[1] = inputs[1].substring(0,inputs[1].toLowerCase().indexOf("-gmax"));
  }


  let dexNum = numMap(inputs[1].replace(/[^0-9a-z]/gi, '').toLowerCase());
  var speciesImg;
  if(dexNum === "notPresent"){
    speciesImg = await jimp.read('images/pokemon/missing.png');
  }
  else if(inputs[5]){
    speciesImg = await jimp.read("images/pokemon/shiny/" + dexNum + ".png");
    speciesImg = speciesImg.flip(true,false);
  }
  else{
    speciesImg = await jimp.read("images/pokemon/" + dexNum + ".png");
    speciesImg = speciesImg.flip(true,false);
  }
  await base.composite(speciesImg, 58 - speciesImg.bitmap.width/2, 62 - speciesImg.bitmap.height/2);

  //gender
  var gendImg;
  if(inputs[3] === 'M'){
    gendImg = await jimp.read('images/male.png');
    await base.composite(gendImg, 105, 19);
  }
  if(inputs[3] === 'F'){
    gendImg = await jimp.read('images/female.png');
    await base.composite(gendImg, 105, 19);
  }

  //level
  var levelImg = await constructLightText(inputs[7].toString());
  base.composite(levelImg, 14, 18);

  //nickname
  var nickNameImg = await constructLightText(inputs[0].substring(0,10));
  base.composite(nickNameImg, 40, 18);

  //Composite everything else
  await base.composite(itemImg, 7, 113);
  await base.composite(abilityImg, 7, 141);
  for(let i = 0; i < moveImgs.length; i++){
    await base.composite(moveImgs[i], 131, 104 + i*13);
    var typeImg = await jimp.read('images/types/' + typeMap(inputs[8][i].replace(/[^0-9a-z]/gi, '').toLowerCase()) + '.png');
    await base.composite(typeImg, 94, 105 + i*13);
  }
  await base.composite(itemIcon, 115 - itemIcon.bitmap.width, 93 - itemIcon.bitmap.height);
  await base.composite(specNameImg, 3,0);
  await base.write('images/temp/output-' + inputs[0] + '.png');
}
