# generator-swagger-es-6
[![forthebadge](http://forthebadge.com/images/badges/60-percent-of-the-time-works-every-time.svg)](http://forthebadge.com)
## 
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![AppVeyor][appveyor-image]][appveyor-url] [![codecov][codecov-image]][codecov-url] [![Dependency Status][daviddm-image]][daviddm-url] [![GitHub license][license-image]][license-url] [![Downloads][npm-downloads-image]][npm-url]
> Yeoman generator for generating a swagger project, using ES6, MongoDB, Express, and Node - lets you quickly set up a project avoiding fatigue.

#### [Generated project:](https://github.com/Eskalol/generator-swagger-test)
[![Maintainability](https://api.codeclimate.com/v1/badges/929a48d0e693669fd8c5/maintainability)](https://codeclimate.com/github/Eskalol/generator-swagger-test/maintainability) [![dependencies Status][test-daviddm-image]][test-daviddm-url] [![devDependencies Status][test-daviddm-dev-image]][test-daviddm-dev-url] [![Build Status][test-travis-image]][test-travis-url] [![test-AppVeyor][test-appveyor-image]][test-appveyor-url] [![test-codecov][test-codecov-image]][codecov-url] [![Known Vulnerabilities](https://snyk.io/test/github/eskalol/generator-swagger-test/badge.svg)](https://snyk.io/test/github/eskalol/generator-swagger-test)

## Installation

First, install [Yeoman](http://yeoman.io) and generator-swagger-es-6 using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-swagger-es-6
```

Then generate your new project:

```bash
yo swagger-es-6
```

## Supported Configurations
* Build Systems: `Gulp`

**Server**

* Database:
  * `MongoDB`
* Authentication boilerplate
  * local strategy `Yes`, `No`
* Swagger API
  * Swagger editor 3.0

**Testing**

* `Mocha + Chai`
  * Chai assertions:
    * `Should`
* `eslint`
* CI configurations
  * `travis-ci`
  * `appveyor`
* Test coverage
  * `nyc` coverage reporsts
  * `codecov` with `travis-ci`

**Production**
* `Docker` with `docker compose`
* `Heroku` procfile

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
[appveyor-image]: https://img.shields.io/appveyor/ci/Eskalol/generator-swagger-es-6.svg?style=flat-square&logo=appveyor
[appveyor-url]: https://ci.appveyor.com/project/Eskalol/generator-swagger-es-6

[test-daviddm-image]: http://img.shields.io/david/Eskalol/generator-swagger-test.svg?style=flat-square
[test-daviddm-url]: https://david-dm.org/Eskalol/generator-swagger-test
[test-daviddm-dev-url]: https://david-dm.org/Eskalol/generator-swagger-test?type=dev
[test-daviddm-dev-image]: https://img.shields.io/david/dev/Eskalol/generator-swagger-test.svg?style=flat-square
[test-appveyor-image]: https://img.shields.io/appveyor/ci/Eskalol/generator-swagger-test.svg?style=flat-square&logo=appveyor
[test-appveyor-url]: https://ci.appveyor.com/project/Eskalol/generator-swagger-test
[test-travis-image]: https://img.shields.io/travis/Eskalol/generator-swagger-test.svg?style=flat-square
[test-travis-url]: https://travis-ci.org/Eskalol/generator-swagger-test
[test-codecov-url]: https://codecov.io/gh/Eskalol/generator-swagger-test
[test-codecov-image]: https://img.shields.io/codecov/c/github/Eskalol/generator-swagger-test.svg?style=flat-square
