export {generateElementsList};

async function generateElementsList(elemList, getAllCallback, showElementCallback){
    const elems = [];
    
    const elArr = await findElementsNames(elemList, getAllCallback);
    elArr.forEach(el => {
        const elButton = document.createElement("div");
        elButton.classList = "element col-xs-12 col-sm-6 col-lg-4 col-xl-3";
        elButton.innerHTML = el.name;
        elButton.addEventListener("click", showElementCallback);
        elems.push(elButton);
    })

    return elems;
}

async function findElementsNames(elemList, callback){
    const allElements = await callback();
    const list = [];

    elemList.forEach(element => {
        let found = allElements.find(el => el.url == element);
        list.push({
            name: found.name,
            url: element
        })
    });

    return list;
}
