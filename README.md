# generator-swagger-es-6
[![forthebadge](http://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](http://forthebadge.com)
## 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor][appveyor-image]][appveyor-url] [![codecov][codecov-image]][codecov-url] [![Code Climate][code-climate-image]][code-climate-url] [![Dependency Status][daviddm-image]][daviddm-url] [![GitHub license][license-image]][license-url] [![Downloads][npm-downloads-image]][npm-url]
> Yeoman generator for generating a swagger project, using ES6, MongoDB, Express, and Node - lets you quickly set up a project avoiding fatigue.

#### Generated project:
[![dependencies Status][test-daviddm-image]][test-daviddm-url][![devDependencies Status][test-daviddm-dev-image]][test-daviddm-dev-url] [![Build Status][travis-image]][test-travis-url] [![AppVeyor][appveyor-image]][test-appveyor-url]

## Installation

First, install [Yeoman](http://yeoman.io) and generator-swagger-es-6 using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g swagger
npm install -g yo
npm install -g generator-swagger-es-6
```

Then generate your new project:

```bash
yo swagger-es-6
```

## Supported Configurations
**Server**

* Database:
  * `MongoDB`
* Authentication boilerplate
  * local strategy `Yes`, `No`
* Swagger API
  * Swagger editor

**Testing**

* `Mocha + Chai`
  * Chai assertions:
    * `Should`

## Generators
```bash
yo swagger-es-6:model
yo swagger-es-6:controller
```

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [Eskil Opdahl Nordland]()


[npm-image]: http://img.shields.io/npm/v/generator-swagger-es-6.svg?style=flat-square
[npm-url]: https://npmjs.org/package/generator-swagger-es-6
[travis-image]: https://img.shields.io/travis/Eskalol/generator-swagger-es-6/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/Eskalol/generator-swagger-es-6
[daviddm-image]: http://img.shields.io/david/Eskalol/generator-swagger-es-6.svg?style=flat-square
[daviddm-url]: https://david-dm.org/Eskalol/generator-swagger-es-6
[codecov-url]: https://codecov.io/gh/Eskalol/generator-swagger-es-6
[codecov-image]: https://img.shields.io/codecov/c/github/Eskalol/generator-swagger-es-6.svg?style=flat-square
[license-url]: https://raw.githubusercontent.com/Eskalol/generator-swagger-es-6/master/LICENSE
[license-image]: https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square
[npm-downloads-image]: https://img.shields.io/npm/dt/generator-swagger-es-6.svg?style=flat-square
[code-climate-url]: https://codeclimate.com/github/Eskalol/generator-swagger-es-6
[code-climate-image]: https://img.shields.io/codeclimate/github/Eskalol/generator-swagger-es-6.svg?style=flat-square
[appveyor-image]: https://img.shields.io/appveyor/ci/Eskalol/generator-swagger-es-6.svg?style=flat-square
[appveyor-url]: https://ci.appveyor.com/project/Eskalol/generator-swagger-es-6

[test-daviddm-image]: http://img.shields.io/david/Eskalol/generator-swagger-test.svg?style=flat-square
[test-daviddm-url]: https://david-dm.org/Eskalol/generator-swagger-test
[test-daviddm-dev-url]: https://david-dm.org/Eskalol/generator-swagger-test?type=dev
[test-daviddm-dev-image]: https://img.shields.io/david/dev/Eskalol/generator-swagger-test.svg?style=flat-square
[test-appveyor-image]: https://img.shields.io/appveyor/ci/Eskalol/generator-swagger-test.svg?style=flat-square
[test-appveyor-url]: https://ci.appveyor.com/project/Eskalol/generator-swagger-test
[test-travis-image]: https://img.shields.io/travis/Eskalol/generator-swagger-test.svg?style=flat-square
[test-travis-url]: https://travis-ci.org/Eskalol/generator-swagger-test
