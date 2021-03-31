let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const imageminMozjpeg = require('imagemin-mozjpeg');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

const pugConfig = {
  locals: {
    config: { baseUrl: 'http://hse.loc/' }
  },
  pug: {
    pretty: true,
  }
};

mix.js('resources/markup/js/app.js', 'dist/js')
  .vue()
  .sass('resources/markup/sass/app.scss', 'dist/css', {}, [
      require("tailwindcss")
    ])
  .pug('resources/markup/pug/pages/*.pug', '../../../../public/dist', pugConfig)
  .setPublicPath('public')
  .sourceMaps();

mix.webpackConfig({
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          to: 'dist/images', // Laravel mix will place this in 'public/dist/images'
          context: 'resources/markup/images'
        }
      ]
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif|svg)$/i,
      plugins: [
        imageminMozjpeg({
          quality: 80,
        })
      ]
    })
  ],


  module: {
    rules: [
      {
        test: /(\.(woff2?|ttf|eot|otf)$|font.*\.svg$)/,
        loaders: [{
          loader: 'file-loader',
          options: {
            name: (path) => {
              if (!/node_modules|bower_components/.test(path)) {
                return 'dist/fonts/[name].[ext]';
              }
              const pathUpdated = path.replace(/\\/g, '/').replace(/((.*(node_modules|bower_components))|fonts|font|assets)\//g, '');
              return `fonts/vendor/${pathUpdated}`;
            },
          },
        }],
      }
    ],
  },
})
