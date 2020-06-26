import './IconCheckbox.css';
import d from 'dominant';
import omit from 'lodash/omit';

type Prop<T> = T | (() => T);

interface IconCheckboxProps {
  class?: Prop<string | string[]>;
  checked?: Prop<boolean>;
  onClick?: (ev: MouseEvent) => void;
}

let IconCheckbox = (props: IconCheckboxProps) => (
  <label class={['IconCheckbox', props.class].flat()}>
    <input
      class="IconCheckbox-input"
      type="checkbox"
      {...omit(props, 'class')}
    />

    <i class="IconCheckbox-uncheckedIcon fa fa-square-o" />
    <i class="IconCheckbox-checkedIcon fa fa-check-square" />
  </label>
);

export default IconCheckbox;
