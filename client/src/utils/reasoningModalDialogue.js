const modalDialogue = document.createElement('div');
modalDialogue.id = 'overlay';

modalDialogue.innerHTML = `
<div id="modal" style="background: #c2c2e9;">
    <p>Моля посочете причина за блокирането</p>
    <input type="text" placeholder="причина..." class="profile-password" />
    <button class="modal-ok">Потвърди</button>
</div>
`;

modalDialogue.querySelector('.modal-ok').addEventListener('click', () => onChoice(true));

let call = null;
export let reason = null;

export function showReasonModalDialogue(callback, message) {
    call = callback;
    document.body.appendChild(modalDialogue);
    if (message) {
        const modal = document.getElementById('modal')
        modal.style.background = '';
        modal.querySelector('p').textContent = message;
        modal.querySelector('input').placeholder = 'имейл адрес ..';
    }
}

function onChoice(choice) {
    reason = modalDialogue.querySelector('.profile-password').value;
    clear();
    call(choice);
}

function clear() {
    document.querySelector('.profile-password').value = '';
    modalDialogue.remove();
}