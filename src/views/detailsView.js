import { html } from '../../node_modules/lit-html/lit-html.js';
import { getSingle, removeRecipe } from '../io/requests.js';

const ownerTemplate = (id, ctx) => html`
    <a class="button warning" href="/edit/${id}">Редактирай</a>
    <button @click=${() => deleteHandler(id, ctx)} class="button danger">Изтрий</button>
`;

const detailsTemplate = (data, ctx) => html`
       <section id="meme-details">
            <h1>Ястие: ${data.name}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${data.img}>

                    <div class="details-comments">
                        <h2>Коментари:</h2>
                    <ul>
                        <li class="comment">
                    <p><a href="#">Шушана</a> 12/11/2021, 17:03:23</p>     
                    <p>Ееее, браво бе, шушеее, велик си! Ти си гений!</p>
                        </li>

                        <li class="comment">
                            <p><a href="#">Шушан</a> 12/11/2021, 17:05:33</p>    
                            
                    <p>Кажи ми нещо, което незнам. </p>
                    
                        </li>
                        
                    </ul>

                    </div>
                    <article class="create-comment">
                        <label>Добави коментар:</label>
                        <form id="add-comment-form" class="form">
                            <textarea id="comment-text" name="comment" placeholder="Comment......"> </textarea>
                            <input class="comment-btn" type="submit" value="Коментирай">
                        </form>
                    </article>

                </div>
                <div class="meme-description">
                    <h2>Съставки:</h2>
                        <ul>
                            ${data.products.map(product => html`<li>${product}</li>`)}
                        </ul>

                        <h2>Начин на приготвяне:</h2>
                        <ul>
                            ${data.steps.map(step => html`<li>${step}</li>`)}
                        </ul>

                    ${sessionStorage.getItem('id') === data.owner.objectId ? ownerTemplate(data.objectId, ctx) : ''}
            </div>
                </div>
                
        </section>
`;

export async function detailsPage(ctx) {
    const data = await getSingle(ctx.params.id);
    ctx.render(detailsTemplate(data, ctx));
}

async function deleteHandler(id, ctx) {
    const confirmed = confirm('Are you sure you want to delete this recipe?');
    if (confirmed) {
        await removeRecipe(id);
        ctx.page.redirect('/');
    }
}