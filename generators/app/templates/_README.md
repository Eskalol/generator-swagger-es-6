# <%= name %>
[![dependencies Status][daviddm-image]][daviddm-url][![devDependencies Status][daviddm-dev-image]][daviddm-dev-url] <% if (travis) {%>[![Build Status][travis-image]][travis-url]<%}%> <% if (appveyor) {%>[![AppVeyor][appveyor-image]][appveyor-url]<%}%>


## Development setup
```bash
$ npm install -g swagger
$ git clone <%= git %>
$ mongod
$ npm run dev
$ npm run swagger
```

<% if (docker) {%>
## Whale it, you'll nail it!
```bash
$ docker-compose up
```
<%}%>

[daviddm-image]: http://img.shields.io/david/<%= repoName %>.svg?style=flat-square
[daviddm-url]: https://david-dm.org/<%= repoName %>
[daviddm-dev-url]: https://david-dm.org/<%= repoName %>?type=dev
[daviddm-dev-image]: https://img.shields.io/dev/<%= repoName %>.svg?style=flat-square
<% if (appveyor) {%>
[appveyor-image]: https://img.shields.io/appveyor/ci/<%= repoName %>.svg?style=flat-square
[appveyor-url]: https://ci.appveyor.com/project/<%= repoName %>
<%}%>
<% if (travis) {%>
[travis-image]: https://img.shields.io/travis/<%= repoName %>.svg?style=flat-square
[travis-url]: https://travis-ci.org/<%= repoName %>
<%}%>
