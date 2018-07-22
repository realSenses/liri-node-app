
function logo() {

  // get random color
  var color1 = "\x1b[38;5;"+Math.floor((Math.random() * 230) + 1)+"m";
  var color2 = "\x1b[38;5;"+Math.floor((Math.random() * 230) + 1)+"m";
  var color3 = "\x1b[38;5;"+Math.floor((Math.random() * 230) + 1)+"m";
  var color4 = "\x1b[38;5;"+Math.floor((Math.random() * 230) + 1)+"m";
  var color5 = "\x1b[38;5;"+Math.floor((Math.random() * 230) + 1)+"m";
  // create logo
  return(
    color5+'__'+color1+'/\\\\\\'+color5+'______________'+color2+'/\\\\\\\\\\\\\\\\\\\\\\'+color5+'____'+color3+'/\\\\\\\\\\\\\\\\\\'+color5+'______'+color4+'/\\\\\\\\\\\\\\\\\\\\\\'+color5+'_'+ '\n' +        
    color5+' _'+color1+'\\/\\\\\\'+color5+'_____________'+color2+'\\/////\\\\\\///'+color5+'___'+color3+'/\\\\\\///////\\\\\\'+color5+'___'+color4+'\\/////\\\///'+color5+'__'+ '\n' +       
    color5+'  _'+color1+'\\/\\\\\\'+color5+'_________________'+color2+'\\/\\\\\\'+color5+'_____'+color3+'\\/\\\\\\'+color5+'_____'+color3+'\\/\\\\\\'+color5+'_______'+color4+'\\/\\\\\\'+color5+'_____'+ '\n' +      
    color5+'   _'+color1+'\\/\\\\\\'+color5+'_________________'+color2+'\\/\\\\\\'+color5+'_____'+color3+'\\/\\\\\\\\\\\\\\\\\\\\\\/'+color5+'________'+color4+'\\/\\\\\\'+color5+'_____'+ '\n' +     
    color5+'    _'+color1+'\\/\\\\\\'+color5+'_________________'+color2+'\\/\\\\\\'+color5+'_____'+color3+'\\/\\\\\\//////\\\\\\'+color5+'________'+color4+'\\/\\\\\\'+color5+'_____'+ '\n' +    
    color5+'     _'+color1+'\\/\\\\\\'+color5+'_________________'+color2+'\\/\\\\\\'+color5+'_____'+color3+'\\/\\\\\\'+color5+'____'+color3+'\\//\\\\\\'+color5+'_______'+color4+'\\/\\\\\\'+color5+'_____'+ '\n' +   
    color5+'      _'+color1+'\\/\\\\\\'+color5+'_________________'+color2+'\\/\\\\\\'+color5+'_____'+color3+'\\/\\\\\\'+color5+'_____'+color3+'\\//\\\\\\'+color5+'______'+color4+'\\/\\\\\\'+color5+'_____'+ '\n' +  
    color5+'       _'+color1+'\\/\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'+color5+'__'+color2+'/\\\\\\\\\\\\\\\\\\\\\\'+color5+'_'+color3+'\\/\\\\\\'+color5+'______'+color3+'\\//\\\\\\'+color5+'__'+color4+'/\\\\\\\\\\\\\\\\\\\\\\'+color5+'_'+ '\n' + 
    color5+'        _'+color1+'\\///////////////'+color5+'__'+color2+'\\///////////'+color5+'__'+color3+'\\///'+color5+'________'+color3+'\\///'+color5+'__'+color4+'\\///////////'+color5+'__'+'\x1b[0m');
};

//Did you know that javascript needs 2 backspaces for every one you want to display? I learn something new every day!

module.exports = logo;