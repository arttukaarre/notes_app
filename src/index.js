import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/styles.css';
import 'react-customize-token-input/dist/react-customize-token-input.css';
import Base from './modules/base/Base';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<Base />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
