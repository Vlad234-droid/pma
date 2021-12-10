export type TipsProps = {
  uuid: string;
  title: string;
  description: string;
  imageLink: string;
  createdTime: string;
  updatedTime: string;
  published: boolean;
  targetOrganisation: {
    name: string;
  }
}