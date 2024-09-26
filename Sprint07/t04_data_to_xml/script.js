fetch('/quotes')
    .then(response => response.json())
    .then(data => {
        const beforeXMLString = data.beforeXML.map(quote => {
            return `
                <div>
                    <p>ID: ${quote.id}</p>
                    <p>Author: ${quote.author}</p>
                    <p>Quote: ${quote.quote}</p>
                    <p>Photo: <img src="${quote.photo}" alt="${quote.author}"></p>
                    <p>Publish Date: ${quote.publishDate}</p>
                    <p>Comments: ${quote.comments.map(comment => `${comment.date}: ${comment.comment}`).join('<br>')}</p>
                </div>
            `
        }).join('')

        const afterXMLString = `
            <div>
                ${Object.keys(data.afterXML.quotes).map(key => {
            return `
                        <p>${key}: ${data.afterXML.quotes[key].join(', ')}</p>
                    `
        }).join('')}
            </div>
        `

        document.getElementById('before').innerHTML = beforeXMLString
        document.getElementById('after').innerHTML = afterXMLString
    })
