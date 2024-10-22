const path = require('path')
const loader = require('sass-loader')

module.exports = {
  entry: {
    main: './src/js/main.js',            // arquivo principal
    form: './src/js/form.js'              // novo arquivo para receber dados de voluntario.html
  },
  output: {
    filename: '[name].bundle.js',         // [name] garante que o arquivo de saída terá o nome do *entry point*
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
          {
            loader: 'sass-loader'
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.mjs'],
  }
}