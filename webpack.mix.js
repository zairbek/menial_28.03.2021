let mix = require('laravel-mix');
mix.pug = require('laravel-mix-pug');

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

mix.js('resources/markup/js/app.js', 'js')
    .sass('resources/markup/sass/app.scss', 'css')
    .pug('resources/markup/pug/*.pug', '../../../public/dist', {
      locals: {
        config: { baseUrl: 'http://hse.loc/' }
      },
      pug: {
        pretty: true,
        debug: true
      }
    })
    .setPublicPath('public/dist')
    .sourceMaps();
