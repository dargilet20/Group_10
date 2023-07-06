const active_page = window.location.pathname;
console.log(active_page);

const navLinks = document.querySelectorAll("nav a").forEach((Links) => {
    if (Links.href.includes(`${active_page}`)) {
        Links.classList.add("ctive");
    }
});
const FooterLinks = document.querySelectorAll("footer a").forEach((Links) => {
    if (Links.href.includes(`${active_page}`)) {
        Links.classList.add("ActiveFooter");
    }
});

// ******functions******** //

const checklogin = (e) => {
    e.preventDefault();

    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    if (!email || !password) {
        alert("Email & Password are required");
        return false;
    } else if (password.length < 6) {
        alert("The password must be 6 characters at least");
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        alert("The email is invalid");
        return false;
    } else {
        fetch(`/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                if (res?.message) {
                    alert(res.message);
                } else if (res && !res.err) {
                    window.location = "index";
                } else if (res.error) {
                    // if http request error
                    console.log(res);
                    alert(res.error);
                } else if (res.message) {
                    // if user was not found
                    console.log(res);
                    alert(res.message);
                }
            });
    }
};

const LogIn_form = document.getElementById("LogIn_form");
if (LogIn_form) {
    LogIn_form.addEventListener("submit", checklogin);
}

const checksignup = (e) => {
    e.preventDefault();

    var Email = document.getElementById("email").value;
    var Pas = document.getElementById("password").value;
    var FN = document.getElementById("firstname").value;
    var LN = document.getElementById("lastname").value;
    var PN = document.getElementById("phone").value;
    var BD = document.getElementById("birth-date").value;
    var BD_DATE = new Date(BD);

    if (!Email || !Pas || !FN || !LN || !PN || !BD) {
        alert("Please fill in the fields");
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
        alert("The email is invalid");
        return false;
    } else if (Pas.length < 6) {
        alert("The password must be 6 characters");
        return false;
    } else if (BD_DATE >= new Date()) {
        alert("The date of birth is invalid");
        return false;
    } else if (!/^\d{10}$/.test(PN)) {
        alert("The phone number must contain 10 digits");
        return false;
    } else {
        fetch(`/signUp`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: Email,
                password: Pas,
                firstname: FN,
                lastname: LN,
                phone: PN,
                birthDate: BD,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    window.location = "login";
                } else if (res.error) {
                    // if http request error
                    console.log(res);
                    alert(res.error);
                } else if (res.message) {
                    // if user was not found
                    console.log(res);
                    alert(res.message);
                }
            });
    }
};

const signup_form = document.getElementById("signup_form");
if (signup_form) {
    logout();
    signup_form.addEventListener("submit", checksignup);
}

function logout() {
    fetch(`/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            console.log("user is logged out");
        });
}

