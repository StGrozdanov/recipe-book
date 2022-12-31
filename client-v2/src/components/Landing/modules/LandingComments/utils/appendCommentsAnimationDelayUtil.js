import { capitalizatorUtil } from '../../../../../utils/capitalizatorUtil';

const commentsAnimationDelays = { 0: '500ms', 1: '1.5s', 2: '2.5s', 3: '3s', 4: '4s', 5: '4.5s' }

export function appendCommentsAnimationDelayUtil(comments) {
    return comments.map((comment, index) => {
        comment.recipe.recipeName = capitalizatorUtil(comment.recipe.recipeName);
        comment.animationDelay = commentsAnimationDelays[index]
        return comment;
    });
}