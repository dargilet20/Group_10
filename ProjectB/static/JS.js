const active_page = window.location.pathname;
console.log(active_page);

const navLinks = document.querySelectorAll('nav a').
forEach(Links => {    
    if(Links.href.includes(`${active_page}`)){
        Links.classList.add('ctive');
    }
})
const FooterLinks = document.querySelectorAll('footer a').
forEach(Links => {
        if (Links.href.includes(`${active_page}`)) {
            Links.classList.add('ActiveFooter');
        }
})

// ******functions******** //

function checklogin(){
    var thepassword = document.getElementById("password").value;
    var theemail = document.getElementById("email").value;
    if(theemail == "") {  
        document.getElementById("message").innerHTML = "Fill the email please";  
        return false;  
     }
     else {  
         alert("email is correct");  
            if(thepassword == "") {  
                document.getElementById("message").innerHTML = "Fill the password please";  
                return false;  
            }  
            else if(thepassword.length < 8 || thepassword.length > 8) {  
                document.getElementById("message").innerHTML = "The password must be 8 characters";  
                return false;  
            } 
            else { 
                navigateToPageH();
                alert("Password is correct");
            }
        } 
} 

var Today = new Date();

function checkSignUp(){
    var Email = document.getElementById("email").value;
    var Pas = document.getElementById("password").value;
    var FN = document.getElementById("First-Name").value;
    var LN = document.getElementById("Last-Name").value;
    var PN = document.getElementById("PhoneNumber").value;
    var BD = document.getElementById("Birth-Date").value;
    var BD_DATE = new Date(BD);
    var inputElement = document.getElementById("email");
    if (inputElement.readOnly == true){
        return true;
    }else{
        if(Email == ""||Pas == ""||FN == ""||LN == ""||PN == ""||BD == "") {
            document.getElementById("message").innerHTML = "Please fill in the fields";  
            return false;
        }else{
            if(Pas.length < 8 ) {  
                document.getElementById("message").innerHTML = "The password must be 8 characters";  
                return false;
            }else{
                if ((BD_DATE > Today)){
                    alert("The date of birth is invalid");
                    return false;
                }else{
                    navigateToPageH();
                    alert("Your details have been successfully updated");
                }
                }
            }  
    }
} 


function EditProfile(){
    var inputElement = document.getElementById("email");
    var inputElement2 = document.getElementById("password");
    var inputElement3 = document.getElementById("First-Name");
    var inputElement4 = document.getElementById("Last-Name");
    var inputElement5 = document.getElementById("PhoneNumber");
    var inputElement6 = document.getElementById("Birth-Date");
    if (inputElement.readOnly == true){
        inputElement.readOnly = false;
        inputElement2.readOnly = false;
        inputElement3.readOnly = false;
        inputElement4.readOnly = false;
        inputElement5.readOnly = false;
        inputElement6.readOnly = false;
        var button = document.getElementById("Profile_button");
        button.textContent="save";
    }else{
        navigateToPageH();
    }
}

  function navigateToPageLI() {
    window.location.href = "login.html";
  }
  function navigateToPageSI() {
    window.location.href = "SignUp.html";
  }
  function navigateToPageFD(){
    window.location.href = "FindDog.html";
  }
  function navigateToPageSR(){
    window.location.href = "searchResults.html";
  } 
  function navigateToPageMP(){
    window.location.href = "Profile.html";
  }
  function navigateToPageH(){
  window.location.href = "HOME.html";
  }