function loadProfile() {
    var Email = document.getElementById("email");
    var Pas = document.getElementById("password");
    var FN = document.getElementById("firstname");
    var LN = document.getElementById("lastname");
    var PN = document.getElementById("phone");
    var BD = document.getElementById("birth-date");

    fetch(`/getProfile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                Email.value = res.email;
                Pas.value = res.password;
                FN.value = res.firstname;
                LN.value = res.lastname;
                PN.value = res.phone;
                BD.value = toDate(res.birth_date);
            } else if (res.error) {
                // if http request error
                console.log(res);
                alert(res.error);
            } else if (res.message) {
                // if user was not found
                console.log(res);
                alert(res.message);
            }
        });
}

const checkProfile = (e) => {
    e.preventDefault();

    var Email = document.getElementById("email").value;
    var Pas = document.getElementById("password").value;
    var FN = document.getElementById("firstname").value;
    var LN = document.getElementById("lastname").value;
    var PN = document.getElementById("phone").value;
    var BD = document.getElementById("birth-date").value;
    var BD_DATE = new Date(BD);

    if (!Email || !Pas || !FN || !LN || !PN || !BD) {
        alert("Please fill in the fields");
        return false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email)) {
        alert("The email is invalid");
        return false;
    } else if (Pas.length < 6) {
        alert("The password must be 6 characters");
        return false;
    } else if (BD_DATE >= new Date()) {
        alert("The date of birth is invalid");
        return false;
    } else if (!/^\d{10}$/.test(PN)) {
        alert("The phone number must contain 10 digits");
        return false;
    } else {
        fetch(`/updateProfile`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: Email,
                password: Pas,
                firstname: FN,
                lastname: LN,
                phone: PN,
                birthDate: BD,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    alert("your details were updated successfully!");
                    window.location.reload();
                } else if (res.error) {
                    // if http request error
                    console.log(res);
                    alert(res.error);
                } else if (res.message) {
                    // if user was not found
                    console.log(res);
                    alert(res.message);
                }
            });
    }
};

const profile_form = document.getElementById("profile_form");
if (profile_form) {
    loadProfile();
    profile_form.addEventListener("submit", checkProfile);
}

function toDate(date) {
    if (!date) {
        return "";
    }

    var d = new Date(date);
    return `${d.getFullYear()}-${("00" + (d.getMonth() + 1)).slice(-2)}-${(
        "00" + d.getDate()
    ).slice(-2)}`;
}

function loadMyDogs() {
    fetch(`/getDogs`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                console.log(res);
                myDogs.innerHTML = `<div id="Container_Header">Here is your dog list</div>`;
                const div = document.createElement("div");
                div.classList.add("dogs-container");
                myDogs.appendChild(div);

                for (let i = 0; i < res.length; i++) {
                    const dog = res[i];
                    div.innerHTML += `
                    <div class="dog-square">
                        <img class="dog-image" src="${
                            dog.image.startsWith("http")
                                ? dog.image
                                : `images/${dog.image}`
                        }" />
                        <div class="dog-details">
                            <h2>Name: ${dog.name}</h2>
                            <p>Age: ${dog.age}</p>
                            <p>Gender: ${dog.gender}</p>
                            <p>Type: ${dog.type}</p>
                            <p>Status: ${dog.status}</p>
                            <p>Size: ${dog.size}</p>
                            <p>Additional description: ${dog.description}</p>
                        </div>
                        <div class="dog-actions">
                            <table cellpadding="8" cellspacing="3">
                                <tr>
                                    <td>
                                        <button onclick="deleteDog(${dog.id})">
                                            Delete dog
                                        </button>
                                    </td>
                                </tr>
                            </table>
                            <table cellpadding="8" cellspacing="3">
                                <tr>
                                    <td>
                                        <button onclick="editDog(${dog.id})">
                                            Edit details
                                        </button>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    `;
                }
            } else if (res.error) {
                myDogs.innerHTML = `<div id="Container_Header">Sorry, We couldn't find your dogs</div>`;
                // if http request error
                console.log(res);
                alert(res.error);
            } else if (res.message) {
                myDogs.innerHTML = `<div id="Container_Header">Sorry, We couldn't find your dogs</div>`;
                // if user was not found
                console.log(res);
                alert(res.message);
            }
        });
}

const myDogs = document.getElementById("myDogs");
if (myDogs) {
    loadMyDogs();
}

function deleteDog(id) {
    if (confirm("Do you sure you'd like to delete this dog?")) {
        fetch(`/deleteDog?id=${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    alert("dog deleted successfully!");
                    window.location.reload();
                } else if (res.error) {
                    // if http request error
                    console.log(res);
                    alert(res.error);
                } else if (res.message) {
                    // if user was not found
                    console.log(res);
                    alert(res.message);
                }
            });
    }
}

function editDog(id) {
    window.location = `/edit-dog?id=${id}`;
}

function showDogOwner(id) {
    window.location = `/dog-owner?id=${id}`;
}

function loadDogDetails() {
    const id = getQueryParam("id");
    if (!id) {
        alert("please select a dog");
        return;
    }

    fetch(`/getDogById?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                dogname.value = res.name;
                Age.value = res.age;
                dogtype.value = res.type;
                doggender.value = res.gender;
                places.value = res.area;
                dogstatus.value = res.status;
                dogsize.value = res.size;
                Additional_description.value = res.description;
                image.value = res.image;
            } else if (res.error) {
                // if http request error
                console.log(res);
                alert(res.error);
            } else if (res.message) {
                // if user was not found
                console.log(res);
                alert(res.message);
            }
        });
}

