# Patterns Browser
A quickly put up simple web view to have a quick and easy way to browse Patterns.

## Patterns Availables
* The 356 first [SubtlePatterns](http://subtlepatterns.com/)
* Transparent variants of 154 SubtlePatterns made by @halgatewood

## Features
* Grid view of all the Patterns, by library
* Fullscreen background view of all the Patterns, by library

## Todos & Ideas
All Todos & Ideas is tracked in the [project issues](https://github.com/jpsirois/patterns-browser/issues).

## Browsers Supports
* Best performances in Safari & Firefox
* Chrome seems to struggle a bit when there’s a lot of Patterns loaded at the same time in the Grid layout when the viewport of the computer is really large. Tested at a 2560x1440 resolution on a Mid 2013 13" Macbook Air.
* Once loaded it is pretty smooth on iOS7. Tested on an iPhone 5.
* Not tested in any IE version yet

## Development
```shell
$ git clone https://github.com/jpsirois/patterns-browser.git
$ cd patterns-browser
$ bundle install
$ bundle exec middleman server
== The Middleman is loading
== Locales: en (Default en)
== LiveReload is waiting for a browser to connect
== The Middleman is standing watch at http://0.0.0.0:4567
== Inspect your site configuration at http://0.0.0.0:4567/__middleman/
```

## Thank you
* [@subtlepatterns](https://github.com/subtlepatterns/) for all those quality Patterns & for the [demo.html](https://github.com/subtlepatterns/SubtlePatterns/blob/gh-pages/demo.html) JavaScript example using the GitHub API to easily access assets.
* [@halgatewood](https://github.com/halgatewood) for providing [transparent variations of 150 Subtle Pattern](http://halgatewood.com/150-transparent-subtle-patterns/)

## License
© 2014 licensed under a [MIT license](http://jpsirois.mit-license.org/license.html)
