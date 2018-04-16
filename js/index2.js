  var score =      document.getElementById('counter');
  var game_page =  document.getElementById('game');
  var start_page = document.getElementById('start-page');
  var myCards =    document.getElementById('container');
  var winer_page = document.getElementById('winer');
  var win_score =  document.getElementById('win_score');
  var returnButton =  document.getElementById('return');
  var newGameButton = document.getElementById('btn');
  var returnAfterWin = document.getElementById('returnAfterWin');
  var resultsArray = []; 
  var counter = 00;
  var callCounter=0;
  var images = [
      '1', '2', '3', '4', '5', '6', '7', '8',  '9', '10', '11', '12', '13', '14', '15', '16', '17', '18','19','20','21','22','23','24',
      '25','26','27','28','29','30','31','32','33','34','35','36','37','38','39','40','41','42','43','44','45','46','47','48','49','50','51','52'
  ];
  var closeTimer = 5000;
  var CardsOnDesk = 18;
    //Обработчикb кнопок
  newGameButton.onclick = startGame;
  returnButton.onclick = restartGame;
  returnAfterWin.onclick = restartGame;

  

  function startGame() {
    game_page.className = 'game';
    start_page.className = 'hiden';
    createDeck();}

  function shuffleCards(o){
      for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i],   o[i] = o[j], o[j] = x);
      return o;}     

  function shuffleNewGame (){
      if (document.getElementById('game').className !=='game hiden') { 
      shuffleCards(cards);} }

  function createDeck(){

    var rand_cards = shuffleCards(images); 
    var getRandom = rand_cards.slice(0,9);
    var clone = getRandom.slice(0); 
    var cards = getRandom.concat(clone); 

    for (var i = 0; i < cards.length; i++) {    
      card = document.createElement('div');     
      card.dataset.item = cards[i];             
      card.dataset.view = "card";
      card.dataset.tid = "Card";
      card.className = 'flipped';               
      myCards.appendChild(card);
      card.onclick = clickCard;    
      setTimeout(closeCards,closeTimer);  
      }
      function clickCard() {
        if(callCounter <2){
        if (this.className != 'flipped' && this.className != 'correct'){      
            this.className = 'flipped';
            this.dataset.tid = "Card";
            var result = this.dataset.item;
            resultsArray.push(result); 
            callCounter++;
        }}

        if (resultsArray.length == 2) {  
        this.dataset.tid = "Card";   
          if (resultsArray[0] === resultsArray[1]) {  
            check("correct"); 
            
            counter ++; 
            resultsArray = [];
            CardsOnDesk = +CardsOnDesk - 2;
            score.textContent = +score.textContent + +CardsOnDesk*42;
            if(CardsOnDesk == 0){
              setTimeout(openWinerPage,1000);
            }
          }
          else {
            check("reverse");
            this.dataset.tid = "Card";
            score.textContent = +score.textContent - +CardsOnDesk*42;
            resultsArray = [];
          }
        }}
      function check(className) {
        var x = document.getElementsByClassName("flipped");
        setTimeout(function() {
          for(var i = (x.length - 1); i >= 0; i--) {
            x[i].dataset.tid = "Card-flipped"
            x[i].className = className; 

          }
        },300)
        setTimeout(function(){callCounter=0;
         },350);}
    }

  function closeCards(){
      var card = myCards.getElementsByTagName('div');
      var arr = Array.prototype.slice.call( card );
      for (var i = 0; i<arr.length; i++) {
        arr[i].className = 'static';
        arr[i].dataset.tid = "Card-flipped";
      }}

  function openWinerPage (){
    win_score.textContent = score.textContent;
    console.log(winer_page);
    game_page.className = 'hiden';
    winer_page.className = 'start-page';} 

  function restartGame(){
    if(winer_page.className !=="hiden"){
      winer_page.className='hiden';
      game_page.className = 'game';
      while (myCards.firstChild) {
    myCards.removeChild(myCards.firstChild);;}
    score.textContent = 0;
    createDeck();
    CardsOnDesk = 18;
    }else{
      while (myCards.firstChild) {
    myCards.removeChild(myCards.firstChild);
    ;}
    CardsOnDesk = 18;
    score.textContent = 0;
    createDeck();}
    }
    

    

  

  










