'use strict';

console.log('https://api.lyrics.ovh/v1/search?artist=ARTIST&title=TITLE');

console.log('https://api.lyrics.ovh/v1/suggest/one');

const star = 'wizkid';
const song = 'Holla at your boy';

const func = async function () {
  const res = await fetch(`https://api.lyrics.ovh/v1/${star}/${song}`);
  const data = await res.json();
  console.log(data);
};

func();
