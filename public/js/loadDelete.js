$(document).ready(function()
{
    getProducts();

});

function getProducts()
{
    console.log("test");
    $.getJSON("/products", function(data)
    {
        var i = 0;
        $.each(data, function(key, val)
        {
            var tr = document.createElement("tr");
            var td1 = document.createElement("td");
            var td2 = document.createElement("td");
            
            var productName = document.createTextNode(data[i].productName);
            var productDescription = document.createTextNode(data[i].productDescription);

            var productNameButton = document.createElement("BUTTON");
            var productDescriptionButton = document.createElement("BUTTON");


            productNameButton.appendChild(productName);
            productDescriptionButton.appendChild(productDescription);

            td1.appendChild(productNameButton);
            td2.appendChild(productDescriptionButton);
            tr.appendChild(td1);
            tr.appendChild(td2);

            productNameButton.onclick = deleteAlert;

            productNameButton.setAttribute("id","" + data[i]._id);
            productDescriptionButton.setAttribute("id","" + data[i].id);

            productDescriptionButton.setAttribute("class","delete");
            productNameButton.setAttribute("class", "delete");



            $("#productTable").append(tr);
            i++;
        })         
    });
}

function deleteAlert()
{
    var txt = $(this).text();
    if (confirm("Are you sure you want to delete the " + txt + " product?"))
    { 
        console.log('/products/' + $(this).attr('id'));
        $.ajax({ url: '/products/' + $(this).attr('id'), method: 'DELETE', })
        .done(function()
        {
            console.log('deleted');
            window.location.reload(true);
        });
    }
}
