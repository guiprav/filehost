import './AppSidebar.css';
import d from 'dominant';

interface AppSidebarProps {
  onLogoutClick: (ev: MouseEvent) => void;
}

class AppSidebar extends d.Component {
  props: AppSidebarProps;

  constructor(props: AppSidebarProps) {
    super();
    this.props = props;
  }

  onLogoutClick = (ev: MouseEvent) =>
    this.props.onLogoutClick && this.props.onLogoutClick(ev);

  render = () => (
    <div class="AppSidebar">
      <div class="AppSidebar-appName">File Host</div>

      <button onClick={this.onLogoutClick}>
        Sign out
      </button>
    </div>
  );
}

export default AppSidebar;
