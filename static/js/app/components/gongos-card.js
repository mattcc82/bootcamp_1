// card component
const gongosCard = {
  template: `
    <div :class="cardSize">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">
            {% cardTitle %}
          </p>
        </header>
        <div class="card-content">
          <div class="content">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  `,
  props: ['cardTitle', 'cardSize'],
  data() {
    return {

    }
  },
  methods: {

  }
}
