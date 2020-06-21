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

class AppSidebar extends d.Component {
  render = () => (
    <div class="AppSidebar">
      <div class="AppSidebar-appName">File Host</div>
    </div>
  );
}

export default AppSidebar;
