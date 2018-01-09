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
            productDescriptionButton.setAttribute("class","transparent");
            productNameButton.setAttribute("class", "transparent");



            $("#productTable").append(tr);
            i++;
        })         
    });
}

function deleteAlert(productName)
{
    var txt = $(this).text();
    if (confirm("Delete the " + txt + " product?") == true)
    {
        $(myProduct).val(txt);
        $(form1).submit();
        
    }
    else
    {

    }
}
