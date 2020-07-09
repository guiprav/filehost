import axios from 'axios';

class StorageModel {
  hub = axios.create({ baseURL: 'https://protohub.guiprav.cc/filehost' });
  filet = axios.create({ baseURL: 'https://filet.guiprav.cc/filehost' });

  data = {};
  uploading = new Set();

  constructor(userId) {
    this.userId = userId;
  }

  async initUser(data) {
    await this.hub.put(`main/${this.userId}`, data);
  }

  curPath() {
    if (!this.dirId) {
      return [];
    }

    let c = this.data[this.dirId];
    let xs = [];

    while (c) {
      let label;

      if (c._id === this.userId) {
        label = 'My Files';
      }
      else {
        label = c.type === 'user' ? c.handle : c.name;
      }

      xs.unshift({ _id: c._id, label });
      c = c.parentId && this.data[c.parentId];
    }

    return xs;
  }

  dirEntries = () => Object.values(this.data)
    .filter(x => x.parentId === this.dirId);

  browse(dirId) {
    this.data = {
      'dirEntry:1': {
        _id: 'dirEntry:1',
        parentId: 'user:1',
        type: 'dir',
        name: 'Pictures',
      },

      'dirEntry:2': {
        _id: 'dirEntry:2',
        parentId: 'dirEntry:1',
        type: 'dir',
        name: 'Memes',
      },

      'dirEntry:3': {
        _id: 'dirEntry:3',
        parentId: 'dirEntry:2',
        type: 'file',
        name: 'shoo_sadness.jpg',
        uuid: '1234',
      },
    };

    if (!this.data[dirId]) {
      throw new Error();
    }

    this.dirId = dirId;
  }

  async upload(file) {
    try {
      let st = {
        parentId: this.dirId,
        file,
        name: file.name,
        progress: 0,
      };

      this.uploading.add(st);

      let uploadData = new FormData();

      uploadData.append('file', file);

      st.filetRes = await this.filet.post('upload', uploadData, {
        onUploadProgress: ev => {
          st.progress = ev.loaded / ev.total;
          console.log({ ...st });
        },
      });

      st.hubRes = await this.hub.post('main', {
        parentId: this.dirId,
        type: 'file',
        name: file.name,
        uuid: st.filetRes.data.uuid,
      });

      this.data[st.hubRes.data._id] = st.hubRes.data;
      this.uploading.delete(st);
    }
    catch (err) {
      console.error(err);
      st.error = err;
    }
  }
}

export default StorageModel;

async function t0() {
  let s = new StorageModel('user:1');
  await s.initUser({ handle: 'user:1' });
}

async function t1() {
  let s = new StorageModel('user:1');

  await s.browse('dirEntry:2');
  console.log(s.curPath());
  console.log(s.dirEntries());
}

async function t2() {
  let s = new StorageModel('user:1');

  let data = new TextEncoder().encode('hello, world');
  let file = new File([data], 'hello');

  await s.upload(file);
}

//t0();
