require('ignore-styles');
require('@babel/register')({
    ignore: [/(node_modle)/],
    presets: ['@babel/preset-env', '@babel/preset-react']
})

require('./server');