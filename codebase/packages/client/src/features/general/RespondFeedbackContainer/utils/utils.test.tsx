import { getPropperTargetType } from './utils';

it('it should retern modified string', () => {
  const feedbackItems = [
    {
      code: 'Question 1',
      content: 'test2',
      feedbackUuid: 'b352fdbf-dfba-439a-8b42-78dcd730c47a',
      uuid: 'bd2b1c37-dc11-49c3-8745-3d29392e0fb7',
    },
    {
      code: 'comment_to_request',
      content: 'fwff',
      feedbackUuid: 'b352fdbf-dfba-439a-8b42-78dcd730c47a',
      uuid: 'a494cd5a-db2c-483b-9051-276875aa48dd',
    },
    {
      code: 'comment_to_day_job',
      content: 'cwfwf',
      feedbackUuid: 'b352fdbf-dfba-439a-8b42-78dcd730c47a',
      uuid: '2fdb4446-9651-458e-8a00-cb26374af94e',
    },
    {
      code: 'Anything else?',

      content: '',

      feedbackUuid: 'b352fdbf-dfba-439a-8b42-78dcd730c47a',

      uuid: '93de1e2a-96b8-4e87-8f70-cb8c6a9c5ac4',
    },
    {
      code: 'Question 2',
      content: 'test2',
      feedbackUuid: 'b352fdbf-dfba-439a-8b42-78dcd730c47a',
      uuid: 'b217704c-5c6d-4ea7-a223-2eb8af3f5c56',
    },
  ];
  const text = getPropperTargetType('GOAL', null, feedbackItems, []);
  expect(text).toBe('“Day Job: cwfwf”');
});
