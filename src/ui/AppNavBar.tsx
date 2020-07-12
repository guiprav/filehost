import './AppNavBar.css';
import d from 'dominant';

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
          class="AppNavBar-backBtn seamlessBtn"
          onClick={() => this.onHistoryClick('back')}
        >
          <i class="fa fa-arrow-left" />
        </button>

        <button
          class="AppNavBar-forwardBtn seamlessBtn"
          onClick={() => this.onHistoryClick('forward')}
          disabled
        >
          <i class="fa fa-arrow-right" />
        </button>
      </div>

      <i class="AppNavBar-breadcrumbIcon fa fa-folder-o" />

      <div class="AppNavBar-breadcrumbs">
        {d.map(this.breadcrumbs, (x) => (
          <span class="AppNavBar-breadcrumb">
            <a
              href="#"
              class="AppNavBar-breadcrumbLink seamlessLink"
              onClick={() => this.onBreadcrumbClick(x._id)}
            >
              {d.text(() => x.label)}
            </a>
          </span>
        ))}
      </div>
    </div>
  );
}

export default AppNavBar;
