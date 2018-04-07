// hero component
const gongosHero = {
  template: `
    <section class="hero is-medium is-primary">
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
                  <div class="column is-12-desktop">
                    <button 
                      @click="$emit('get-data')"
                      class="button is-primary is-inverted is-outlined is-large"
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
    'title', 'subtitle', 'isLoading'
  ],
  data() {
    return {

    }
  },
  methods: {

  }
}
