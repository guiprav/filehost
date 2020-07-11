import './DirListView.css';
import IconCheckbox from './IconCheckbox';
import d from 'dominant';

type Prop<T> = T | (() => T);

interface DirListViewEntry {
  _id: string;
  type: string;
  uuid?: string;
  name: string;
  modifiedAt: string;
  size?: string;
}

interface DirListViewProps {
  entries?: Prop<DirListViewEntry[]>;
  selected?: Prop<Set<string>>;
  onCheckboxToggle?: (_id: string, checked: boolean) => void;
  onEntryClick?: (_id: string) => void;
  onCopyLinkBtnClick?: (_id: string) => void;
  onShareBtnClick?: (_id: string) => void;
  onCutBtnClick?: (_id: string) => void;
  onCopyBtnClick?: (_id: string) => void;
  onDeleteBtnClick?: (_id: string) => void;
}

class DirListView extends d.Component {
  props: DirListViewProps;

  constructor(props: DirListViewProps) {
    super();
    this.props = props;
  }

  entries = (): DirListViewEntry[] => d.resolve(this.props.entries) || [];

  get selected(): Set<string> {
    return d.resolve(this.props.selected) || new Set();
  }

  iconClassesFor = ({ type, name }: DirListViewEntry): string => {
    if (type === 'dir') {
      return 'fa fa-folder-o';
    }

    let ext = name.split('.').pop();

    switch (ext) {
      case 'jpg':
        return 'fa fa-file-image-o';

      default:
        return 'fa fa-file-o';
    }
  };

  entryHrefFor = ({ type, uuid, name }: DirListViewEntry) =>
    type === 'file' ? `https://filet.guiprav.cc/filehost/${uuid}/${name}` : '#';

  onCheckboxClick = (ev: MouseEvent, _id: string) => {
    let target = ev.target as HTMLInputElement;

    if (this.props.onCheckboxToggle) {
      this.props.onCheckboxToggle(_id, target.checked);
    }
  };

  onEntryClick = (_id: string) =>
    this.props.onEntryClick && this.props.onEntryClick(_id);

  onCopyLinkBtnClick = (_id: string) =>
    this.props.onCopyLinkBtnClick && this.props.onCopyLinkBtnClick(_id);

  onShareBtnClick = (_id: string) =>
    this.props.onShareBtnClick && this.props.onShareBtnClick(_id);

  onCutBtnClick = (_id: string) =>
    this.props.onCutBtnClick && this.props.onCutBtnClick(_id);

  onCopyBtnClick = (_id: string) =>
    this.props.onCopyBtnClick && this.props.onCopyBtnClick(_id);

  onDeleteBtnClick = (_id: string) =>
    this.props.onDeleteBtnClick && this.props.onDeleteBtnClick(_id);

  render = () => (
    <div class="DirListView">
      {d.if(() => this.entries().length, (
        <table class="DirListView-table">
          <tr class="DirListView-headerRow">
            <th class="DirListView-nameHeaderCell">Name</th>
            <th class="DirListView-modifiedAtHeaderCell">Modified</th>
            <th class="DirListView-sizeHeaderCell">Size</th>
            <th class="DirListView-actionsHeaderCell">Actions</th>
          </tr>

          {d.map(this.entries, (x: DirListViewEntry) => (
            <tr class="DirListView-entryRow">
              <td class="DirListView-nameCell">
                <IconCheckbox
                  class="DirListView-nameCheckbox"
                  checked={() => this.selected.has(x._id)}
                  onClick={ev => this.onCheckboxClick(ev, x._id)}
                />

                <i class={[
                  'DirListView-entryIcon',
                  () => this.iconClassesFor(x),
                ]} />

                <a
                  class="DirListView-nameLink"
                  href={() => this.entryHrefFor(x)}
                  onClick={() => this.onEntryClick(x._id)}
                  target="_blank"
                >
                  {d.text(() => x.name)}
                </a>

                {d.if(() => typeof x.progress === 'number', (
                  <span class="DirListView-uploadStats">
                    {d.text(() => Math.round(x.progress * 100))}% @ 0 KiB/s
                  </span>
                ))}
              </td>

              <td class="DirListView-modifiedAtCell">
                {d.text(() => x.modifiedAt)}
              </td>

              <td class="DirListView-sizeCell">{d.text(() => x.size)}</td>

              <td class="DirListView-actionsCell">
                <button
                  class="DirListView-actionBtn seamlessBtn"
                  onClick={() => this.onCopyLinkBtnClick(x._id)}
                >
                  <i class="fa fa-link" />
                </button>

                <button
                  class="DirListView-actionBtn seamlessBtn"
                  onClick={() => this.onShareBtnClick(x._id)}
                >
                  <i class="fa fa-share-alt" />
                </button>

                <button
                  class="DirListView-actionBtn seamlessBtn"
                  onClick={() => this.onCutBtnClick(x._id)}
                >
                  <i class="fa fa-cut" />
                </button>

                <button
                  class="DirListView-actionBtn seamlessBtn"
                  onClick={() => this.onCopyBtnClick(x._id)}
                >
                  <i class="fa fa-copy" />
                </button>

                <button
                  class="DirListView-actionBtn seamlessBtn"
                  onClick={() => this.onDeleteBtnClick(x._id)}
                >
                  <i class="fa fa-trash-o" />
                </button>
              </td>
            </tr>
          ))}
        </table>
      ))}
    </div>
  );
}

export default DirListView;