const updateDogDetails = (e) => {
    e.preventDefault();

    if (
        !getQueryParam("id") ||
        !dogname.value ||
        !Age.value ||
        !dogtype.value ||
        !doggender.value ||
        !places.value ||
        !dogstatus.value ||
        !dogsize.value
    ) {
        alert("Please fill in the required fields");
        return false;
    } else {
        fetch(`/updateDog`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: getQueryParam("id"),
                name: dogname.value,
                age: Age.value,
                gender: doggender.value,
                type: dogtype.value,
                status: dogstatus.value,
                size: dogsize.value,
                area: places.value,
                description: Additional_description.value,
                image: image.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    alert("The dog details updated successfully!");
                    window.location.reload();
                } else if (res.error) {
                    // if http request error
                    console.log(res);
                    alert(res.error);
                } else if (res.message) {
                    // if user was not found
                    console.log(res);
                    alert(res.message);
                }
            });
    }
};

const createDog = (e) => {
    e.preventDefault();

    if (
        !dogname.value ||
        !Age.value ||
        !dogtype.value ||
        !doggender.value ||
        !places.value ||
        !dogstatus.value ||
        !dogsize.value
    ) {
        alert("Please fill in the required fields");
        return false;
    } else {
        fetch(`/createDog`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: dogname.value,
                age: Age.value,
                gender: doggender.value,
                type: dogtype.value,
                status: dogstatus.value,
                size: dogsize.value,
                area: places.value,
                description: Additional_description.value,
                image: image.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    alert("The dog created successfully!");
                    window.location = "mydogs";
                } else if (res.error) {
                    // if http request error
                    console.log(res);
                    alert(res.error);
                } else if (res.message) {
                    // if user was not found
                    console.log(res);
                    alert(res.message);
                }
            });
    }
};

const editDogForm = document.getElementById("edit-dog-form");
if (editDogForm) {
    var dogname = document.getElementById("dogname");
    var Age = document.getElementById("Age");
    var dogtype = document.getElementById("dogtype");
    var doggender = document.getElementById("doggender");
    var places = document.getElementById("places");
    var dogstatus = document.getElementById("dogstatus");
    var dogsize = document.getElementById("dogsize");
    var Additional_description = document.getElementById(
        "Additional_description"
    );
    var image = document.getElementById("image");

    loadDogDetails();
    editDogForm.addEventListener("submit", updateDogDetails);
}

const newDogForm = document.getElementById("new-dog-form");
if (newDogForm) {
    var dogname = document.getElementById("dogname");
    var Age = document.getElementById("Age");
    var dogtype = document.getElementById("dogtype");
    var doggender = document.getElementById("doggender");
    var places = document.getElementById("places");
    var dogstatus = document.getElementById("dogstatus");
    var dogsize = document.getElementById("dogsize");
    var Additional_description = document.getElementById(
        "Additional_description"
    );
    var image = document.getElementById("image");

    newDogForm.addEventListener("submit", createDog);
}

function getQueryParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key);
}

