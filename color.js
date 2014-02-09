function BitColor(changed) {
  this.r = [];
  this.g = [];
  this.b = [];
  this.bits = [];
}

BitColor.prototype.push = function(element) {
  this.bits.push(element);
  if (this.bits.length = )
};

BitColor.prototype.hexColor = function() {
  return "#034234";
}

$(function() {
  var color = new BitColor();
  $(window).keypress(function(e) {
    if(e.keyCode == 49) {
      color.push(1);
      alert(1);
    } else if (e.keyCode == 48) {
      color.push(0);
      alert(0);
    }
  })
});