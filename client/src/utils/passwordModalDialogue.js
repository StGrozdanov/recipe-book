const modalDialogue = document.createElement('div');
modalDialogue.id = 'overlay';

modalDialogue.innerHTML = `
<div id="modal">
    <p>Моля въведете паролата си</p>
    <input type="password" placeholder="парола" class="profile-password" />
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
    document.querySelector('.profile-password').value = '';
    modalDialogue.remove();
}