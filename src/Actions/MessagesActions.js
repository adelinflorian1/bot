import { createActions } from 'reflux';

const MessagesActions = createActions([
    'setValue',
    'updateValue',
    'addMessage'
]);

export default MessagesActions;
