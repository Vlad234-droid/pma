import React, { FC, useState, useCallback, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { CreateRule, Modal, Rule, theme, useStyle } from '@pma/dex-wrapper';
import { Icon } from 'components/Icon';
import { getAllReviewSchemas } from '@pma/store';
import { Input, Item as FormItem } from 'components/Form';

import { RowReview } from './RowReview';
import { default as ReviewModal } from './ReviewModal';

export type CompletedReviewsModalProps = {
  onClose: () => void;
};

// todo wait for backend
const reviews: any[] = [];

const PreviousReviewFilesModal: FC<CompletedReviewsModalProps> = ({ onClose }) => {
  const { css, matchMedia } = useStyle();
  const mobileScreen = matchMedia({ xSmall: true, small: true }) || false;
  const schemas = useSelector(getAllReviewSchemas);
  const [isReviewModalOpen, setReviewModalOpen] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState(null);

  const selectReviewHandler = useCallback((e) => {
    e.preventDefault();
    const key = e.currentTarget.dataset['uuid'];
    setSelectedReviewId(key);
    setReviewModalOpen(true);
  }, []);
  const selectedReview = useMemo(
    () => (reviews?.length ? reviews?.find((review) => review.uuid === selectedReviewId) : null),
    [selectedReviewId],
  );
  const scheme = selectedReview ? schemas[selectedReview?.type] : [];

  const [filter, setFilteredValue] = useState('');
  const filteredReviews = reviews?.filter(({ type }) => !filter || type.toLowerCase().includes(filter.toLowerCase()));
  const handleChangeFilter = ({ target }) => setFilteredValue(target.value);

  return (
    <Modal
      modalPosition={mobileScreen ? 'bottom' : 'middle'}
      overlayColor={'tescoBlue'}
      modalContainerRule={[containerRule({ mobileScreen })]}
      closeOptions={{
        content: <Icon graphic='cancel' invertColors={true} />,
        onClose: onClose,
        styles: [modalCloseOptionStyle({ mobileScreen })],
      }}
      title={{
        content: 'Completed Reviews',
        styles: [modalTitleOptionStyle({ mobileScreen })],
      }}
    >
      <div className={css(wrapperStyle)}>
        <div className={css(containerStyle)}>
          <FormItem
            withIcon={false}
            marginBot={false}
            customIcon
            customIconInserted={<Icon graphic='search' iconStyles={iconStyles} />}
          >
            <Input onChange={handleChangeFilter} placeholder={'Search review'} />
          </FormItem>
          {filteredReviews &&
            filteredReviews.map((review) => (
              <RowReview key={review.uuid} review={review} selectReviewHandler={selectReviewHandler} />
            ))}
          {isReviewModalOpen && (
            <ReviewModal onClose={() => setReviewModalOpen(false)} review={selectedReview} scheme={scheme} />
          )}
        </div>
      </div>
    </Modal>
  );
};

const wrapperStyle: Rule = { height: '100%', width: '100%' };

const containerStyle: Rule = { height: '100%', overflow: 'auto' };

const containerRule: CreateRule<{
  mobileScreen: boolean;
}> = ({ mobileScreen }) => ({
  width: '640px',
  padding: '36px',
  height: mobileScreen ? 'calc(100% - 72px)' : 'calc(100% - 102px)',
  marginTop: '70px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
});

const modalCloseOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    display: 'inline-block',
    height: '24px',
    paddingLeft: '0px',
    paddingRight: '0px',
    position: 'fixed',
    top: '22px',
    right: mobileScreen ? '20px' : '40px',
    textDecoration: 'none',
    border: 'none',
    cursor: 'pointer',
  };
};

const modalTitleOptionStyle: CreateRule<{ mobileScreen }> = (props) => {
  const { mobileScreen } = props;
  return {
    position: 'fixed',
    top: '22px',
    textAlign: 'center',
    left: 0,
    right: 0,
    color: 'white',
    fontWeight: theme.font.weight.bold,
    ...(mobileScreen
      ? {
          fontSize: `${theme.font.fixed.f20.fontSize}`,
          lineHeight: `${theme.font.fluid.f24.lineHeight}`,
        }
      : {
          fontSize: `${theme.font.fixed.f24.fontSize}`,
          lineHeight: `${theme.font.fluid.f28.lineHeight}`,
        }),
  };
};

const iconStyles: Rule = {
  width: '19px',
};

export default PreviousReviewFilesModal;
