const modalDialogue = document.createElement('div');
modalDialogue.id = 'overlay';

modalDialogue.innerHTML = `
<div id="modal" class="change-password-modal">
    <p>Промяна на парола</p>
    <input type="password" placeholder="стара парола" id="old-profile-password" class="profile-password" />
    <input type="password" placeholder="нова парола" id="new-profile-password" class="profile-password" />
    <span id="warning" style="color: red; display: none;">Минималната дължина на паролата е 4 символа</span>
    <button class="modal-ok">Потвърди</button>
</div>
`;

modalDialogue.querySelector('.modal-ok').addEventListener('click', () => onChoice(true));

let call = null;

export let oldPassword = null;
export let newPassword = null;

export function showChangePasswordModal(callback) {
    call = callback;
    document.body.appendChild(modalDialogue);
}

function onChoice(choice) {
    oldPassword = document.getElementById('old-profile-password').value;
    newPassword = document.getElementById('new-profile-password').value;

    if (newPassword.trim().length < 4) {
        document.getElementById('warning').style.display = 'block';
        return;
    }
    document.getElementById('warning').style.display = 'none';
    clear();
    call(choice);
}

function clear() {
    document.getElementById('old-profile-password').value = '';
    document.getElementById('new-profile-password').value = '';
    modalDialogue.remove();
}