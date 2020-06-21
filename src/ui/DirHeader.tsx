import d from 'dominant';

document.head.append(
  d.el(
    'style',
    `
  .DirHeader {
    padding: var(--sp-4) var(--sp-6) var(--sp-3);
  }
  
  .DirHeader-heading {
    font-size: var(--text-2xl);
    color: var(--gray-900);
  }
`,
  ),
);

class DirHeader extends d.Component {
  props = null;

  constructor(props) {
    super();
    this.props = props;
  }

  heading = () => d.resolve(this.props.heading) || '';

  render = () => (
    <div class="DirHeader">
      <div class="DirHeader-heading">{d.text(this.heading)}</div>
    </div>
  );
}

export default DirHeader;
