import React from 'react';
import { fireEvent, cleanup } from '@testing-library/react';
import { renderWithTheme as render } from 'utils/test';

import { BaseAccordion, Accordion, Header, BaseHeader, Panel, BasePanel, BaseSection, Section } from './';

describe('Accordion', () => {
  afterEach(cleanup);

  it('expands all sections on expandAllSections', () => {
    const { getByTestId } = render(
      <BaseAccordion id='test-accordion'>
        {({ expandAllSections }) => (
          <div>
            <button data-test-id='expand-button' onClick={expandAllSections}>
              Expand all sections
            </button>
            <BaseSection defaultExpanded={false}>
              {({ expanded, getSectionProps }) => (
                <div
                  {...getSectionProps({
                    'data-test-id': 'section1',
                    'data-expanded': expanded,
                  })}
                />
              )}
            </BaseSection>
            <BaseSection defaultExpanded={false}>
              {({ expanded, getSectionProps }) => (
                <div
                  {...getSectionProps({
                    'data-test-id': 'section2',
                    'data-expanded': expanded,
                  })}
                />
              )}
            </BaseSection>
          </div>
        )}
      </BaseAccordion>,
    );

    const button = getByTestId('expand-button');
    const section1 = getByTestId('section1');
    const section2 = getByTestId('section2');

    fireEvent.click(button);

    expect(section1.dataset.expanded).toEqual('true');
    expect(section2.dataset.expanded).toEqual('true');

    // Check that the sections stay expanded
    fireEvent.click(button);

    expect(section1.dataset.expanded).toEqual('true');
    expect(section2.dataset.expanded).toEqual('true');
  });

  it('collapses all sections on collapseAllSections', () => {
    const { getByTestId } = render(
      <BaseAccordion id='test-accordion'>
        {({ collapseAllSections }) => (
          <div>
            <button data-test-id='collapse-button' onClick={collapseAllSections}>
              Collapse all sections
            </button>
            <BaseSection defaultExpanded>
              {({ expanded, getSectionProps }) => (
                <div
                  {...getSectionProps({
                    'data-test-id': 'section1',
                    'data-expanded': expanded,
                  })}
                />
              )}
            </BaseSection>
            <BaseSection defaultExpanded>
              {({ expanded, getSectionProps }) => (
                <div
                  {...getSectionProps({
                    'data-test-id': 'section2',
                    'data-expanded': expanded,
                  })}
                />
              )}
            </BaseSection>
          </div>
        )}
      </BaseAccordion>,
    );

    const button = getByTestId('collapse-button');
    const section1 = getByTestId('section1');
    const section2 = getByTestId('section2');

    fireEvent.click(button);

    expect(section1.dataset.expanded).toEqual('false');
    expect(section2.dataset.expanded).toEqual('false');

    // Check that the sections stay collapsed
    fireEvent.click(button);

    expect(section1.dataset.expanded).toEqual('false');
    expect(section2.dataset.expanded).toEqual('false');
  });

  describe('BaseSection', () => {
    it('defaults to collapsed', () => {
      let sectionExpanded: boolean | null = null;

      render(
        <Accordion id='test-accordion'>
          <BaseSection>
            {({ expanded }) => {
              sectionExpanded = expanded;

              return null;
            }}
          </BaseSection>
        </Accordion>,
      );

      expect(sectionExpanded).toBe(false);
    });

    it('can use defaultExpanded prop', () => {
      let sectionExpanded: boolean | null = null;

      render(
        <Accordion id='test-accordion'>
          <BaseSection defaultExpanded>
            {({ expanded }) => {
              sectionExpanded = expanded;

              return null;
            }}
          </BaseSection>
        </Accordion>,
      );

      expect(sectionExpanded).toBe(true);
    });

    it('getSectionProps can accept 0 arguments', () => {
      const { queryByTestId } = render(
        <Accordion id='test-accordion'>
          <BaseSection>{({ getSectionProps }) => <div {...getSectionProps()} data-test-id='section' />}</BaseSection>
        </Accordion>,
      );

      expect(queryByTestId('section')).not.toBeNull();
    });

    it('calls onToggle with next expanded state', () => {
      const onToggle = jest.fn();

      const { getByTestId } = render(
        <Accordion id='test-accordion'>
          <Section defaultExpanded onToggle={onToggle}>
            <Header title='test-title' data-test-id='header' />
          </Section>
        </Accordion>,
      );

      const header = getByTestId('header');
      fireEvent.click(header);

      expect(onToggle).not.toHaveBeenCalled();
    });

    it('getHeadingProps can accept arguments', () => {
      const { queryByTestId } = render(
        <Accordion id='test-accordion'>
          <Section>
            <BaseHeader>
              {({ getHeadingProps }) => (
                <div
                  {...getHeadingProps({
                    'data-test-id': 'header',
                  })}
                />
              )}
            </BaseHeader>
          </Section>
        </Accordion>,
      );

      expect(queryByTestId('header')).not.toBeNull();
    });

    it('getElementToggleProps can accept 0 arguments', () => {
      const { queryByTestId } = render(
        <Accordion id='test-accordion'>
          <Section>
            <BaseHeader>
              {({ getElementToggleProps }) => <div {...getElementToggleProps()} data-test-id='header' />}
            </BaseHeader>
          </Section>
        </Accordion>,
      );

      expect(queryByTestId('header')).not.toBeNull();
    });
  });

  describe('Panel', () => {
    describe('role', () => {
      it('is set to region when there are 6 or less panels', () => {
        const { getByTestId } = render(
          <Accordion id='test-accordion'>
            <Section>
              <Panel data-test-id='panel' />
            </Section>
            <Section>
              <Panel />
            </Section>
            <Section>
              <Panel />
            </Section>
            <Section>
              <Panel />
            </Section>
            <Section>
              <Panel />
            </Section>
            <Section>
              <Panel />
            </Section>
          </Accordion>,
        );

        const panel = getByTestId('panel');

        expect(panel.getAttribute('role')).toBe('region');
      });

      it('is not set to region when there are more than 6 panels', () => {
        const { getByTestId } = render(
          <Accordion id='test-accordion'>
            <Section>
              <Panel data-test-id='panel' />
            </Section>
            <Section>
              <Panel />
            </Section>
            <Section>
              <Panel />
            </Section>
            <Section>
              <Panel />
            </Section>
            <Section>
              <Panel />
            </Section>
            <Section>
              <Panel />
            </Section>
            <Section>
              <Panel />
            </Section>
          </Accordion>,
        );

        const panel = getByTestId('panel');

        expect(panel.getAttribute('role')).toBeNull();
      });
    });

    it('gets expanded from section', () => {
      let panelExpanded: boolean | null = null;

      render(
        <Accordion id='test-accordion'>
          <Section>
            <BasePanel>
              {({ expanded }) => {
                panelExpanded = expanded;

                return null;
              }}
            </BasePanel>
          </Section>
        </Accordion>,
      );

      expect(panelExpanded).toBe(false);
    });
  });
});
