// @ts-ignore
import React from 'react';
import { fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
// @ts-ignore
import { renderWithTheme as render, screen } from 'utils/test';
import { ReviewType, Status } from 'config/enum';
import Buttons from './Buttons';
//TODO: fix test
describe.skip('<Buttons />', () => {
  it('render Buttons OBJECTIVE disabled', async () => {
    const updateReviewStatus = () => jest.fn();
    render(
      <Buttons
        reviewType={ReviewType.MYR}
        tlPointUuid='test'
        cycleUuid={'test'}
        code={ReviewType.OBJECTIVE}
        isDisabled={true}
        onUpdate={updateReviewStatus}
        status={Status.WAITING_FOR_APPROVAL}
      />,
    );

    const approve = screen.getByRole('button', { name: /approve/i });
    const decline = screen.getByRole('button', { name: /decline/i });

    expect(approve).toBeInTheDocument();
    expect(decline).toBeInTheDocument();

    expect(approve).toHaveAttribute('aria-disabled', 'true');
    expect(decline).toHaveAttribute('aria-disabled', 'true');
  });

  it('render Buttons OBJECTIVE click decline', async () => {
    const updateReviewStatus = jest.fn();
    render(
      <Buttons
        code={ReviewType.MYR}
        isDisabled={false}
        reviewType={ReviewType.MYR}
        tlPointUuid='test'
        cycleUuid={'test'}
        onUpdate={updateReviewStatus}
        status={Status.WAITING_FOR_APPROVAL}
      />,
    );

    const approve = screen.getByRole('button', { name: /approve/i });
    const decline = screen.getByRole('button', { name: /decline/i });

    expect(approve).toBeInTheDocument();
    expect(decline).toBeInTheDocument();

    expect(approve).not.toHaveAttribute('aria-disabled', 'true');
    expect(decline).not.toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(decline);
    expect(screen.getByText(/Decline reason/)).toBeInTheDocument();
    expect(screen.queryByText(/Submit objectives or reviews/)).not.toBeInTheDocument();

    const submit = screen.getByRole('button', { name: /Submit/i });
    act(() => {
      fireEvent.click(submit);
    });
    expect(updateReviewStatus).toBeCalled();
  });

  it('render Buttons OBJECTIVE click approve', async () => {
    const updateReviewStatus = jest.fn();
    render(
      <Buttons
        code={ReviewType.OBJECTIVE}
        isDisabled={false}
        reviewType={ReviewType.MYR}
        tlPointUuid='test'
        cycleUuid={'test'}
        onUpdate={updateReviewStatus}
        status={Status.WAITING_FOR_APPROVAL}
      />,
    );

    const approve = screen.getByRole('button', { name: /approve/i });
    const decline = screen.getByRole('button', { name: /decline/i });

    expect(approve).toBeInTheDocument();
    expect(decline).toBeInTheDocument();

    expect(approve).not.toHaveAttribute('aria-disabled', 'true');
    expect(decline).not.toHaveAttribute('aria-disabled', 'true');

    fireEvent.click(approve);
    expect(screen.getByText(/Submit objectives or reviews/)).toBeInTheDocument();
    expect(screen.queryByText(/Decline reason/)).not.toBeInTheDocument();

    const submit = screen.getByRole('button', { name: /Submit/i });
    act(() => {
      fireEvent.click(submit);
    });
    expect(updateReviewStatus).toBeCalled();
  });
});
