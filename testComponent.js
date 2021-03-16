class TestComponent extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({ mode: 'open' });
        const box = document.createElement('div');
        const title = box.appendChild(document.createElement('h1'));
        // GETTING TITLE CONTENT
        title.textContent = this.getAttribute('data-title');

        const description = box.appendChild(document.createElement('p'));
        // GETTING TITLE CONTENT
        description.textContent = this.getAttribute('data-description');

        title.addEventListener('click', () => {
            const newColor = generateColor();
            title.style.color = newColor;
            const myComponent = document.querySelector("[data-description]");
            myComponent.setAttribute('data-description', newColor);
        });

        //ADD SOME STYLE
        const style = document.createElement('style');
        style.textContent = `
            div {
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
            }

            h1 {
                text-transform: uppercase;
                cursor: pointer;
                user-select: none;
            }
        `;

        this.shadowRoot.append(style, box);

    }

    static get observedAttributes() { return ['data-title', 'data-description']; }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(name, oldValue, newValue);
        switch (name) {
            case 'data-description': {
                this.shadowRoot.querySelector('p').textContent = `Prima era ${oldValue} ora e' ${newValue}`
            }
        }
    }

}

customElements.define('card-description', TestComponent);

function generateColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}