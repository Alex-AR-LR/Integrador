const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  output: {
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/images/[name][contenthash][ext][query]", //donde van a parar los asset/resource
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i, //esto solo permite hacer referencia al asset desde js y nuestro fichero de estilos usando imagenes y fondos. No toma asset desde html
        type: "asset/resource",
        //sin el assetModuleFilename indicado esto envia los activos por defecto al lugar de salida, es este caso 'dist'
        //usando estos templates string por defecto: [hash][ext][query]

        //tambien se puede enviar a un lugar especifico para cada tipo de activo con el uso de 'generator'
        /* {
          test: /\.png/,
          type: 'asset/resource',
          generator: {
            filename: 'static/[hash][ext][query]'
          }
        } */
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets/images",
          to: "./assets/images",
        },
      ],
    }),
  ],
};
