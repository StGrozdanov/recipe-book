const element = document.createElement('div');
element.id = 'overlay';

element.innerHTML = `
<div id="modal">
    <p>Are you sure?</p>
    <button class="modal-ok">OK</button>
    <button class="modal-cancel">Cancel</button>
</div>
`;

element.querySelector('.modal-ok').addEventListener('click', () => onChoice(true));
element.querySelector('.modal-cancel').addEventListener('click', () => onChoice(false));

const msg = element.querySelector('p');

let call = null;

export function showModal(message, callback) {
    call = callback;
    msg.textContent = message;
    document.body.appendChild(element);
}

function onChoice(choice) {
    clear();
    call(choice);
}

function clear() {
    element.remove();
}