import React from 'react';
import { I18nextProvider } from 'react-i18next';

const hasChildren = (node) => node && (node.children || (node.props && node.props.children));

const getChildren = (node) => (node && node.children ? node.children : node.props && node.props.children);

const renderNodes = (reactNodes) => {
  if (typeof reactNodes === 'string') {
    return reactNodes;
  }

  return Object.keys(reactNodes).map((key, i) => {
    const child = reactNodes[key];
    const isElement = React.isValidElement(child);

    if (typeof child === 'string') {
      return child;
    }
    if (hasChildren(child)) {
      const inner = renderNodes(getChildren(child));
      return React.cloneElement(child, { ...child.props, key: i }, inner);
    }
    if (typeof child === 'object' && !isElement) {
      return Object.keys(child).reduce((str, childKey) => `${str}${child[childKey]}`, '');
    }

    return child;
  });
};

const useMock = [() => ({ t: (key) => key }), {}];
// useMock.t = (k) => k;
// useMock.i18n = {};

const withTranslation = () => (Component) => (props) => <Component t={(k) => k} {...props} />;
const Trans = ({ children }) => (Array.isArray(children) ? renderNodes(children) : renderNodes([children]));
const useTranslation = () => useMock;

// const I18nextProvider = reactI18next.I18nextProvider;

export { withTranslation, Trans, useTranslation, I18nextProvider };
