const modalDialogue = document.createElement('div');
modalDialogue.id = 'overlay';

modalDialogue.innerHTML = `
<div id="modal">
    <p>Your password</p>
    <input type="password" placeholder="password" class="profile-password" />
    <button class="modal-ok">Потвърди</button>
</div>
`;

modalDialogue.querySelector('.modal-ok').addEventListener('click', () => onChoice(true));

let call = null;
export let modalPassword = null;

export function showPasswordModal(callback) {
    call = callback;
    document.body.appendChild(modalDialogue);
}

function onChoice(choice) {
    modalPassword = modalDialogue.querySelector('.profile-password').value;
    clear();
    call(choice);
}

function clear() {
    modalDialogue.remove();
}