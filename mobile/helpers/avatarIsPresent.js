export function userAvatarIsPresent(avatarUrl) {
    return avatarUrl !== undefined 
            && avatarUrl.trim() !== '' 
            && avatarUrl !== null 
            && avatarUrl !== '/avatar.png';
}