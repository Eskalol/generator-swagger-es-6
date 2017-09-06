# <%= name %>
[![Dependency Status][daviddm-image]][daviddm-url]


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

[daviddm-image]: http://img.shields.io/david/<%= repoName %>?style=flat-square
[daviddm-url]: https://david-dm.org/<%= repoName %>
