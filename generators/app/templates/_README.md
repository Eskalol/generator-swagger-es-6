# <%= name %>
[![dependencies Status][daviddm-image]][daviddm-url] [![devDependencies Status][daviddm-dev-image]][daviddm-dev-url] <% if (travis) {%>[![codecov][codecov-image]][codecov-url] [![Build Status][travis-image]][travis-url]<%}%> <% if (appveyor) {%>[![AppVeyor][appveyor-image]][appveyor-url]<%}%>


## Development setup
```bash
$ npm install -g gulp
$ git clone <%= git %>
$ mongod
$ gulp
```

## Gulp Tasks:
- Run `gulp` to serve:dev and run swagger editor.
- Run `gulp test` to run unit tests with mocha.
- Run `gulp build` to build dist.
- Run `gulp serve:dist` to serve production.
- Run `gulp serve` to serve development.
- Run `gulp clean:dist` to clean dist folder.
- Run `gulp swagger` to run swagger editor.
<% if (eslint) {%>- Run `gulp lint` to run linting.
- Run `gulp lint:fix` to fix fixable errors.<%}%>

<% if (docker) {%>
## Whale it, you'll nail it!
```bash
$ docker-compose up
```
<%}%>

[daviddm-image]: http://img.shields.io/david/<%= repoName %>.svg?style=flat-square
[daviddm-url]: https://david-dm.org/<%= repoName %>
[daviddm-dev-url]: https://david-dm.org/<%= repoName %>?type=dev
[daviddm-dev-image]: https://img.shields.io/david/dev/<%= repoName %>.svg?style=flat-square
<% if (appveyor) {%>
[appveyor-image]: https://img.shields.io/appveyor/ci/<%= repoName %>.svg?style=flat-square&logo=appveyor
[appveyor-url]: https://ci.appveyor.com/project/<%= repoName %>
<%}%>
<% if (travis) {%>
[travis-image]: https://img.shields.io/travis/<%= repoName %>.svg?style=flat-square
[travis-url]: https://travis-ci.org/<%= repoName %>
[codecov-url]: https://codecov.io/gh/<%= repoName %>
[codecov-image]: https://img.shields.io/codecov/c/github/<%= repoName %>.svg?style=flat-square
<%}%>
