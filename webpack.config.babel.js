const path = require('path');

export default () => (
    {
        mode: 'production',
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: 'bib.js',
            libraryTarget: 'umd',
            globalObject: 'this',
            // libraryExport: 'default',
            library: 'webpackNumbers'
        },
   
        module: {
            rules: [
                {
                    test: /\.(js)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: 'babel-loader'
                }
            ]
        },
    }
);
