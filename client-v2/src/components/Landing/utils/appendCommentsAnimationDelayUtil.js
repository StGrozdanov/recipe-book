import { capitalizatorUtil } from '../../../utils/capitalizatorUtil';

const commentsAnimationDelays = { 0: '1s', 1: '2s', 2: '3.5s', 3: '3.8s', 4: '4.5s', 5: '5s' }

export function appendCommentsAnimationDelayUtil(comments) {
    return comments.map((comment, index) => {
        comment.recipe.recipeName = capitalizatorUtil(comment.recipe.recipeName);
        comment.animationDelay = commentsAnimationDelays[index]
        return comment;
    });
}