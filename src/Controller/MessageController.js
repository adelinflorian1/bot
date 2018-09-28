import MessagesActions from '../Actions/MessagesActions';
var Sentencer = require('sentencer');

Sentencer.configure({
    actions:{
        numberToTen: function(){
            return Math.floor(Math.random()*10)+1;
        },

        number: function(){
            return Math.floor(Math.random()*1000000)+1;
        },
    }
});

export function getAnswer(message){

    if(message.text.includes('who') && message.text.includes('are') && message.text.includes('you')){
        MessagesActions.addMessage( {
            id:0,
            text: Sentencer.make("I am {{an_adjective }} {{noun}} and I'm here to learn, teach me  maester!"),
            timestamp: '12:30',
        })
        return;
    }

    if(message.text.includes('hi') || message.text.includes('Hi') || message.text.includes(' Hello') || message.text.includes(' hello')){
        MessagesActions.addMessage( {
            id:0,
            text: Sentencer.make("I allready said hi :|"),
            timestamp: '12:30',
        })
        return;
    }

    if(message.text.includes('up')){
        MessagesActions.addMessage( {
            id:0,
            text: Sentencer.make("I am {{an_adjective}} {{noun}}! d--b"),
            timestamp: '12:30',
        })
        return;
    }

    if(message.text.includes('old') && message.text.includes('are') && message.text.includes('you')){
        MessagesActions.addMessage( {
            id:0,
            text: Sentencer.make("Who cares, I'm here for {{number }} years from now."),
            timestamp: '12:30',
        })

        MessagesActions.addMessage( {
            id:0,
            text: Sentencer.make("Just for you!"),
            timestamp: '12:30',
        })
        return;
    }

    if(message.text.includes('sex') && message.text.includes('have') && message.text.includes('?')){
        MessagesActions.addMessage( {
            id:0,
            text: Sentencer.make("I would not do that with {{an_adjective }} {{noun}}, like you, sorry :("),
            timestamp: '12:30',
        })
        return;
    }

    if(message.text.includes('sex')){
        MessagesActions.addMessage( {
            id:0,
            text: Sentencer.make("You are {{an_adjective }} and {{ an_adjective }}, kyss my {{ noun }}, man."),
            timestamp: '12:30',
        })
        return;
    }

    var defaultMessage = {
        id: 0,
        text: 'Not smart enough, sorry :(',
        timestamp: '12:30',
    }
    var ok=false;

    fetch('http://api.icndb.com/jokes')
      .then(response => response.json())
      .then(data =>{
          for(let i=0; i<data.value.length; i++){
              var tokens = message.text.split(' ');
              for(let j=0; j<data.value.length; j++){
                  if(data.value[i].joke.toLowerCase().includes(tokens[j]) && tokens[j]!=='are' && tokens[j]!=='you'){
                      defaultMessage.text=data.value[i].joke.replace(new RegExp('Chuck Norris', 'g'),"Schocior");
                      ok=true;
                  }
              }
          }
          defaultMessage.text=defaultMessage.text.replace(new RegExp('&quot;', 'g'),"'")
          MessagesActions.addMessage(defaultMessage);

          setTimeout(()=>{
              if(Math.floor(Math.random()*10)+1===5 && ok){
                  MessagesActions.addMessage( {
                      id:0,
                      text: Sentencer.make("I am Schocior."),
                      timestamp: '12:30',
                  })
              }
              if(Math.floor(Math.random()*10)+1===6 && ok){
                  MessagesActions.addMessage( {
                      id:0,
                      text: Sentencer.make("I am {{number}}% Schocior."),
                      timestamp: '12:30',
                  })
              }

          },2000);
      } );
}
