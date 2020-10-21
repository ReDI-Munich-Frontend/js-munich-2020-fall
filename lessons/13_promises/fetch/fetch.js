const contentDiv = document.getElementById('content');

const apiPromise = fetch("https://gist.githubusercontent.com/oktupol/e051119564a4551adb92b112cca9a5c2/raw/06efc27f93bf405f79b4223da350387e1d030527/somedata.json");

apiPromise
    .then(result => result.json())
    .then(content => {
        console.log(content);
        const htmlRepresentation = `
            <ul>
                <li>Name: ${content.name}</li>
                <li>Birthday: ${content.birthday}</li>
                <li>Favourite hobby: ${content.favouriteHobby}</li>
            </ul>
        `;
        
        return htmlRepresentation;
    })
    .then(htmlRepresentation => {
        contentDiv.innerHTML = htmlRepresentation;
    });