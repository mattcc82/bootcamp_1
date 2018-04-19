# Bootcamp 1

> First stab at using Vue.js to visualize a data set from scratch

## Get Started

```bash
$ cd path/to/web2py/applications
$ git clone https://github.com/mattcc82/bootcamp_1.git

Open another terminal
Start up web2py

localhost:8000/bootcamp_1
```

### Key info and tips/warnings

**Warning**

> This uses babel standalone (https://github.com/babel/babel-standalone) along with es6 module umd plugin (https://babeljs.io/docs/plugins/transform-es2015-modules-umd/)

> It's not ideal to use a browser installed babel in production. It's recompiling code much too often and is not efficient

- It's better to use bundlers and workflow tools like Webpack / Browserify to load modules and transpile through Babel in a precomiled format.

- The Vue code is broken into components using ES6 template literals (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). Again, there are better ways to structure and template components (like using single page components (https://vuejs.org/v2/guide/single-file-components.html)).

- Vuex and vue-router are not used for state management and routing (SPA)

- Echarts is being used for charting components, specifically this library (https://github.com/ecomfe/vue-echarts)

- Bulma CSS framework (https://bulma.io/)

- Web2py is only being used to read an hdf5 data file (/modules/data_pull.py) and return the serialized data (/controllers/default.py -- def get_data())

❤

