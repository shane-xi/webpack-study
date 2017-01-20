//main.js
/*
var greeter = require('./Greeter.js');
document.getElementById('root').appendChild(greeter());*/
//import React from 'react';
//import {render} from 'react-dom';
import Greeter from './Greeter';
var $ = require('jquery');
import './main.less';//使用require导入css文件
ReactDOM.render(<Greeter />, document.getElementById('root'));
$('#root').css('color','red');