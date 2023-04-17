const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    open: true,
    watchFiles: ["src/**/*"],
  },
  entry: {
    main: {
      import: "./src/index.js",
      filename: "./[name].bundle.js",
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        // use: ['style-loader', 'css-loader', 'postcss-loader'],
        use: [
          "style-loader", //inyecta los estilos del css traspilado en el html
          "css-loader", //entiende el css con @import, url() import/require()
          {
            loader: "postcss-loader", //procesa el css con postcss, usando options, omitimos la instalacion de postcss
            // y la creacion del archivo de configuracion postcss.config.js
            //usamos autoprefixer que agrega prefijos con mas soporte para todos los navegadores usando canIuse
            //y postcss-preset-env nos permite usar css moderno y este traspila a propiedades mas estables para navegadores
            //tanto autoprefixer como postcss-preset-env son plugins de postcss.
            options: {
              postcssOptions: {
                plugins: () => [require("autoprefixer")],
              },
            },
          },
          "sass-loader", //entiende scss y lo traspila a css.
        ],
      },
    ],
  },
});
