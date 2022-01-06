export const commentToYourImpact = 'comment_to_your_impact';
export const commentToYourSelf = 'comment_to_your_self';
export const commentToDayJob = 'comment_to_day_job';

export const filteredByInputSearchHandler = (notes, value) => {
  return notes.filter((item) => {
    const fullName =
      `${item?.targetColleagueProfile?.colleague?.profile?.firstName}${item?.targetColleagueProfile?.colleague?.profile?.lastName}`.toLowerCase();

    const reverseFullName =
      `${item?.targetColleagueProfile?.colleague?.profile?.lastName}${item?.targetColleagueProfile?.colleague?.profile?.firstName}`.toLowerCase();
    const trimmedSearchValue = value.replace(/\s+/g, '').toLowerCase();
    return fullName.includes(trimmedSearchValue) || reverseFullName.includes(trimmedSearchValue);
  });
};

export const filteredNotesByRadiosBtnsHandler = (notes, optionsRadioBtns) => {
  const filterByAZ = () => {
    const filterByAZNotes = [...notes];
    filterByAZNotes.sort((a, b) =>
      (a.targetColleagueProfile.colleague.profile.firstName || '')
        .toString()
        .localeCompare((b.targetColleagueProfile.colleague.profile.firstName || '').toString()),
    );

    return filterByAZNotes;
  };
  const filterByZA = () => {
    const filterByZANotes = [...notes];
    filterByZANotes.sort((a, b) =>
      (b.targetColleagueProfile.colleague.profile.firstName || '')
        .toString()
        .localeCompare((a.targetColleagueProfile.colleague.profile.firstName || '').toString()),
    );
    return filterByZANotes;
  };

  const newToOld = () => {
    const filterNotesByNewToOld = [...notes];
    filterNotesByNewToOld.sort((a, b) =>
      (b.createdTime || '').toString().localeCompare((a.createdTime || '').toString()),
    );
    return filterNotesByNewToOld;
  };

  const oldToNew = () => {
    const filterNotesByoldToNew = [...notes];
    filterNotesByoldToNew.sort((a, b) =>
      (a.createdTime || '').toString().localeCompare((b.createdTime || '').toString()),
    );
    return filterNotesByoldToNew;
  };

  const defineFilterOption = {
    0: filterByAZ(),
    1: filterByZA(),
    2: newToOld(),
    3: oldToNew(),
  };

  return defineFilterOption[Object.values(optionsRadioBtns).findIndex((item) => item)];
};
