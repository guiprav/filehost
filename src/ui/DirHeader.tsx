import d from 'dominant';

document.head.append(d.el( 'style', `
  .DirHeader {
    display: flex;
    align-items: baseline;
    padding: var(--sp-4) var(--sp-6) var(--sp-3);
  }
  
  .DirHeader-heading {
    font-size: var(--text-2xl);
    color: var(--gray-900);
  }

  .DirHeader-actions {
    position: relative;
    top: 2px;
    margin-left: var(--sp-12);
  }

  .DirHeader-actionBtn {
    font-size: var(--text-2xl);
    color: #252525;
    opacity: 0.2;
  }

  .DirHeader-actionBtn:hover {
    opacity: 0.8;
  }
`));

type Prop<T> = T | (() => T);

interface DirHeaderProps {
  heading: Prop<string>;
}

class DirHeader extends d.Component {
  props: DirHeaderProps;

  constructor(props: DirHeaderProps) {
    super();
    this.props = props;
  }

  get heading() {
    return d.resolve(this.props.heading) || '';
  }

  render = () => (
    <div class="DirHeader">
      <div class="DirHeader-heading">
        {d.text(() => this.heading)}
      </div>

      <div class="DirHeader-actions">
        <button class="DirHeader-actionBtn seamlessBtn">
          <i class="fa fa-cloud-upload" />
        </button>
      </div>
    </div>
  );
}

export default DirHeader;
