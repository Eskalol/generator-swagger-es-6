module.exports = {
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ],
    "rules": {
      "no-underscore-dangle": [2, { "allow": ["_id"] }]
    }
};
