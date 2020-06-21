import AppNavBar from './AppNavBar';
import AppSidebar from './AppSidebar';
import DirHeader from './DirHeader';
import DirListView from './DirListView';
import d from 'dominant';

document.head.append(
  d.el(
    'style',
    `
  .App {
    width: 100vw;
    height: 100vh;
    display: flex;
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
`,
  ),
);

class App extends d.Component {
  breadcrumbs = [
    { key: 'myFiles', icon: 'fa fa-folder-o', label: 'My Files' },
    { key: 'pictures', label: 'Pictures' },
  ];

  get lastBreadcrumb() {
    return this.breadcrumbs[this.breadcrumbs.length - 1];
  }

  dirEntries = [
    {
      _id: 'fake-id',
      type: 'dir',
      name: 'Memes',
      modifiedAt: 'Today',
      size: '-',
    },

    {
      type: 'file',
      uuid: '1a26940b-919d-4029-b462-dd2651a7463b',
      name: 'sadboy_and_egirl.jpg',
      modifiedAt: 'Today',
      size: '22 KiB',
    },

    {
      type: 'file',
      uuid: 'ed48e726-1ecc-411d-a5b0-89d43f965e75',
      name: 'js_is_shit.jpg',
      modifiedAt: 'Today',
      size: '22 KiB',
    },

    {
      type: 'file',
      uuid: '1fb01c1f-814b-45e7-b54a-f8c4a8c8e36f',
      name: 'hentai_3am.jpg',
      modifiedAt: 'Today',
      size: '22 KiB',
    },
  ];

  render = () => (
    <div class="App">
      <div class="App-sidebar">
        <AppSidebar />
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
          onEntryClick={(x) => console.log(x)}
        />
      </div>
    </div>
  );
}

export default App;
