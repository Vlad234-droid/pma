import '@testing-library/jest-dom';
jest.mock('react-markdown', () => ({ ReactMarkdown: () => 'mocked ReactMarkdown' }));