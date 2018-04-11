// card component
const gongosCard = {
  template: `
    <div :class="cardSize">
      <div class="card">
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
