export type TipsProps = {
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