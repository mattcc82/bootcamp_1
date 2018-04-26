// hero component
import Eventbus from './eventbus.js'

const gongosHero = {
  template: `
    <section class="hero is-bold is-danger is-radiusless" :class="heroClass">
      <div class="hero-body">
          <div class="container">
              <div class="columns">
                  <div class="column is-8-desktop is-offset-2-desktop">
                      <h1 class="title is-2 is-spaced">
                        {% title %}
                      </h1>
                      <h2 class="subtitle is-4">
                        {% subtitle %}
                      </h2>
                  </div>
                  <div class="column">
                    <button 
                      @click="getData()"
                      class="button is-danger is-inverted is-outlined is-large"
                      :class="{'is-loading': isLoading}">
                      See Results <i class="fas fa-angle-right" style="width: 2rem;"></i>
                    </button>
                  </div>
              </div>
          </div>
      </div>
    </section>  
  `,
  props: [
    'title', 'subtitle', 'isLoading', 'heroClass'
  ],
  data() {
    return {

    }
  },
  methods: {
    getData: function () {
      Eventbus.$emit('getData', 0) 
    }
  }
}

export default gongosHero
