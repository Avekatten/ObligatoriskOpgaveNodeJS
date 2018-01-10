function checkPassword()
{
    var password = $('#password').val();
    console.log(password);

    if (password.length > 4)
    {
        $('#signUpForm').submit();
    }
    else
    {
        alert("Your password must be 5 characters or longer!");
    }
}