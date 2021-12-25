const jimp = require('jimp');
const fs = require('fs');

let string = "öôòóàáâäèéêëîïíìûüùúñ";
string = string.toUpperCase();

async function crop() {
  for(let i = 0; i < string.length; i++){
    let imgstring = 'images/fonttest/' + string.substring(i,i+1) + '.png';
    const image = await jimp.read('images/fonttest/somelowercase.png');
    image.crop(i* 6, 0, 6, 14).write(imgstring);
 }
}

async function rename(){
  for(let i = 0; i < string.length; i++){
    let imgstring = 'images/fonts/dark/upper/' + string[i] +'.png';
    const image = await jimp.read(imgstring);
    image.write('images/fonttest/' + string.codePointAt(i) + '.png')
  }
}

async function constructText(input){
  if(!(typeof(input) === "string"))
    return;
  else {
    const letters = [];
    const widths = [];
    for(let i = 0; i < input.length; i++){
      let imgPath = 'images/fonts/dark/' + input.codePointAt(i) + '.png';
      if(fs.existsSync(imgPath)){
        const image = await jimp.read(imgPath);
        widths.push(image.bitmap.width);
        letters.push(image);
      }
      else{
        const image = await jimp.read('images/fonts/dark/32.png');
        widths.push(image.bitmap.width);
        letters.push(image);
      }
    }

    let sumWidths = 0;
    for(let i = 0; i < widths.length; i++){
      sumWidths += widths[i];
    }

    let newTextImage = new jimp(sumWidths,14)
    let curWidth = 0;
    for(let i = 0; i < letters.length; i++){
      newTextImage.composite(letters[i], curWidth, 0);
      curWidth += widths[i];
    }

    newTextImage.write('images/fonttest/testresult.png');

  }
}

constructText("shea is a cool bitch");
