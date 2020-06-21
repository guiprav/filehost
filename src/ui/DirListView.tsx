import d from 'dominant';

document.head.append(
  d.el(
    'style',
    `
  .DirListView {
    padding: var(--sp-3) var(--sp-6);
  }

  .DirListView-table {
    width: 100%;
  }

  .DirListView-headerRow th {
    padding-bottom: var(--sp-4);
    text-align: left;
    color: #A5AEC0;
  }
  
  .DirListView-entryRow {
    font-size: var(--text-sm);
  }

  .DirListView-entryRow td {
    padding: var(--sp-2) 0;
  }
`,
  ),
);

class DirListView extends d.Component {
  props = null;

  constructor(props) {
    super();
    this.props = props;
  }

  entries = () => d.resolve(this.props.entries) || [];

  entryHrefFor = ({ type, uuid, name }) =>
    type === 'file' ? `https://filet.n2.gs/filehost/${uuid}/${name}` : '#';

  onEntryClick = (_id) =>
    this.props.onEntryClick && this.props.onEntryClick(_id);

  render = () => (
    <div class="DirListView">
      {d.if(
        () => this.entries().length,
        <table class="DirListView-table">
          <tr class="DirListView-headerRow">
            <th>Name</th>
            <th>Modified</th>
            <th>Size</th>
            <th>Actions</th>
          </tr>

          {d.map(this.entries, (x) => (
            <tr class="DirListView-entryRow">
              <td class="DirListView-nameCell">
                <a
                  href={() => this.entryHrefFor(x)}
                  onClick={() => this.onEntryClick(x._id)}
                  target="_blank"
                >
                  {d.text(() => x.name)}
                </a>
              </td>

              <td class="DirListView-modifiedAtCell">
                {d.text(() => x.modifiedAt)}
              </td>

              <td class="DirListView-sizeCell">{d.text(() => x.size)}</td>

              <td></td>
            </tr>
          ))}
        </table>,
      )}
    </div>
  );
}

export default DirListView;
