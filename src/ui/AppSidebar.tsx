import d from 'dominant';

document.head.append(
  d.el(
    'style',
    `
  .AppSidebar {
    min-width: 200px;
    padding: var(--sp-5);
    background-color: #F2F4F5;
  }
  
  .AppSidebar-appName {
    font-size: var(--text-xl);
    font-weight: 100;
  }
`,
  ),
);

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
