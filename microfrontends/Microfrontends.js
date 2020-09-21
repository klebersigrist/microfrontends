// eslint-disable-next-line
import 'systemjs';
import axios from 'axios';

class Microfrontends {
  constructor() {
    if (!window.singletonMicrofrontends) {
      window.singletonMicrofrontends = this;
    }

    this._microfrontendsModules = {};

    return window.singletonMicrofrontends;
  }

  create(module, hooks) {
    this._microfrontendsModules[module] = hooks;
  }

  async load(module, outletElement) {
    return new Promise(async (resolve, reject) => {
      this.loadingModule = module.name;

      try {
        const { data } = await this._loadManifest(`${module.host}${module.path}`);

        outletElement.innerHTML = data.html;

        await this._initAssets(module, data.styles, data.scripts);

        if (this.loadingModule === module.name) {
          this.mount(module.name);
          resolve(true);
        }
      } catch (error) {
        if (this.loadingModule === module.name) {
          reject(error);
        }
      }
    });
  }

  mount(module) {
    if (this._microfrontendsModules[module] && this._microfrontendsModules[module].onMount) {
      this._microfrontendsModules[module].onMount();
    }
  }

  destroy(module) {
    this._unloadStyle(module.name);
    if (this._microfrontendsModules[module] && this._microfrontendsModules[module].onDestroy) {
      this._microfrontendsModules[module].onDestroy();
    }
  }

  reset() {
    this._microfrontendsModules = {};
  }

  async _loadManifest(url) {
    return axios.get(url, { timeout: 10000 });
  }

  async _initAssets(module, styles, scripts) {
    return Promise.all([
      this._initStyles(module, styles),
      this._initScripts(module, scripts),
    ]);
  }

  async _initStyles(module, styles) {
    const promises = styles.map(this._loadStyle.bind(null, module));
    await Promise.all(promises);
  }

  async _initScripts(module, scripts) {
    const promises = scripts.map(this._loadScript.bind(null, module));
    await Promise.all(promises);
  }

  _loadStyle(module, style) {
    return new Promise((resolve, reject) => {
      const styleElement = document.createElement('link');
      styleElement.rel = 'stylesheet';
      styleElement.href = `${module.host}${style}`;
      styleElement.onload = () => resolve(true);
      styleElement.onerror = error => reject(error);
      styleElement.setAttribute('data-dynamic-style', module.name);
      document.getElementsByTagName('head')[0].appendChild(styleElement);
    });
  }

  _loadScript(module, script) {
    // eslint-disable-next-line
    return System.import(`${module.host}${script}`);
  }

  _unloadStyle(moduleName) {
    const dynamicStyles = document.querySelectorAll(`link[data-dynamic-style=${moduleName}]`);
    for (let i = dynamicStyles.length; i >= 0; i -= 1) {
      if (dynamicStyles[i]) {
        dynamicStyles[i].parentNode.removeChild(dynamicStyles[i]);
      }
    }
  }
}

export default new Microfrontends();
