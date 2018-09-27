import Reflux from 'reflux';

import MessagesActions from '../Actions/MessagesActions';

class MessagesStore extends Reflux.Store {
    constructor() {
        super();

        this.state = {
            messages:
            [
                {
                    id:1,
                    text:'Hi, I am Schocior!.',
                    timestamp: '12:30',
                },
            ],
        };

        this.listenables = MessagesActions;

    }

    onUpdateValue(data){
        this.onSetValue(data);
    }

    onSetValue(data) {
        console.log(data);
        this.setState({
            mesages:this.state.messages.concat(data),
        })
    }
    onAddMessage(data) {
        this.setState({
            messages:this.state.messages.concat(data),
        });
    }

}

export default MessagesStore;
