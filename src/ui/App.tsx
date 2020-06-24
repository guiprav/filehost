import AppNavBar from './AppNavBar';
import AppSidebar from './AppSidebar';
import DirHeader from './DirHeader';
import DirListView from './DirListView';
import Navigo from 'navigo';
import d from 'dominant';
import netlifyIdentity, { User } from 'netlify-identity-widget';

document.head.append(d.el('style', `
  .App-browsePage {
    display: flex;
    width: 100vw;
    height: 100vh;
  }
  
  .App-sidebar {
    display: flex;
    box-shadow: 10px 0px 50px var(--gray-200);
  }
  
  .App-contentsPanel {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }
`));

class App extends d.Component {
  auth = netlifyIdentity;
  router = new Navigo();

  user: User;

  constructor() {
    super();

    (window as any).app = this;

    this.initRouter();
    this.initAuth();
  }

  initRouter() {
    this.router.hooks({ after: () => d.update() });

    this.router.on('/login', () => {
      if (this.user) {
        this.router.navigate('/browse');
        return;
      }

      this.auth.open('signup');
    });

    this.router.on('/browse', () => {
      if (!this.user) {
        this.router.navigate('/login');
        return;
      }
    });
  }

  initAuth() {
    this.auth.on('error', err => console.error(err));

    this.auth.on('init', user => {
      if (!user) {
        this.router.navigate('/login');
        return;
      }

      this.user = user;
      this.router.navigate('/browse');
    });

    this.auth.on('login', user => {
      this.user = user;
      this.router.navigate('/browse');
    });

    this.auth.on('logout', () => {
      this.user = null;
      this.router.navigate('/login');
    });

    this.auth.init();
  }

  onLogoutClick = async () => {
    await this.auth.logout();
  };

  breadcrumbs = [
    { key: 'myFiles', icon: 'fa fa-folder-o', label: 'My Files' },
    { key: 'pictures', label: 'Pictures' },
  ];

  get lastBreadcrumb() {
    return this.breadcrumbs[this.breadcrumbs.length - 1];
  }

  dirEntries = [
    {
      _id: 'fake-id-1',
      type: 'dir',
      name: 'Memes',
      modifiedAt: 'Today',
      size: '-',
    },

    {
      _id: 'fake-id-2',
      type: 'file',
      uuid: '1a26940b-919d-4029-b462-dd2651a7463b',
      name: 'sadboy_and_egirl.jpg',
      modifiedAt: 'Today',
      size: '22 KiB',
    },

    {
      _id: 'fake-id-3',
      type: 'file',
      uuid: 'ed48e726-1ecc-411d-a5b0-89d43f965e75',
      name: 'js_is_shit.jpg',
      modifiedAt: 'Today',
      size: '22 KiB',
    },

    {
      _id: 'fake-id-4',
      type: 'file',
      uuid: '1fb01c1f-814b-45e7-b54a-f8c4a8c8e36f',
      name: 'hentai_3am.jpg',
      modifiedAt: 'Today',
      size: '22 KiB',
    },
  ];

  render = () => (
    <div class="App">
      {d.if(() => this.user, (
        <div class="App-browsePage">
          <div class="App-sidebar">
            <AppSidebar onLogoutClick={this.onLogoutClick} />
          </div>

          <div class="App-contentsPanel">
            <AppNavBar
              breadcrumbs={() => this.breadcrumbs}
              onHistoryClick={(x) => console.log(x)}
              onBreadcrumbClick={(x) => console.log(x)}
            />

            <DirHeader heading={() => this.lastBreadcrumb.label} />

            <DirListView
              entries={() => this.dirEntries}
              onEntryClick={(x) => console.log('open:', x)}
              onCheckboxToggle={(_id, checked) => console.log(_id, 'checked:', checked)}
              onCopyLinkBtnClick={(x) => console.log('copy link:', x)}
              onShareBtnClick={(x) => console.log('share:', x)}
              onCutBtnClick={(x) => console.log('cut:', x)}
              onCopyBtnClick={(x) => console.log('copy:', x)}
              onDeleteBtnClick={(x) => console.log('delete:', x)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