function searchDogs() {
    var dogtype = document.getElementById("dogtype");
    var SizeOfDogs = document.getElementById("SizeOfDogs");
    var GenderOfDogs = document.getElementById("GenderOfDogs");
    var places = document.getElementById("places");

    fetch(`/searchDogs`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            type: dogtype.value,
            size: SizeOfDogs.value,
            gender: GenderOfDogs.value,
            area: places.value,
        }),
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                sessionStorage.setItem("searchResults", JSON.stringify(res));
                window.location = "search-results";
            } else if (res.error) {
                // if http request error
                console.log(res);
                alert(res.error);
            } else if (res.message) {
                // if user was not found
                console.log(res);
                alert(res.message);
            }
        });
}

const searchResultsElem = document.getElementById("searchResults");
if (searchResultsElem) {
    loadSearchResults();
}
function loadSearchResults() {
    if (sessionStorage.getItem("searchResults")) {
        const res = JSON.parse(sessionStorage.getItem("searchResults"));

        if (res.length) {
            searchResultsElem.innerHTML = `<div id="Container_Header">Here is the dogs we found for you</div>`;
            const div = document.createElement("div");
            div.classList.add("dogs-container");
            searchResultsElem.appendChild(div);

            for (let i = 0; i < res.length; i++) {
                const dog = res[i];
                div.innerHTML += `
                <div class="dog-square">
                    <img class="dog-image" src="${
                        dog.image.startsWith("http")
                            ? dog.image
                            : `images/${dog.image}`
                    }" />
                    <div class="dog-details">
                        <h2>Name: ${dog.name}</h2>
                        <p>Age: ${dog.age}</p>
                        <p>Gender: ${dog.gender}</p>
                        <p>Type: ${dog.type}</p>
                        <p>Status: ${dog.status}</p>
                        <p>Size: ${dog.size}</p>
                        <p>Additional description: ${dog.description}</p>
                    </div>
                    <div class="dog-actions">
                        <table cellpadding="8" cellspacing="3">
                            <tr>
                                <td>
                                    <button onclick="showDogOwner(${dog.id})">
                                        Contact to owner
                                    </button>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
                `;
            }
        } else {
            searchResultsElem.innerHTML = `<div id="Container_Header">Sorry, We couldn't find any dog</div>`;
        }
    } else {
        window.location = "find-dog";
    }
}

const sendContactUsMessage = (e) => {
    e.preventDefault();

    const nameElem = document.getElementById("name");
    const emailElem = document.getElementById("email");
    const messageElem = document.getElementById("message");

    if (!nameElem.value || !emailElem.value || !messageElem.value) {
        alert("Please fill in the required fields");
        return false;
    } else {
        fetch(`/contactUs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameElem.value,
                email: emailElem.value,
                message: messageElem.value,
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                if (res) {
                    alert("Your message was sent successfully!");
                    window.location = "index";
                } else if (res.error) {
                    // if http request error
                    console.log(res);
                    alert(res.error);
                } else if (res.message) {
                    // if user was not found
                    console.log(res);
                    alert(res.message);
                }
            });
    }
};

const contactUs_form = document.getElementById("contactUs_form");
if (contactUs_form) {
    contactUs_form.addEventListener("submit", sendContactUsMessage);
}

function loadOwner() {
    const id = getQueryParam("id");
    if (!id) {
        alert("please select a dog");
        return;
    }

    var Email = document.getElementById("email");
    var Pas = document.getElementById("password");
    var FN = document.getElementById("firstname");
    var LN = document.getElementById("lastname");
    var PN = document.getElementById("phone");
    var BD = document.getElementById("birth-date");

    fetch(`/getDogOwnerByDogId?id=${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((res) => {
            if (res) {
                Email.value = res.email;
                Pas.value = res.password;
                FN.value = res.firstname;
                LN.value = res.lastname;
                PN.value = res.phone;
                BD.value = toDate(res.birth_date);
            } else if (res.error) {
                // if http request error
                console.log(res);
                alert(res.error);
            } else if (res.message) {
                // if user was not found
                console.log(res);
                alert(res.message);
            }
        });
}

const owner_form = document.getElementById("owner_form");
if (owner_form) {
    loadOwner();
}
