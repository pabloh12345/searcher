

let loadProducts = async ( textFilter) => {

  try{
  
  let xml = '';
  let products = '';
  let listProducts = '';
  let listProducts2 = '';
  let url = '';
  let response ='';
  let result = '';
  
  fetch('https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.xml' )
  .then(response => response.text() ) /* Convierte el response a JSON, texto, blob, etc */
  .then(result => {
//alert(result);

  xml = (new DOMParser()).parseFromString(result, 'application/xml');
  products = xml.getElementsByTagName("product");
      //cursor
      for (let item of products) {
        let name  = '';
        let src   = '';
        let type  = '';
        let price = '';
    
          name  = item.getElementsByTagName("name")[0].innerHTML;
          src   = item.getElementsByTagName("src")[0].innerHTML;
          type  = item.getElementsByTagName("type")[0].innerHTML;
          price = item.getElementsByTagName("price")[0].innerHTML;
    
        if(name.match(textFilter) || type === textFilter || textFilter === ''){
         // alert(type);
          listProducts = listProducts + `
          <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
            <div class="card card-blog card-plain">
              <div class="card-header p-0 mt-n4 mx-3">
                <a class="d-block shadow-xl border-radius-xl">
                  <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
                </a>
              </div>
              <div class="card-body p-3">
                <p class="mb-0 text-sm">${type}</p>
                <a href="javascript:;">
                  <h5>
                    ${name}
                  </h5>
                </a>
                <p class="mb-4 text-sm">
                  <b>Price: </b> $ ${price}
                </p>
              </div>
            </div>
          </div>`;
        }
      }
      ////fin cursor
      
  const eListProducts = document.getElementById("listProducts");
  eListProducts.innerHTML =  listProducts ;
  })

  fetch('https://raw.githubusercontent.com/Bootcamp-Espol/Datos/main/products.json')
  .then(response => response.json() ) /* Convierte el response a JSON, texto, blob, etc */
  .then(result => {
//alert(result);
products = result;

//cursor
for (let item of products) {
  let name  = '';
  let src   = '';
  let type  = '';
  let price = '';

    name  = item.name;
    src   = item.src;
    type  = item.type;
    price = item.price;
 
  if(name.match(textFilter) || type === textFilter || textFilter === ''){
    listProducts = listProducts + `
    <div class="col-xl-3 col-md-6 mb-xl-0 mb-4 mt-4">
      <div class="card card-blog card-plain">
        <div class="card-header p-0 mt-n4 mx-3">
          <a class="d-block shadow-xl border-radius-xl">
            <img src="${src}" alt="${name}" class="img-fluid shadow border-radius-xl">
          </a>
        </div>
        <div class="card-body p-3">
          <p class="mb-0 text-sm">${type}</p>
          <a href="javascript:;">
            <h5>
              ${name}
            </h5>
          </a>
          <p class="mb-4 text-sm">
            <b>Price: </b> $ ${price}
          </p>
        </div>
      </div>
    </div>`;
  }
  
}

const eListProducts = document.getElementById("listProducts");
eListProducts.innerHTML =  listProducts ;

})


} 
catch(error){
    console.log(error);
}

}


const btnFilter = document.getElementById("filter");

btnFilter.addEventListener('click', () => {
  const text = document.getElementById("text").value;
  loadProducts(text);
})

