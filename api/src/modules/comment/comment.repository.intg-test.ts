import { DeepPartial, getCustomRepository } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { createComment } from '../../testing/intg-factories/comment.factory';
import { createInformation } from '../../testing/intg-factories/information.factory';
import { createMessage } from '../../testing/intg-factories/message.factory';
import { createReaction } from '../../testing/intg-factories/reaction.factory';
import { createUser } from '../../testing/intg-factories/user.factory';
import { setupIntgTest } from '../../testing/setup-intg-test';

import { Comment } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { ReactionType } from './reaction.entity';

describe('comment repository', () => {

  setupIntgTest();

  let commentRepository: CommentRepository;

  beforeAll(async () => {
    commentRepository = getCustomRepository(CommentRepository);
  });

  const createInformationAndComments = async (data: DeepPartial<Comment & { text: string }>[]) => {
    const information = await createInformation();
    const { id: informationId } = information;

    const comments = [];

    for (const comment of data)
      comments.push(await createComment({ information, ...comment }, comment.text));

    return {
      information,
      informationId,
      comments,
    };
  };

  it('should find all comments', async () => {
    const { informationId, comments: [comment1, comment2] } = await createInformationAndComments([
      { text: 'comment1' },
      { text: 'comment2' },
    ]);

    const result = await commentRepository.findAll({ informationId, sort: SortType.DATE_ASC });

    expect(result).toMatchObject({
      items: [
        { id: comment1.id },
        { id: comment2.id },
      ],
      total: 2,
    });
  });

  it('should find all comments by ids', async () => {
    const { comments: [comment1] } = await createInformationAndComments([
      { text: 'comment1' },
      { text: 'comment2' },
    ]);

    const result = await commentRepository.findAll({ ids: [comment1.id], sort: SortType.DATE_ASC });

    expect(result).toMatchObject({
      items: [
        { id: comment1.id },
      ],
      total: 1,
    });
  });

  it('should find all comments sorted by date desc', async () => {
    const { informationId, comments: [comment1, comment2] } = await createInformationAndComments([
      { text: 'comment1' },
      { text: 'comment2' },
    ]);

    const result = await commentRepository.findAll({ informationId, sort: SortType.DATE_DESC });

    expect(result).toMatchObject({
      items: [
        { id: comment2.id },
        { id: comment1.id },
      ],
      total: 2,
    });
  });

  it('should find all comments sorted by relevance', async () => {
    // TODO
  });

  it('should find all comments with relations', async () => {
    const author = await createUser();
    const { informationId, information, comments: [comment1] } = await createInformationAndComments([
      { author, text: 'comment1' },
    ]);

    const comment2 = await createComment({ information, author, parent: comment1 });

    const result = await commentRepository.findAll({
      informationId,
      sort: SortType.DATE_ASC,
      relations: {
        author: true,
        information: true,
        parent: true,
        message: true,
        messages: true,
      },
    });

    expect(result).toMatchObject({
      items: [
        {
          id: comment1.id,
          author: { id: author.id },
          information: { id: informationId },
          message: { id: comment1.message.id },
          messages: [{ id: comment1.message.id }],
        },
        {
          id: comment2.id,
          parent: { id: comment1.id },
        },
      ],
    });
  });

  it('should find all root comments', async () => {
    const { informationId, information, comments: [comment1] } = await createInformationAndComments([
      { text: 'comment1' },
    ]);
    await createComment({ information, parent: comment1 });

    const result = await commentRepository.findAll({ informationId, sort: SortType.DATE_ASC, root: true });

    expect(result).toMatchObject({
      items: [
        { id: comment1.id },
      ],
      total: 1,
    });
  });

  it('should find all comments matching search string', async () => {
    const { informationId, comments: [comment1, comment2] } = await createInformationAndComments([
      { text: 'toto' },
      { text: 'total' },
      { text: 'tata' },
    ]);

    const result = await commentRepository.findAll({ informationId, sort: SortType.DATE_ASC, relations: { message: true }, search: 'to' });

    expect(result).toMatchObject({
      items: [
        { id: comment1.id },
        { id: comment2.id },
      ],
      total: 2,
    });
  });

  it('should find all comments by information id', async () => {
    const { informationId: informationId1, comments: [comment1] } = await createInformationAndComments([
      { text: 'comment1' },
    ]);
    await createInformationAndComments([{ text: 'comment2' }]);

    const result = await commentRepository.findAll({ informationId: informationId1, sort: SortType.DATE_ASC });

    expect(result).toMatchObject({
      items: [
        { id: comment1.id },
      ],
      total: 1,
    });
  });

  it('should find all comments for user', async () => {
    const author = await createUser();
    const { informationId, comments: [comment1, comment2] } = await createInformationAndComments([
      { author, text: 'comment1' },
      { author, text: 'comment2' },
    ]);

    const result = await commentRepository.findAll({ informationId, sort: SortType.DATE_ASC, authorId: author.id });

    expect(result).toMatchObject({
      items: [
        { id: comment1.id },
        { id: comment2.id },
      ],
      total: 2,
    });
  });

  it('should find all reply for a comment', async () => {
    const { informationId, information, comments: [comment1] } = await createInformationAndComments([
      { text: 'comment1' },
    ]);
    const comment2 = await createComment({ information, parent: comment1 });
    await createComment({ information, parent: comment2 });

    const result = await commentRepository.findAll({ informationId, sort: SortType.DATE_ASC, parentId: comment1.id });

    expect(result).toMatchObject({
      items: [
        { id: comment2.id },
      ],
      total: 1,
    });
  });

  it('should find all paginated comments', async () => {
    const { informationId, comments: [, comment2] } = await createInformationAndComments([
      { text: 'comment1' },
      { text: 'comment2' },
      { text: 'comment3' },
    ]);

    const result = await commentRepository.findAll({ informationId, sort: SortType.DATE_ASC, pagination: { page: 2, pageSize: 1 } });

    expect(result).toMatchObject({
      items: [
        { id: comment2.id },
      ],
      total: 3,
    });
  });

/*
  describe('findRootComments', () => {
    it('should find the root comments on the first page', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information });
      const comment2 = await createComment({ information });
      await createComment({ information });

      const result = await commentRepository.findRootComments(information.id, SortType.DATE_ASC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment1.id },
          { id: comment2.id },
        ],
        total: 3,
      });
    });

    it('should find the root comments on page 2', async () => {
      const information = await createInformation();
      await createComment({ information });
      await createComment({ information });
      const comment3 = await createComment({ information });

      const result = await commentRepository.findRootComments(information.id, SortType.DATE_ASC, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment3.id },
        ],
        total: 3,
      });
    });

    it('should find the root comments sorted by date-desc', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information });
      const comment2 = await createComment({ information });

      const result = await commentRepository.findRootComments(information.id, SortType.DATE_DESC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment2.id },
          { id: comment1.id },
        ],
      });
    });

    it('should find the root comments sorted by relevance', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information, score: 1 });
      const comment2 = await createComment({ information, score: 2 });
      const comment3 = await createComment({ information, score: 3 });

      const result = await commentRepository.findRootComments(information.id, SortType.RELEVANCE, 1, 3);

      expect(result).toMatchObject({
        items: [
          { id: comment3.id },
          { id: comment2.id },
          { id: comment1.id },
        ],
      });
    });

    it('should find the root comments when the first message was edited', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information });
      const comment2 = await createComment({ information });
      await createComment({ information });
      await createMessage({ comment: { id: comment1.id} });

      const result = await commentRepository.findRootComments(information.id, SortType.DATE_ASC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment1.id },
          { id: comment2.id },
        ],
        total: 3,
      });
    });
  });

  describe('search', () => {
    it('should search for a comment on page 1', async () => {
      const information = await createInformation();
      const comment1 = await createComment({ information, message: await createMessage({ text: 'searching...' }) });
      const comment2 = await createComment({ information });
      const comment3 = await createComment({ information, parent: comment2, message: await createMessage({ text: 'you search me' }) });
      await createComment({ information, message: await createMessage({ text: 'eousearcheoop' }) });

      const result = await commentRepository.search(information.id, 'search', SortType.DATE_ASC, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment1.id },
          { id: comment3.id },
        ],
      });
    });

    it('should search for a comment on page 2', async () => {
      const information = await createInformation();
      await createComment({ information, message: await createMessage({ text: 'searching...' }) });
      const comment2 = await createComment({ information });
      await createComment({ information, parent: comment2, message: await createMessage({ text: 'you search me' }) });
      const comment4 = await createComment({ information, message: await createMessage({ text: 'eousearcheoop' }) });

      const result = await commentRepository.search(information.id, 'search', SortType.DATE_ASC, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: comment4.id },
        ],
      });
    });
  });

  describe('findReplies', () => {
    it('should find replies on page 1', async () => {
      const information = await createInformation();
      const root = await createComment({ information });
      const child1 = await createComment({ information, parent: root });
      const child2 = await createComment({ information, parent: root });
      await createComment({ information, parent: root });

      const result = await commentRepository.findReplies(root.id, 1, 2);

      expect(result).toMatchObject({
        items: [
          { id: child1.id },
          { id: child2.id },
        ],
      });
    });

    it('should find replies on page 2', async () => {
      const information = await createInformation();
      const root = await createComment({ information });
      await createComment({ information, parent: root });
      await createComment({ information, parent: root });
      const child3 = await createComment({ information, parent: root });

      const result = await commentRepository.findReplies(root.id, 2, 2);

      expect(result).toMatchObject({
        items: [
          { id: child3.id },
        ],
      });
    });
  });

  describe('findForUser', () => {
    it('should find the comments for a user on the first page', async () => {
      const author = await createUser();
      const information = await createInformation();
      await createComment({ information, author });
      const comment2 = await createComment({ information, author });
      const comment3 = await createComment({ information, author });

      const result = await commentRepository.findForUser(author.id, '', 1, 2);

      expect(result).toMatchObject({
        items: [
          { informationId: information.id, commentId: comment3.id },
          { informationId: information.id, commentId: comment2.id },
        ],
        total: 3,
      });
    });

    it('should find the comments for a user on page 2', async () => {
      const information = await createInformation();
      const author = await createUser();
      const comment1 = await createComment({ information, author });
      await createComment({ information, author });
      await createComment({ information, author });

      const result = await commentRepository.findForUser(author.id, '', 2, 2);

      expect(result).toMatchObject({
        items: [
          { informationId: information.id, commentId: comment1.id },
        ],
        total: 3,
      });
    });

    it('should search the comments for a user', async () => {
      const information = await createInformation();
      const author = await createUser();
      const comment1 = await createComment({ information, author, messages: [await createMessage({ text: 'search' })] });
      await createComment({ information, author });

      const result = await commentRepository.findForUser(author.id, 'search', 2, 2);

      expect(result).toMatchObject({
        items: [
          { commentId: comment1.id },
        ],
        total: 1,
      });
    });
  });

  describe('getRepliesCounts', () => {
    it('should find the replies counts', async () => {
      const information = await createInformation();
      const comment = await createComment({ information });
      await createComment({ information, parent: comment });

      const result = await commentRepository.getRepliesCounts([comment.id]);

      expect(result).toMatchObject([{
        commentId: comment.id,
        repliesCount: 1,
      }]);
    });
  });

  describe('getReactionsCounts', () => {
    it('should find the comments counts', async () => {
      const information = await createInformation();
      const comment = await createComment({ information });
      await createReaction({ comment, type: ReactionType.APPROVE });
      await createReaction({ comment, type: ReactionType.APPROVE });
      await createReaction({ comment, type: ReactionType.REFUTE });

      const result = await commentRepository.getReactionsCounts([comment.id]);

      expect(result).toMatchObject([{
        commentId: comment.id,
        reactions: {
          [ReactionType.APPROVE]: 2,
          [ReactionType.REFUTE]: 1,
          [ReactionType.SKEPTIC]: 0,
        },
      }]);
    });
  });

  describe('getReactionForUser', () => {
    it('should find the comment for a user', async () => {
      const user = await createUser();
      const information = await createInformation();
      const comment = await createComment({ information, author: user });
      await createReaction({ comment, user, type: ReactionType.REFUTE });

      const result = await commentRepository.getReactionForUser([comment.id], user.id);

      expect(result).toMatchObject([{
        commentId: comment.id,
        type: ReactionType.REFUTE,
      }]);
    });
  });
  */
});
