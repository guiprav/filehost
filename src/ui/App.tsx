import './App.css';
import 'sweetalert2/dist/sweetalert2.css';
import AppNavBar from './AppNavBar';
import AppSidebar from './AppSidebar';
import DirHeader from './DirHeader';
import DirListView from './DirListView';
import Navigo from 'navigo';
import StorageModel from '../StorageModel';
import axios from 'axios';
import d from 'dominant';
import netlifyIdentity, { User } from 'netlify-identity-widget';

class App extends d.Component {
  auth = netlifyIdentity;
  router = new Navigo();

  user: User;
  storage: StorageModel;

  data: any;

  dirId: string;
  dir = () => this.data && this.data[this.dirId];

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

    this.auth.on('init', async user => {
      if (!user) {
        this.router.navigate('/login');
        return;
      }

      // No idea why, but init is being fired twice.
      if (this.user) {
        return;
      }

      this.user = user;
      this.storage = new StorageModel(user.id);

      await this.storage.initUser({ handle: user.email });

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

  onBrowsePageAttach = async () => {
    await this.storage.browse(this.user.id);
    d.update();
  };

  render = () => (
    <div class="App">
      {d.if(() => this.user, (
        <div class="App-browsePage" onAttach={this.onBrowsePageAttach}>
          <div class="App-sidebar">
            <AppSidebar onLogoutClick={this.onLogoutClick} />
          </div>

          <div class="App-contentsPanel">
            <AppNavBar
              breadcrumbs={() => this.storage.curPath()}
              onHistoryClick={x => console.log(x)}
              onBreadcrumbClick={async x => {
                await this.storage.browse(x);
                d.update();
              }}
            />

            <DirHeader
              heading={() => this.lastBreadcrumb.label}
              onCreateFolder={async x => {
                await this.storage.createDir(x);
                d.update();
              }}
              onUploadFiles={async xs => {
                let { dirId } = this.storage;

                for (let x of xs) {
                  await this.storage.upload(dirId, x, {
                    onProgress: () => d.update(),
                  });

                  d.update();
                }
              }}
            />

            <DirListView
              entries={() => this.storage.dirEntries()}
              onEntryClick={async x => {
                let entry = this.storage.data[x];

                if (entry.type === 'dir') {
                  await this.storage.browse(x);
                  d.update();
                }
              }}
              onCheckboxToggle={(_id, checked) => console.log(_id, 'checked:', checked)}
              onCopyLinkBtnClick={x => console.log('copy link:', x)}
              onShareBtnClick={x => console.log('share:', x)}
              onCutBtnClick={x => console.log('cut:', x)}
              onCopyBtnClick={x => console.log('copy:', x)}
              onDeleteBtnClick={x => console.log('delete:', x)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default App;
