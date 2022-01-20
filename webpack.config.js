const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = (env, options)=> {
    const mode = env.development ? 'development' : 'production'
    
    const config = {
        mode,

        entry: {index:"./src/index.tsx"},
        module:{
            rules: [
                {
                    test: /\.tsx?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                }

            ]
        },
        output: {
            filename:"[name].bundle.js",
            path: path.resolve(__dirname,'dist')
        },

        devtool: "inline-source-map",
        devServer: {
            host:"localhost",
            port:3003,
            hot:true,
            proxy:[{
                context: ["/**"],
                target: "http://localhost:8085"
            }]
        },

        resolve: {
            extensions:['.tsx','.ts','.js']
        },
        plugins:[
            // new webpack.LoaderOptionsPlugin({
            //     De
            // }),
            new HtmlWebpackPlugin({
                template: './src/index.html'
            })
        ]
    }
    return config
    
}