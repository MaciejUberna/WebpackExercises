// package already exists within node.js installation
//this path requirers absolute pat to the place whre an output file should be written to
const path = require('path'); // this is a node.js syntax

// doc on: https://webpack.js.org/
module.exports = {
    //first we set up an entry point.
    //__dirname is an absolute path tho the folder this file lives in
    entry: './src/index.js',
    output: {
        mode: 'development',
        //the bundle file should be written to the 'dist' folder
        path: path.resolve(__dirname,'dist'),
        filename: 'bundle.js',
        publicPath: ''
    },
    //Its where sourse maps will be stored
    devtool: 'cheap-module-eval-source-map',
    //rules for babel
    module: {
        rules: [
            {
                // any file ended with .js will be affected by this rule
                test: /\.js$/, // regular expression that tells which file extensions should be affected
                //loader: tells webpack wihich tool takes over for this file ("babel-loader": "^8.1.0")
                loader: 'babel-loader',
                exclude: /node_modules/ //exclude node modules because we are not transforming any code there
            }
        ]
    }
};