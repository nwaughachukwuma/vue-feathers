var coll = db.getCollection('archived-quotes');
var words = cat('/app/fermat.txt').split(' ');
var pos = 0;
for (var i = 0; i < 1000*1000; i++) {
  var text = []
  var idx = (Math.random() + '')
    .replace(/^0./, '').split('').map(function(n){return parseInt(n, 10)})
    .slice(0, 3 + 10*Math.random())
    .forEach(function(n) {
      pos += n
      pos %= words.length
      text.push(words[pos])
    })
  
  coll.insert({
    text: text.join(' ')
  })
}
