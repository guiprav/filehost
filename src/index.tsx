import App from './ui/App';
import d from 'dominant';

(window as any).d = d;

addEventListener('click', ev => {
  let { target } = ev;

  if (target instanceof HTMLAnchorElement && target.href.endsWith('#')) {
    ev.preventDefault();
  }
});

document.body.append(<App />);
