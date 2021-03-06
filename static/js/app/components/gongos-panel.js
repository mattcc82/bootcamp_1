// gongos side-panel
import Eventbus from './eventbus.js'

const gongosPanel = {
  template: `
    <nav class="panel is-radiusless">
      <p class="panel-heading is-radiusless">
        By Decade
      </p>
      <div class="panel-block has-background-danger is-radiusless">
        <div class="buttons">
          <button 
            @click="getData(index)" 
            class="button is-outlined" 
            :class="decade === 'All Time' ? 'is-primary' : 'is-danger'" 
            v-for="(decade, index) in filters.decades" :key="index">
            {% decade %}
          </button>
        </div>
      </div>
    </nav>  
  `,
  props: [
    
  ],
  data() {
    return {
      filters: {
        decades: ['All Time', '90\'s', '00\'s', '10\'s']
      }
    }
  },
  methods: {
    getData (index) {
      Eventbus.$emit('getData', index)
    }
  }
}

export default gongosPanel
