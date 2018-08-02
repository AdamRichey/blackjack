$(document).ready(function(){  
  $('#hit').prop('disabled',true);
  $('#stand').prop('disabled',true);
  $('#deal').prop('disabled',true);
  $('input').prop('disabled',true);
  $('#reset').prop('disabled',false);
})

  function reset(){//setting new game including players wallet
    playerchips=1000
    totalbet=0
    $('#playerhand').empty();
    $('#dealerhand').empty();
    $('#outcome').empty();
    $('#outcome').empty();
    $('#playerscore').empty();
    $('#dealerscore').empty();
    $('#hit').prop('disabled',true);
    $('#stand').prop('disabled',true);
    $('#deal').prop('disabled',true);
    $('input').prop('disabled',false);
    $('#reset').prop('disabled',true);
    $('#playerchips').html("$" + playerchips)
    $('#totalbet').html('<h1>Place Your bet</h1>').css( "color", "red" );
  }

  function start(){//resetting the player field
    playerhand = []
    dealerhand = []
    $('#playerscore').html(playerscore);
    $('#dealerscore').html(dealerscore);
    $('#deal').prop('disabled',true);
    $('#stand').prop('disabled',false);
    $('#hit').prop('disabled',false);
    $('input').prop('disabled',true);
    carddeck()
  }

  function carddeck(){//building the deck
    deck = []
    var card = 0
    for(var s=0; s<4; s++){//4 suits **1=spades, 2=hearts, 3=clubs, 4=diamonds
      for (var i=2; i<15; i++){//13 images/cards each suit ranking 2-14 (Ace as 14) to make 52 images/cards
        card +=1
        deck.push({
          card: card,
          suit: s,
          rank: i,
        })
      }
    }
    deal()
  }

  function deal(){//dealing the first hand
    for(var i=0; i<2; i++){//playershand
      pcard = Math.floor(Math.random()*52)
      playerhand.push(deck[pcard])
      $('#playerhand').append($('<img>',{id: 'card', src: 'cards/' + deck[pcard].card + '.png',}))//image to html
      deck.splice(pcard, 1)[0]
    }
    dcard = Math.floor(Math.random()*52)//dealershand
    dealerhand.push(deck[dcard])
    $('#dealerhand').append($('<img>',{id: 'card', src: 'cards/' + deck[dcard].card + '.png',}))//image to html
    if(deck[dcard].rank<10){//scoring dealers first card
      dealerscore = deck[dcard].rank
    }
    else if(deck[dcard].rank === 14){
      dealerscore = 11
    }
    else{
      dealerscore = 10
    }
    $('#dealerscore').html(dealerscore)
    deck.splice(dcard, 1)[0]
    pscore()
  }

  function pscore(){//player scoring
    playerscore = 0
    for (var i=0; i<playerhand.length; i++){
      if(playerhand[i].rank < 10){
        playerscore = playerscore + playerhand[i].rank
      }
      else if(playerhand[i].rank===14 && playerscore<10){//scoring aces 
        playerscore = playerscore + 11
      }
      else if(playerhand[i].rank===14 && playerscore>10){//scoring aces
        playerscore = playerscore + 1
      }
      else{
        playerscore = playerscore + 10//scoring faceimages/cards
      }
    }
    if (playerscore>21){
      playerchips = playerchips-totalbet
      $('#outcome').html('<h3>You Bust</h3>').css( "color", "#FF8833" );
      $('#totalbet').html('<h1>Place Your bet</h1>').css( "color", "red" );  
      $('#playerchips').html("$" + playerchips);
      $('#hit').prop('disabled',true);
      $('#stand').prop('disabled',true);
      $('input').prop('disabled',false);
    }
    if(playerchips===0){
      lose()
    }
    $('#playerscore').html(playerscore)
  }

  function hit(){//drawing hit card
      var card = Math.floor(Math.random()*52)
      playerhand.push(deck[card])
      $('#playerhand').append($('<img>',{id: 'card', src: 'cards/' + deck[card].card + '.png',}))
      this.deck.splice(card, 1)[0]
      pscore()
  }

  function stand(){//total game scoring
    if(dealerscore<17){
      dealerplay()
    }
    else if(dealerscore>21){
      $('#outcome').html('<h3>Dealer Busts, You Win</h3>').css( "color", "#FF8833" )
      playerchips = playerchips+totalbet
    }  
    else if(dealerscore>playerscore){
      $('#outcome').html('<h3>Dealer Wins</h3>').css( "color", "#FF8833" )
      playerchips = playerchips-totalbet
    }
    else if(dealerscore===playerscore){
      $('#outcome').html('<h3>Push</h3>').css( "color", "#FF8833" )
      push()
    }
    else{
      $('#outcome').html('<h3>Player Wins</h3>').css( "color", "#FF8833" )
      playerchips = playerchips+totalbet
    }
    $('#playerchips').html("$" + playerchips)
    totalbet = 0
    $('#hit').prop('disabled',true);
    $('#stand').prop('disabled',true);
    $('input').prop('disabled',false)
    $('#totalbet').html('<h1>Place Your bet</h1>').css( "color", "red" );
  }

  function dealerplay(){//dealer play logic
    var card = Math.floor(Math.random()*52)
    dealerhand.push(deck[card])
    $('#dealerhand').append($('<img>',{id: 'card', src: 'cards/' + deck[card].card + '.png',}))
    this.deck.splice(card, 1)[0]
    dscore()
  }

  function dscore(){
    dealerscore = 0
    for (var i=0; i<dealerhand.length; i++){
      if(dealerhand[i].rank < 10){
        dealerscore = dealerscore + dealerhand[i].rank
      }
      else if(dealerhand[i].rank===14 && dealerscore<10){//scoring aces 
        dealerscore = dealerscore + 11
      }
      else if(dealerhand[i].rank===14 && dealerscore>10){//scoring aces
        dealerscore = dealerscore + 1
      }
      else{
        dealerscore = dealerscore + 10//scoring faceimages/cards
      }
    }
    $('#dealerscore').html(dealerscore)
    stand()
  }

  function bet(element, clr){//tallying your bet
    $('#playerhand').empty();
    $('#dealerhand').empty();
    $('#outcome').empty();
    $('#outcome').empty();
    $('#deal').prop('disabled',false);
    totalbet = totalbet + clr
    console.log(totalbet)
    console.log(playerchips)
    if(totalbet>playerchips){    
      totalbet = totalbet - clr
    }
    $('#playerscore').empty();
    $('#dealerscore').empty();
    $('#totalbet').html('<h1>$' + totalbet + '').css( "color", "white" );

  }

  function lose(){
    alert('Start Start New Game for More Chips')
    $('#hit').prop('disabled',true);
    $('#stand').prop('disabled',true);
    $('#deal').prop('disabled',true);
    $('input').prop('disabled',true);
    $('#reset').prop('disabled',false);
  }

  function push(){
    console.log('push')
  }
