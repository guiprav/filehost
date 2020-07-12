import axios from 'axios';

class StorageModel {
  hub = axios.create({ baseURL: 'https://protohub.guiprav.cc/filehost' });
  filet = axios.create({ baseURL: 'https://filet.guiprav.cc/filehost' });

  data = {};
  uploading = new Set();

  userId = null;
  dirId = null;

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
    .concat(...this.uploading)
    .filter((x: any) => x.parentId === this.dirId)
    .sort((a, b) => {
      if (a.type === 'dir' && b.type !== 'dir') {
        return -1;
      }

      if (a.name < b.name) {
        return -1;
      }

      if (a.name > b.name) {
        return 1;
      }

      return 0;
    });

  async browse(dirId) {
    let res = await this.hub.get('main');
    let data = {};

    for (let x of res.data) {
      data[x._id] = x;
    }

    if (!data[dirId]) {
      throw new Error(`${dirId} not found`);
    }

    this.data = data;
    this.dirId = dirId;
  }

  async createDir(name) {
    let res = await this.hub.post('main', {
      parentId: this.dirId,
      type: 'dir',
      name,
    });

    this.data[res.data._id] = res.data;
  }

  async upload(parentId, file, { onProgress } = {}) {
    let st = {
      parentId,
      file,
      name: file.name,
      progress: 0,
      filetRes: null,
      hubRes: null,
      error: null,
    };

    try {
      this.uploading.add(st);

      let uploadData = new FormData();

      uploadData.append('file', file);

      st.filetRes = await this.filet.post('upload', uploadData, {
        onUploadProgress: ev => {
          st.progress = ev.loaded / ev.total;
          console.log({ ...st });
          onProgress && onProgress(ev);
        },
      });

      st.progress = null;

      st.hubRes = await this.hub.post('main', {
        parentId,
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
