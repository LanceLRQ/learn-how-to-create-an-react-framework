import React from './kreact';

const render = (node, container) => {
  container.appendChild(createNode(node));
};

const createNode = (vnode) => {
  const { type } = vnode;
  if (typeof type === "string") {
    return updateHostComponent(vnode);
  } else if (isStringOrNumber(vnode)) {
    return updateTextComponent(vnode);
  } else if (vnode.type === React.Fragment) {
    return updateFragmentComponent(vnode);
  } else if (typeof vnode.type === 'function') {
    return (!!vnode.type.prototype && vnode.type.prototype.isReactComponent) ?
      updateClassComponent(vnode) : updateFunctionalComponent(vnode)
  }
  return null
};

const updateNode = (el, props) => {
  return Object.keys(props)
    .filter(k => k !== 'children')
    .map(k => {
      el[k] = props[k];
    })
};

const updateHostComponent = (vnode) => {
  const { type, props } = vnode;
  const el = document.createElement(type);
  updateNode(el, props);
  reconcileChildren(vnode, el);
  return el;
};

const reconcileChildren = (vnode, el) => {
  const { props } = vnode;
  const childrenList = Array.isArray(props.children) ? props.children : [props.children];
  return childrenList.map((child) => {
    return render(child, el);
  })
};

const isStringOrNumber = (vnode) => {
  return typeof vnode === 'string' || typeof vnode === 'number';
};

const updateTextComponent = (vnode) => {
  return document.createTextNode(vnode);
};

const updateClassComponent = (vnode) => {
  const { type, props } = vnode;
  const instance = new type(props);
  return createNode(instance.render());
};

const updateFragmentComponent = (vnode) => {
  const el = document.createDocumentFragment();
  reconcileChildren(vnode, el);
  return el;
};

const updateFunctionalComponent = (vnode) => {
  const { type, props } = vnode;
  const instance = type(props);
  return createNode(instance);
};

export default {
  render
};
