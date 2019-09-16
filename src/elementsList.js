export {generateElementsList};

async function generateElementsList(elemList, getAllCallback, showElementCallback){
    const elems = [];

    const loading = document.querySelector(".loading");
    loading.style.display = "block";

    const elArr = await findElementsNames(elemList, getAllCallback);
    elArr.forEach(el => {
        const elButton = document.createElement("div");
        elButton.classList = "element col-xs-12 col-lg-6 col-xl-4";
        elButton.innerHTML = el.name;
        elButton.addEventListener("click", () => showElementCallback(el.url));
        elems.push(elButton);
    })

    loading.style.display = "none";

    return elems;
}

async function findElementsNames(elemList, callback){
    const allElements = await callback();
    const list = [];

    elemList.forEach(element => {
        let found = allElements.find(el => el.url == element);
        list.push({
            name: found.name || found.title,
            url: element
        })
    });

    return list;
}
