import './DirHeader.css';
import d from 'dominant';
import swal from 'sweetalert2';

type Prop<T> = T | (() => T);

interface DirHeaderProps {
  heading: Prop<string>;
  onCreateFolder?: (name: string) => void;
}

class DirHeader extends d.Component {
  props: DirHeaderProps;

  constructor(props: DirHeaderProps) {
    super();
    this.props = props;
  }

  get heading() {
    return d.resolve(this.props.heading) || '';
  }

  onCreateFolderBtnClick = async () => {
    let { value } = await swal.fire<string>({
      title: 'New folder name',
      input: 'text',
      showCancelButton: true,
    });

    if (value && this.props.onCreateFolder) {
      this.props.onCreateFolder(value);
    }
  };

  render = () => (
    <div class="DirHeader">
      <div class="DirHeader-heading">
        {d.text(() => this.heading)}
      </div>

      <div class="DirHeader-actions">
        <button
          class="DirHeader-actionBtn seamlessBtn"
          onClick={this.onCreateFolderBtnClick}
        >
          <i class="fa fa-plus-circle" />
        </button>

        <button class="DirHeader-actionBtn seamlessBtn">
          <i class="fa fa-cloud-upload" />
        </button>
      </div>
    </div>
  );
}

export default DirHeader;
