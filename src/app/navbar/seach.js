const search = () =>{
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitems = document.getElementById("item-product")
    const product = document.querySelectorAll(".product-box")
    const pname = storeitems.getElementsByTagName("product-title")

    for(var i=0; i < pname.length; i++){
        let match = product[i].getElementsByTagName('product-title')[0];

        if(match){
            let textvalue = match.textContent || match.innerHTML

            if(textvalue.toUpperCase().indexOf(searchbox) > -1) {
               product[i].computedStyleMap.display = "";
            } else {
                product[i].computedStyleMap.display = "none"
            }
        }
    }
}



// document.addEventListener("DOMContentLoaded", function() {
//     var menuToggle = document.querySelectorAll('.nav > ul > li');

//     menuToggle.forEach(function(menuItem) {
//         menuItem.addEventListener('click', function() {
//             var isExpanded = this.getAttribute('aria-expanded') === 'true';
//             this.setAttribute('aria-expanded', !isExpanded);
//         });
//     });
// });
