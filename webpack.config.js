module.exports = {
    entry: './src/app/index.js', //Archivo que va a convertir
    output: {
        path: __dirname + '/src/public', //ruta absoluta
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                use: 'babel-loader', //Webpack se comunica con babel
                test:/\.js$/,
                exclude: /node_modules/
            }
        ]
    },
};