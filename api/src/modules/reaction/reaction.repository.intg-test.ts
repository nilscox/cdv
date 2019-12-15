import { getCustomRepository } from 'typeorm';

import { SortType } from 'Common/sort-type';

import { QuickReactionType } from './quick-reaction.entity';
import { ReactionRepository } from './reaction.repository';

import { createUser } from '../../testing/factories/user.factory';
import { createInformation } from '../../testing/factories/information.factory';
import { createReaction } from '../../testing/factories/reaction.factory';
import { createSubject } from '../../testing/factories/subject.factory';
import { createQuickReaction } from '../../testing/factories/quick-reaction.factory';
import { setupIntgTest } from '../../testing/typeorm/setup-intg-test';
import { createMessage } from '../../testing/factories/message.factory';

describe('reaction repository', () => {

  setupIntgTest();

  let reactionRepository: ReactionRepository;

  beforeAll(async () => {
    reactionRepository = getCustomRepository(ReactionRepository);
    (reactionRepository as any).pageSize = 2;
  });

  describe('findRootReactions', () => {
    it('should find the root reactions on the first page', async () => {
      const information = await createInformation();
      const reaction1 = await createReaction({ information });
      const reaction2 = await createReaction({ information });
      await createReaction({ information });

      const result = await reactionRepository.findRootReactions(information.id, SortType.DATE_ASC);

      expect(result).toMatchObject([
        { id: reaction1.id },
        { id: reaction2.id },
      ]);
    });

    it('should find the root reactions on page 2', async () => {
      const information = await createInformation();
      await createReaction({ information });
      await createReaction({ information });
      const reaction3 = await createReaction({ information });

      const result = await reactionRepository.findRootReactions(information.id, SortType.DATE_ASC, 2);

      expect(result).toMatchObject([
        { id: reaction3.id },
      ]);
    });

    it('should find the root reactions sorted by date-desc', async () => {
      const information = await createInformation();
      const reaction1 = await createReaction({ information });
      const reaction2 = await createReaction({ information });

      const result = await reactionRepository.findRootReactions(information.id, SortType.DATE_DESC);

      expect(result).toMatchObject([
        { id: reaction2.id },
        { id: reaction1.id },
      ]);
    });

    it('should find the root reactions sorted by relevance', async () => {
      const information = await createInformation();
      const reaction1 = await createReaction({ information });
      const reaction2 = await createReaction({ information });
      const reaction3 = await createReaction({ information });
      await createQuickReaction({ reaction: reaction2 });
      await createQuickReaction({ reaction: reaction3 });
      await createReaction({ information, parent: reaction3 });

      (reactionRepository as any).pageSize = 3;
      const result = await reactionRepository.findRootReactions(information.id, SortType.RELEVANCE);
      (reactionRepository as any).pageSize = 2;

      expect(result).toMatchObject([
        { id: reaction3.id },
        { id: reaction2.id },
        { id: reaction1.id },
      ]);
    });
  });

  describe('findRootReactionsForSubject', () => {
    it('should find the root reactions on the first page', async () => {
      const information = await createInformation();
      const subject = await createSubject({ information });
      const reaction1 = await createReaction({ information, subject });
      const reaction2 = await createReaction({ information, subject });
      await createReaction({ information, subject });

      const result = await reactionRepository.findRootReactionsForSubject(subject.id, SortType.DATE_ASC);

      expect(result).toMatchObject([
        { id: reaction1.id },
        { id: reaction2.id },
      ]);
    });

    it('should find the root reactions on page 2', async () => {
      const information = await createInformation();
      const subject = await createSubject({ information });
      await createReaction({ information, subject });
      await createReaction({ information, subject });
      const reaction3 = await createReaction({ information, subject });

      const result = await reactionRepository.findRootReactionsForSubject(subject.id, SortType.DATE_ASC, 2);

      expect(result).toMatchObject([
        { id: reaction3.id },
      ]);
    });

    it('should find the root reactions sorted by date-desc', async () => {
      const information = await createInformation();
      const subject = await createSubject({ information });
      const reaction1 = await createReaction({ information, subject });
      const reaction2 = await createReaction({ information, subject });

      const result = await reactionRepository.findRootReactionsForSubject(subject.id, SortType.DATE_DESC);

      expect(result).toMatchObject([
        { id: reaction2.id },
        { id: reaction1.id },
      ]);
    });

    it('should find the root reactions sorted by relevance', async () => {
      const information = await createInformation();
      const subject = await createSubject({ information });
      const reaction1 = await createReaction({ information, subject });
      const reaction2 = await createReaction({ information, subject });
      const reaction3 = await createReaction({ information, subject });
      await createQuickReaction({ reaction: reaction2 });
      await createQuickReaction({ reaction: reaction3 });
      await createReaction({ information, subject, parent: reaction3 });

      (reactionRepository as any).pageSize = 3;
      const result = await reactionRepository.findRootReactionsForSubject(subject.id, SortType.RELEVANCE);
      (reactionRepository as any).pageSize = 2;

      expect(result).toMatchObject([
        { id: reaction3.id },
        { id: reaction2.id },
        { id: reaction1.id },
      ]);
    });
  });

  describe('search', () => {
    it('should search for a reaction on page 1', async () => {
      const information = await createInformation();
      const reaction1 = await createReaction({ information, messages: [await createMessage({ text: 'searching...' })] });
      const reaction2 = await createReaction({ information });
      const reaction3 = await createReaction({ information, parent: reaction2, messages: [await createMessage({ text: 'you search me' })] });
      await createReaction({ information, messages: [await createMessage({ text: 'eousearcheoop' })] });

      const result = await reactionRepository.search(information.id, 'search', SortType.DATE_ASC);

      expect(result).toMatchObject([
        { id: reaction1.id },
        { id: reaction3.id },
      ]);
    });

    it('should search for a reaction on page 2', async () => {
      const information = await createInformation();
      await createReaction({ information, messages: [await createMessage({ text: 'searching...' })] });
      const reaction2 = await createReaction({ information });
      await createReaction({ information, parent: reaction2, messages: [await createMessage({ text: 'you search me' })] });
      const reaction4 = await createReaction({ information, messages: [await createMessage({ text: 'eousearcheoop' })] });

      const result = await reactionRepository.search(information.id, 'search', SortType.DATE_ASC, 2);

      expect(result).toMatchObject([
        { id: reaction4.id },
      ]);
    });
  });

  describe('findReplies', () => {
    it('should find replies on page 1', async () => {
      const information = await createInformation();
      const root = await createReaction({ information });
      const child1 = await createReaction({ information, parent: root });
      const child2 = await createReaction({ information, parent: root });
      await createReaction({ information, parent: root });

      const result = await reactionRepository.findReplies(root.id);

      expect(result).toMatchObject([
        { id: child1.id },
        { id: child2.id },
      ]);
    });

    it('should find replies on page 2', async () => {
      const information = await createInformation();
      const root = await createReaction({ information });
      await createReaction({ information, parent: root });
      await createReaction({ information, parent: root });
      const child3 = await createReaction({ information, parent: root });

      const result = await reactionRepository.findReplies(root.id, 2);

      expect(result).toMatchObject([
        { id: child3.id },
      ]);
    });
  });

  describe('getRepliesCounts', () => {
    it('should find the replies counts', async () => {
      const information = await createInformation();
      const reaction = await createReaction({ information });
      await createReaction({ information, parent: reaction });

      const result = await reactionRepository.getRepliesCounts([reaction.id]);

      expect(result).toMatchObject([{
        reactionId: reaction.id,
        repliesCount: 1,
      }]);
    });
  });

  describe('getQuickReactionsCounts', () => {
    it('should find the quick reactions counts', async () => {
      const information = await createInformation();
      const reaction = await createReaction({ information });
      await createQuickReaction({ reaction, type: QuickReactionType.APPROVE });
      await createQuickReaction({ reaction, type: QuickReactionType.APPROVE });
      await createQuickReaction({ reaction, type: QuickReactionType.REFUTE });

      const result = await reactionRepository.getQuickReactionsCounts([reaction.id]);

      expect(result).toMatchObject([{
        reactionId: reaction.id,
        quickReactions: {
          [QuickReactionType.APPROVE]: 2,
          [QuickReactionType.REFUTE]: 1,
          [QuickReactionType.SKEPTIC]: 0,
        },
      }]);
    });
  });

  describe('getQuickReactionForUser', () => {
    it('should find the quick reaction for a user', async () => {
      const user = await createUser();
      const information = await createInformation();
      const reaction = await createReaction({ information, author: user });
      await createQuickReaction({ reaction, user, type: QuickReactionType.REFUTE });

      const result = await reactionRepository.getQuickReactionForUser([reaction.id], user.id);

      expect(result).toMatchObject([{
        reactionId: reaction.id,
        type: QuickReactionType.REFUTE,
      }]);
    });
  });
});