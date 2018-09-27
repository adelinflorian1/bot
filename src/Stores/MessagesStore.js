import Reflux from 'reflux';

import MessagesActions from '../Actions/MessagesActions';

class MessagesStore extends Reflux.Store {
    constructor() {
        super();

        this.state = {
            messages:
            [
                {
                    id:0,
                    text:'Hi, I am Schocior!.',
                    timestamp: '12:30',
                },
            ],
        };

        this.listenables = MessagesActions;

    }
    onAddMessage(data) {
        this.setState({
            messages:this.state.messages.concat(data),
        });
    }
    onSetMessages(data) {
        this.setState({
            messages:this.state.messages.concat(data),
        });
    }

}

export default MessagesStore;
