import React from './kreact';

const render = (node, container) => {
  container.appendChild(createNode(node));
};

const createNode = (vnode) => {
  const { type } = vnode;
  if (typeof type === "string") {
    // 原生节点
    return updateHostComponent(vnode);
  } else if (isStringOrNumber(vnode)) {
    // 文本节点
    return updateTextComponent(vnode);
  } else if (vnode.type === React.Fragment) {
    // Fragment
    return updateFragmentComponent(vnode);
  } else if (typeof vnode.type === 'function') {
    // 函数或者类接节点
    return (!!vnode.type.prototype && vnode.type.prototype.isReactComponent) ?
      updateClassComponent(vnode) : updateFunctionalComponent(vnode)
  }
  return null
};

const updateNode = (el, props) => {
  // 设置props到原生节点
  return Object.keys(props)
    .filter(k => k !== 'children')
    .map(k => {
      el[k] = props[k];
    })
};

const updateHostComponent = (vnode) => {
  // 创建原生节点
  const { type, props } = vnode;
  const el = document.createElement(type);
  // 写props
  updateNode(el, props);
  // 遍历原生节点的children
  reconcileChildren(vnode, el);
  return el;
};

const reconcileChildren = (vnode, el) => {
  const { props } = vnode;
  const childrenList = Array.isArray(props.children) ? props.children : [props.children];
  return childrenList.map((child) => {
    // 渲染子节点的组件
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
  // 实例化类组件
  const instance = new type(props);
  // 渲染组件
  return createNode(instance.render());
};

const updateFragmentComponent = (vnode) => {
  // 创建空元素
  const el = document.createDocumentFragment();
  // 渲染子节点到空元素
  reconcileChildren(vnode, el);
  return el;
};

const updateFunctionalComponent = (vnode) => {
  const { type, props } = vnode;
  // 实例化函数组件
  const instance = type(props);
  // 渲染组件
  return createNode(instance);
};

export default {
  render
};
