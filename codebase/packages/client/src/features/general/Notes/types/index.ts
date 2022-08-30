type NoteStatus = 'CREATED' | 'ARCHIVED';

type Note = {
  id: string;
  title: string;
  content: string;
  ownerColleagueUuid: string;
  status: NoteStatus;
  updateTime: string;
  reviewUuid?: string;
  folderUuid?: string;
  referenceColleagueUuid?: string;
};

export type { Note, NoteStatus };
