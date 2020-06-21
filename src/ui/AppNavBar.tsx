import d from 'dominant';

document.head.append(
  d.el(
    'style',
    `
  .AppNavBar {
    display: flex;
    padding: var(--sp-5) var(--sp-6);
  }

  .AppNavBar-historyActions {
    margin-right: var(--sp-8);
    font-size: var(--text-lg);
    opacity: 0.7;
  }

  .AppNavBar-forwardLink {
    margin-left: var(--sp-5);
  }

  .AppNavBar-backLink,
  .AppNavBar-forwardLink {
    cursor: pointer;
  }

  .AppNavBar-backLink:disabled,
  .AppNavBar-forwardLink:disabled {
    opacity: 0.3;
  }

  .AppNavBar-breadcrumbs {
    display: flex;
    align-items: center;
    font-size: var(--text-sm);
    font-weight: 300;
  }

  .AppNavBar-breadcrumbIcon {
    margin-right: var(--sp-4);
    font-size: var(--text-sm);
  }

  .AppNavBar-breadcrumbSeparator {
    margin: 0 var(--sp-2);
    font-size: var(--text-xs);
    opacity: 0.4;
  }

  .AppNavBar-breadcrumb:nth-child(n+2)::before {
    margin: 0 var(--sp-3);
    content: '\\f054';
    font: normal normal normal 14px/1 ForkAwesome;
    font-size: var(--text-xs);
    opacity: 0.4;
  }
`,
  ),
);

class AppNavBar extends d.Component {
  props = null;

  constructor(props) {
    super();
    this.props = props;
  }

  breadcrumbs = () => d.resolve(this.props.breadcrumbs) || [];

  onHistoryClick = (...xs) =>
    this.props.onHistoryClick && this.props.onHistoryClick(...xs);

  onBreadcrumbClick = (...xs) =>
    this.props.onBreadcrumbClick && this.props.onBreadcrumbClick(...xs);

  render = () => (
    <div class="AppNavBar">
      <div class="AppNavBar-historyActions">
        <button
          class="AppNavBar-backLink seamlessBtn"
          onClick={() => this.onHistoryClick('back')}
        >
          <i class="fa fa-arrow-left" />
        </button>

        <button
          class="AppNavBar-forwardLink seamlessBtn"
          onClick={() => this.onHistoryClick('forward')}
          disabled
        >
          <i class="fa fa-arrow-right" />
        </button>
      </div>

      <div class="AppNavBar-breadcrumbs">
        {d.map(this.breadcrumbs, (x) => (
          <span class="AppNavBar-breadcrumb">
            <a
              href="#"
              class="AppNavBar-breadcrumbLink seamlessLink"
              onClick={() => this.onBreadcrumbClick(x.key)}
            >
              {d.if(
                () => x.icon,
                <i class={() => ['AppNavBar-breadcrumbIcon', x.icon]} />,
              )}

              {d.text(() => x.label)}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}

export default AppNavBar;
